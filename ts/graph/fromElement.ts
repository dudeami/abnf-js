import GrammarElement from "../elements/GrammarElement.js";
import GrammarAlternationNode from "./GrammarAlternationNode.js";
import GrammarConcatenationNode from "./GrammarConcatenationNode.js";
import GrammarNode from "./GrammarNode.js";
import GrammarOptionNode from "./GrammarOptionNode.js";
import GrammarRepetitionNode from "./GrammarRepetitionNode.js";
import GrammarRuleNode from "./GrammarRuleNode.js";
import GrammarValueNode from "./GrammarValueNode.js";
import GrammarValueRangeNode from "./GrammarValueRangeNode.js";
import GrammarValueSetNode from "./GrammarValueSetNode.js";

/**
 * Given a `GrammarElement`, returns a `GrammarNode` for use in a `GrammarGraph`
 * @param rule The `GrammarElement` representation of the rule to create a `GrammarNode` for
 * @returns A `GrammarNode` composed of the `GrammarElement` passed
 */
export default function fromElement(rule: GrammarElement): GrammarNode {
    switch (rule.type) {
        case "alternation":
            return new GrammarAlternationNode(rule);
        case "concatenation":
            return new GrammarConcatenationNode(rule);
        case "option":
            return new GrammarOptionNode(rule);
        case "repetition":
            return new GrammarRepetitionNode(rule);
        case "rule":
            return new GrammarRuleNode(rule);
        case "value":
            return new GrammarValueNode(rule);
        case "value-range":
            return new GrammarValueRangeNode(rule);
        case "value-set":
            return new GrammarValueSetNode(rule);
    }
}
