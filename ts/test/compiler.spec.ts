import { assert } from "chai";
import fs from "fs";
import Compiler from "../compilation/Compiler.js";
import GrammarAlternation from "../elements/GrammarAlternation.js";
import GrammarRepetition from "../elements/GrammarRepetition.js";
import GrammarRule from "../elements/GrammarRule.js";
import GrammarValue from "../elements/GrammarValue.js";
import GrammarValueSet from "../elements/GrammarValueSet.js";

describe("Compilation Tests", () => {
    it(`fails on broken grammars`, () => {
        const text = `invalid-grammar = "a" *"b"\n`;
        const compiler = new Compiler(text, false);

        try {
            compiler.build();
            assert(false);
        } catch (e) {
            const error = <Error>e;
            assert(error.message === "Unable to compile ABNF grammar.");
        }
    });
    it(`compiles grammars/simple.abnf`, () => {
        const text = fs.readFileSync("grammars/simple.abnf").toString();
        const compiler = new Compiler(text, false);

        compiler.build();
    });

    it(`compiles grammars/simple-nl.abnf that requires addCRLF`, () => {
        const text = fs.readFileSync("grammars/simple-lf.abnf").toString();
        const compiler = new Compiler(text);

        compiler.build();
    });

    it(`compiles the UTF-8 ABNF grammar`, () => {
        const text = fs.readFileSync("grammars/utf8.abnf").toString();
        const compiler = new Compiler(text);

        compiler.build();
    });

    it(`compiles JSON grammar from RFC-8259`, () => {
        const text = fs.readFileSync("grammars/json.abnf").toString();
        const compiler = new Compiler(text);

        compiler.build();
    });

    it(`compiles ABNF #rule extension from RFC-7230`, () => {
        // Using smiley face, unicode U+1F600
        const compiler = new Compiler(`base-rule = 1#3%d97.98.99\njunk = #"ab"\n`, true);
        compiler.build();
    });

    it(`compiles string literals as case-insensitive`, () => {
        const compiler = new Compiler(`base-rule = "a" / "B" / "0"\n`, true);
        const grammar = compiler.build();
        const altRule = <GrammarAlternation>grammar["base-rule"];
        assert(altRule.alternates.length === 3);
        const charRuleA = <GrammarValueSet>(<GrammarRepetition>altRule.alternates[0]).element;
        assert(charRuleA.values);
        assert(charRuleA.values[0] === 97);
        assert(charRuleA.values[1] === 65);
        const charRuleB = <GrammarValueSet>(<GrammarRepetition>altRule.alternates[1]).element;
        assert(charRuleB.values);
        assert(charRuleB.values[0] === 66);
        assert(charRuleB.values[1] === 98);
        const charRule0 = <GrammarValue>(<GrammarRepetition>altRule.alternates[2]).element;
        assert(charRule0.value == 48);
    });

    it(`compiles case-sensitive literals`, () => {
        const compiler = new Compiler(`base-rule = %s"a" / %s"b" / %s"c"\n`, true);
        const grammar = compiler.build();
        const altRule = <GrammarAlternation>grammar["base-rule"];
        assert(altRule.alternates.length === 3);
        const charRule = <GrammarValue>(<GrammarRepetition>altRule.alternates[0]).element;
        assert(charRule.value === 97);
    });

    it(`compiles incremental alternative rules`, () => {
        const compiler = new Compiler(`base-rule = "a"\nbase-rule =/ "b"\nbase-rule =/ "c"\n`, true);
        const grammar = compiler.build();
        const altRule = <GrammarAlternation>grammar["base-rule"];
        assert(altRule.alternates.length === 3);
    });

    it(`references rulenames case-insensitively`, () => {
        const compiler = new Compiler(`base-rule = Second-Rule\nSECOND-RULE = "a"\n`);
        const grammar = compiler.build();

        const repetition = <GrammarRepetition>grammar["base-rule"];
        const rule = <GrammarRule>repetition.element;
        assert(rule.name === "second-rule");
        assert(grammar["second-rule"]);
    });
});
