import GrammarNode from "./GrammarNode.js";

export default interface GrammarRepeatNode extends GrammarNode {
    min(): number;

    max(): number;
}
