import GrammarOption from "../elements/GrammarOption.js";
import GrammarNode from "./GrammarNode.js";
import GrammarRepeatNode from "./GrammarRepeatNode.js";
import fromElement from "./fromElement.js";

export default class GrammarOptionNode implements GrammarNode, GrammarRepeatNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];

    constructor(rule: GrammarOption) {
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
        return 0;
    }

    public max() {
        return 1;
    }
}
