import GrammarNode from "./GrammarNode.js";

export default interface GrammarParseNode extends GrammarNode {
    parse(char: number): boolean;
}
