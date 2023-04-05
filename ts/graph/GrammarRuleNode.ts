import GrammarRule from "../elements/GrammarRule.js";
import GrammarNode from "./GrammarNode.js";

export default class GrammarRuleNode implements GrammarNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];

    constructor(rule: GrammarRule) {
        this.rule = rule;
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

    public isParse() {
        return false;
    }

    public getRule() {
        return this.rule;
    }
}
