import { GrammarNode } from "./GrammarNode.js";

export interface GrammarRepeatNode extends GrammarNode {
    min(): number;

    max(): number;
}
