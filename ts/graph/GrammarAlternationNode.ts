import GrammarAlternation from "../elements/GrammarAlternation.js";
import GrammarNode from "./GrammarNode.js";
import fromElement from "./fromElement.js";

export default class GrammarAlternationNode implements GrammarNode {
    private readonly rule;

    private readonly nodes: GrammarNode[] = [];

    constructor(rule: GrammarAlternation) {
        this.rule = rule;
        for (const alternate of rule.alternates) {
            const node = fromElement(alternate);
            this.nodes.push(node);
        }
    }

    public children() {
        return this.nodes;
    }

    public isAlternate() {
        return true;
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
