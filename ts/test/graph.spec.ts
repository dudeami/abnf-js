import { assert } from "chai";
import fs from "fs";
import { Compiler } from "../compilation/Compiler.js";
import { GrammarGraph } from "../graph/GrammarGraph.js";
import { GrammarValueNode } from "../graph/GrammarValueNode.js";
import { GrammarValueRangeNode } from "../graph/GrammarValueRangeNode.js";
import { GrammarValueSetNode } from "../graph/GrammarValueSetNode.js";
import { normalizeValue } from "../graph/normalizeValue.js";

describe(`Graph Tests`, () => {
    it(`normalizes values correctly`, () => {
        assert(normalizeValue("a") === 97);
        assert(normalizeValue(97) === 97);
    });
    it(`compiles grammars/simple.abnf and all nodes implement required functions`, () => {
        const text = fs.readFileSync("grammars/simple.abnf").toString();
        const compiler = new Compiler(text, false);

        const grammar = compiler.build();
        const graph = new GrammarGraph(grammar);

        const valueSetRule = <GrammarValueSetNode>graph.get("valueset-example").children()[0];

        assert(valueSetRule.isParse());
        assert(valueSetRule.isRepeat() === false);
        assert(valueSetRule.isAlternate() === false);

        const valueRangeRule = <GrammarValueRangeNode>graph.get("valuerange-example").children()[0];

        assert(valueRangeRule.isParse());
        assert(valueRangeRule.isRepeat() === false);
        assert(valueRangeRule.isAlternate() === false);

        const valueRule = <GrammarValueNode>graph.get("value-example").children()[0];

        assert(valueRule.isParse());
        assert(valueRule.isRepeat() === false);
        assert(valueRule.isAlternate() === false);
    });
});
