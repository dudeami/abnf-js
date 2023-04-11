import { GrammarRule } from "../elements/GrammarRule.js";
import { GrammarRuleSet } from "../elements/GrammarRuleSet.js";
import { GrammarNode } from "./GrammarNode.js";
import { fromElement } from "./fromElement.js";

/**
 * Given a `GrammarRuleSet`, creates a `GrammarGraph` representation that can be walked to parse documents.
 */
export class GrammarGraph {
    /**
     * The rule set of this `GrammarGraph`, represented by `GrammarNode`s
     */
    private rules: { [key: string]: GrammarNode } = {};

    /**
     * Creates and links a `GrammarGraph` based on a `GrammarRuleSet`
     * @param grammar The GrammarRuleSet's to be used in the GrammarGraph
     */
    constructor(grammar: GrammarRuleSet) {
        for (const key in grammar) {
            this.rules[key] = fromElement(grammar[key]);
        }

        for (const key in this.rules) {
            this.addRules(this.rules[key]);
        }
    }

    public get(name: string) {
        return this.rules[name];
    }

    private addRules(node: GrammarNode) {
        if (node.getRule().type === "rule") {
            const ruleName = (<GrammarRule>node.getRule()).name;
            node.children().push(this.rules[ruleName]);
        } else {
            for (const child of node.children()) {
                this.addRules(child);
            }
        }
    }
}
