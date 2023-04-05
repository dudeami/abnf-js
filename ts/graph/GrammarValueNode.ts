import GrammarValue from "../elements/GrammarValue.js";
import GrammarNode from "./GrammarNode.js";
import GrammarParseNode from "./GrammarParseNode.js";
import normalizeValue from "./normalizeValue.js";

export default class GrammarValueNode implements GrammarNode, GrammarParseNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];
    private readonly value: number;

    constructor(rule: GrammarValue) {
        this.rule = rule;
        this.value = normalizeValue(this.rule.value);
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
        return true;
    }

    public getRule() {
        return this.rule;
    }

    public parse(char: number) {
        return this.value === char;
    }
}
