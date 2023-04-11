import { GrammarNode } from "./GrammarNode.js";

export interface GrammarParseNode extends GrammarNode {
    parse(char: number): boolean;
}
