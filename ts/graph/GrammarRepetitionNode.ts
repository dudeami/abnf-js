import GrammarRepetition from "../elements/GrammarRepetition.js";
import GrammarNode from "./GrammarNode.js";
import GrammarRepeatNode from "./GrammarRepeatNode.js";
import fromElement from "./fromElement.js";

export default class GrammarRepetitionNode implements GrammarNode, GrammarRepeatNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];

    constructor(rule: GrammarRepetition) {
        this.rule = rule;
        this.nodes.push(fromElement(rule.element));
    }

    public children() {
        return this.nodes;
    }

    public isAlternate() {
        return false;
    }

    public isRepeat() {
        return true;
    }

    public isParse() {
        return false;
    }

    public getRule() {
        return this.rule;
    }

    public min() {
        return this.rule.min || 0;
    }

    public max() {
        return this.rule.max || Number.POSITIVE_INFINITY;
    }
}
