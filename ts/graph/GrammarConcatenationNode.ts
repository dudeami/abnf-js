import { GrammarConcatenation } from "../elements/GrammarConcatenation.js";
import { GrammarNode } from "./GrammarNode.js";
import { fromElement } from "./fromElement.js";

export class GrammarConcatenationNode implements GrammarNode {
    private readonly rule;
    private readonly nodes: GrammarNode[] = [];

    constructor(rule: GrammarConcatenation) {
        this.rule = rule;
        this.nodes = rule.elements.map(fromElement);
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
