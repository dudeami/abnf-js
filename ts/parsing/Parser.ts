import GrammarRuleSet from "../elements/GrammarRuleSet.js";
import GrammarGraph from "../graph/GrammarGraph.js";
import ParseExecutor from "./ParseExecutor.js";

export type CharArray = Uint8Array | Uint16Array | Uint32Array;

export default class Parser {
    private readonly grammar: GrammarRuleSet;
    private readonly graph: GrammarGraph;
    private readonly baseRule: string;

    constructor(grammar: GrammarRuleSet, baseRule: string) {
        this.grammar = grammar;
        this.graph = new GrammarGraph(grammar);
        this.baseRule = baseRule.toLowerCase();
    }

    parse(text: CharArray) {
        if (!this.grammar[this.baseRule]) {
            throw new Error(`Unable to find rule "${this.baseRule}" in current grammar.`);
        }

        const search = new ParseExecutor(this.graph, this.baseRule, text);

        if (search.search()) {
            const results = search.getParseTreeNode();
            results.end = text.length;
            return results;
        }
        return false;
    }
}
