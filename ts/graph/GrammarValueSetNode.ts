import { GrammarValueSet } from "../elements/GrammarValueSet.js";
import { GrammarNode } from "./GrammarNode.js";
import { GrammarParseNode } from "./GrammarParseNode.js";
import { normalizeValue } from "./normalizeValue.js";

export class GrammarValueSetNode implements GrammarNode, GrammarParseNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];
    private readonly values: number[];

    constructor(rule: GrammarValueSet) {
        this.rule = rule;
        this.values = this.rule.values.map(normalizeValue);
    }

    public children() {
        return this.nodes;
    }

    public isAlternate() {
        return false;
    }

    public isRepeat() {
        return false;
    }

    public getRule() {
        return this.rule;
    }

    public isParse() {
        return true;
    }

    public parse(char: number) {
        for (const value of this.values) {
            if (value === char) {
                return true;
            }
        }
        return false;
    }
}
