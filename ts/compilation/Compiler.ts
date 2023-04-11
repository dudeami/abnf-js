/**
 * Given an ABNF grammar as input, creates a grammar JS file with information for the ABNF parser.
 */

import { GrammarAlternation } from "../elements/GrammarAlternation.js";
import { GrammarConcatenation } from "../elements/GrammarConcatenation.js";
import { GrammarElement } from "../elements/GrammarElement.js";
import { GrammarOption } from "../elements/GrammarOption.js";
import { GrammarRepetition } from "../elements/GrammarRepetition.js";
import { GrammarRule } from "../elements/GrammarRule.js";
import { GrammarRuleSet } from "../elements/GrammarRuleSet.js";
import { GrammarValue } from "../elements/GrammarValue.js";
import { GrammarValueRange } from "../elements/GrammarValueRange.js";
import { GrammarValueSet } from "../elements/GrammarValueSet.js";
import { AbnfGrammar } from "../grammars/AbnfGrammar.js";
import { normalizeValue } from "../graph/normalizeValue.js";
import { ParseTreeNode } from "../parsing/ParseTreeNode.js";
import { Parser } from "../parsing/Parser.js";
import { toCharArray } from "../parsing/toCharArray.js";

/**
 * Compiler for the ABNF language. Given a ABNF grammar represented in text, returns a JSON representation of the
 * grammar for use with the ABNF Parser in this package.
 */
export class Compiler {
    private readonly text: string;

    /**
     * Creates a compiler for converting text-based ABNF grammars into a `GrammarRuleSet`
     * @param text The ABNF grammar text
     * @param cleanDoc If enabled, will automatically convert line feeds to CRLF
     */
    constructor(text: string, cleanDoc: boolean = true) {
        if (cleanDoc) {
            this.text = text.replace(/$\n*/g, "").replace(/([^\r])\n/g, "$1\r\n");
        } else {
            this.text = text;
        }
    }

    /**
     * Processed the text based grammar and returns the `GrammarRuleSet` represenation
     * @returns Grammar in JSON representation
     */
    public build() {
        const parser = new Parser(AbnfGrammar, "rulelist");

        const node = parser.parse(toCharArray(this.text));

        if (node) {
            return this.extractRuleList(node);
        } else {
            throw new Error(`Unable to compile ABNF grammar.`);
        }
    }

    /**
     * Given a `ParseTreeNode` using the `AbnfGrammar`, extracts the rules of the grammar into a `GrammarRuleSet`.
     * @param data
     * @returns
     */
    private extractRuleList(data: ParseTreeNode) {
        const rules = data.children.rule;
        const results: GrammarRuleSet = {};
        for (const rule of rules) {
            const alternate = this.extractText(rule.children["defined-as"][0]).indexOf("=/") !== -1;
            const rulename = this.extractText(rule.children.rulename[0]).toLowerCase();
            const element = this.extractRule(rule);
            if (alternate && results[rulename]) {
                if (results[rulename].type !== "alternation") {
                    results[rulename] = <GrammarAlternation>{
                        type: "alternation",
                        alternates: [results[rulename]],
                    };
                }
                const altRule = <GrammarAlternation>results[rulename];
                altRule.alternates.push(element);
            } else {
                results[rulename] = element;
            }
        }
        return results;
    }

    /**
     * Given the ABNF grammar's "rule" `ParseTreeNode`, extracts the rule structure into a `GrammarElement` for use with
     * GrammarGraph
     * @param node `ParseTreeNode` of a "rule" in the AbnfGrammar
     * @returns
     */
    private extractRule(node: ParseTreeNode) {
        return this.buildElement(node.children.elements[0]);
    }

    /**
     * Builds an `GrammarNode` using the ABNF Grammar structure from a `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarNode`
     * @returns `GrammarNode` describing this rule for use with `GrammarGraph`
     */
    private buildElement(node: ParseTreeNode): GrammarElement {
        if (node.children.alternation) {
            return this.buildAlternationElement(node.children.alternation[0]);
        } else if (node.children.option) {
            return <GrammarOption>{
                type: "option",
                element: this.buildAlternationElement(node.children.option[0].children.alternation[0]),
            };
        } else if (node.children.group) {
            return this.buildAlternationElement(node.children.group[0].children.alternation[0]);
        } else if (node.children.rulename) {
            return <GrammarRule>{
                type: "rule",
                name: this.extractText(node).toLowerCase(),
            };
        } else if (node.children["char-val"]) {
            return this.buildCharValueElement(node.children["char-val"][0]);
        } else if (node.children["prose-val"]) {
            const rulename = this.extractText(node).toLowerCase();
            return <GrammarRule>{
                type: "rule",
                name: rulename.substring(1, rulename.length - 1),
            };
        } else {
            return this.buildNumValueElement(node);
        }
    }

    /**
     * Builds an `GrammarAlteration` using the ABNF Grammar structure from a `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarAlteration`
     * @returns `GrammarAlteration` describing this rule for use with `GrammarGraph`
     */
    private buildAlternationElement(node: ParseTreeNode) {
        const elements = node.children.concatenation.map((ele) => this.buildConcatenationElement(ele));
        if (elements.length > 1) {
            return <GrammarAlternation>{
                type: "alternation",
                alternates: elements,
            };
        } else {
            return elements[0];
        }
    }

    /**
     * Builds an `GrammarConcatenation` using the ABNF Grammar structure from a `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarConcatenation`
     * @returns `GrammarConcatenation` describing this rule for use with `GrammarGraph`
     */
    private buildConcatenationElement(node: ParseTreeNode) {
        const elements = node.children.repetition.map((ele) => this.buildRepetitionElement(ele));
        if (elements.length > 1) {
            return <GrammarConcatenation>{
                type: "concatenation",
                elements: elements,
            };
        } else {
            return elements[0];
        }
    }

    /**
     * Builds an `GrammarRepetition` using the ABNF Grammar structure from a `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarAlteration`
     * @returns `GrammarAlteration` describing this rule for use with `GrammarGraph`
     */
    private buildRepetitionElement(node: ParseTreeNode) {
        const repeat = node.children.repeat || node.children["repeat-comma"];
        let isComma = false;
        let min = 1;
        let max = 1;
        if (repeat) {
            const value = this.extractText(repeat[0]);
            if (value.indexOf("*") !== -1) {
                [min, max] = value.split("*").map((n) => Number.parseInt(n));
            } else if (value.indexOf("#") !== -1) {
                isComma = true;
                [min, max] = value.split("#").map((n) => Number.parseInt(n));
                if (min) {
                    min--;
                }
                if (max) {
                    max--;
                }
            } else {
                min = max = Number.parseInt(value);
            }
        }
        const element = <GrammarElement>this.buildElement(node.children.element[0]);
        const repetition: GrammarRepetition = {
            type: "repetition",
            element,
        };
        if (min && min > 0) {
            repetition.min = min;
        }
        if (max) {
            repetition.max = max;
        }
        if (isComma) {
            repetition.element = {
                type: "concatenation",
                elements: [
                    {
                        type: "rule",
                        name: "OWS",
                    },
                    {
                        type: "value",
                        value: ",",
                    },
                    {
                        type: "rule",
                        name: "OWS",
                    },
                    element,
                ],
            };
            return <GrammarConcatenation>{
                type: "concatenation",
                elements: [element, repetition],
            };
        } else {
            return repetition;
        }
    }

    /**
     * Builds an `GrammarNode` representing a string of characters using the ABNF Grammar structure from a
     * `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarNode`
     * @returns `GrammarNode` describing this rule for use with `GrammarGraph`
     */
    private buildCharValueElement(node: ParseTreeNode) {
        const caseSensitive = Boolean(node.children["case-sensitive-string"]);
        let value = this.extractText(
            node.children[caseSensitive ? "case-sensitive-string" : "case-insensitive-string"][0].children[
                "quoted-string"
            ][0]
        );
        value = value.substring(1, value.length - 1);
        if (value.length > 1) {
            return <GrammarConcatenation>{
                type: "concatenation",
                elements: value
                    .split("")
                    .map((v) => this.buildCharValue(normalizeValue(v.charCodeAt(0)), caseSensitive)),
            };
        }
        return this.buildCharValue(value.charCodeAt(0), caseSensitive);
    }

    /**
     * Builds an `GrammarValue` (or `GrammarValueSet` for case insensitive characters) using the ABNF Grammar structure
     * from a `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarValue` or `GrammarValueSet`
     * @returns `GrammarNode` describing this rule for use with `GrammarGraph`
     */
    private buildCharValue(value: number, caseSensitive: boolean) {
        const values = this.getCaseInsensitive(value, caseSensitive);
        if (values.length > 1) {
            return <GrammarValueSet>{
                type: "value-set",
                values: values,
            };
        } else {
            return <GrammarValue>{
                type: "value",
                value: values[0],
            };
        }
    }

    /**
     * Retruns the opposite casing of the given character, if available.
     * @param char The character to get opposite casing for
     * @param caseSensitive If the character should be treated as case sensitive, or not
     * @returns An array containing characters that will match the characters casings, depending on `caseSensitive`
     */
    private getCaseInsensitive(char: number, caseSensitive: boolean) {
        if (caseSensitive) {
            return [char];
        } else if (0x41 <= char && char <= 0x5a) {
            return [char, char + 0x20];
        } else if (0x61 <= char && char <= 0x7a) {
            return [char, char - 0x20];
            // } else if (0xc0 <= char && char <= 0xdf) {
            //     return [char, char + 0x20];
            // } else if (0xe0 <= char && char <= 0xff) {
            //     return [char, char - 0x20];
        } else {
            return [char];
        }
    }

    /**
     * Builds an `GrammarValue`, `GrammarValueSet`, or `GrammarValueRange` using the ABNF Grammar structure from a
     * `ParseTreeNode`
     * @param node `ParseTreeNode` to convert into an `GrammarValue`, `GrammarValueSet`, or `GrammarValueRange`
     * @returns `GrammarNode` describing this rule for use with `GrammarGraph`
     */
    private buildNumValueElement(node: ParseTreeNode) {
        const value = this.extractText(node);

        const type = value.substring(1, 2);
        const radix = type == "b" ? 2 : type == "x" ? 16 : 10;

        const data = value.substring(2);
        const values = data.split(data.indexOf("-") !== -1 ? "-" : ".").map((n) => {
            return Number.parseInt(n, radix);
        });

        if (data.indexOf("-") !== -1) {
            return <GrammarValueRange>{
                type: "value-range",
                values,
            };
        } else if (values.length > 1) {
            return <GrammarValueSet>{
                type: "value-set",
                values,
            };
        } else {
            return <GrammarValue>{
                type: "value",
                value: values[0],
            };
        }
    }

    /**
     * Reads a `ParseTreeNode`'s range of text from the ABNF grammar text
     * @param node The `ParseTreeNode` to get the text contents for
     * @returns The text of the object from the ABNF grammar text
     */
    private extractText(node: ParseTreeNode) {
        return this.text.substring(node.start, node.end);
    }
}
