import GrammarValueRange from "../elements/GrammarValueRange.js";
import GrammarNode from "./GrammarNode.js";
import GrammarParseNode from "./GrammarParseNode.js";
import normalizeValue from "./normalizeValue.js";

export default class GrammarValueRangeNode implements GrammarNode, GrammarParseNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];

    private readonly minValue: number;
    private readonly maxValue: number;

    constructor(rule: GrammarValueRange) {
        this.rule = rule;
        this.minValue = normalizeValue(this.rule.values[0]);
        this.maxValue = normalizeValue(this.rule.values[1]);
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
        return this.minValue <= char && this.maxValue >= char;
    }
}
