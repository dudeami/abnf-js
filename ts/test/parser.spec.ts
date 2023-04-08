import { assert } from "chai";
import Parser from "../parsing/Parser.js";
import toCharArray from "../parsing/toCharArray.js";
import CaseInsensitiveGrammar from "./grammars/CaseInsensitiveGrammar.js";
import Utf16SmileyGrammar from "./grammars/Utf16SmileyGrammar.js";
import Utf8Grammar from "./grammars/Utf8Grammar.js";
import ValueSetGrammar from "./grammars/ValueSetGrammar.js";

describe("Parser Tests", () => {
    it(`parses a static UTF-16 grammar and parses "😀"`, () => {
        const parser = new Parser(Utf16SmileyGrammar, "base-rule");
        assert(parser.parse(toCharArray("😀")));
    });

    it(`parses utf16 characters with different utf8 encoding using a utf8 grammar`, () => {
        const parser = new Parser(Utf8Grammar, "utf8-char");
        assert(parser.parse(toCharArray("À", 8)));
    });

    it(`parses a value set grammar correctly`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule");
        assert(parser.parse(toCharArray("abcbabcba")));
        assert(!parser.parse(toCharArray("abcd")));
    });

    it(`parses a string using Uint8Array`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule");
        const charArray = toCharArray("abcbabcba", 8);
        assert(charArray.BYTES_PER_ELEMENT === 1);
        assert(parser.parse(charArray));
    });

    it(`parses a string using Uint16Array`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule");
        const charArray = toCharArray("abcbabcba", 16);
        assert(charArray.BYTES_PER_ELEMENT === 2);
        assert(parser.parse(charArray));
    });

    it(`parses a string using Uint32Array`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule");
        const charArray = toCharArray("abcbabcba", 32);
        assert(charArray.BYTES_PER_ELEMENT === 4);
        assert(parser.parse(charArray));
    });

    it(`parses a Uint16Array directly passed`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule");
        const array = Uint16Array.from("abcbabcba".split("").map((c) => c.charCodeAt(0)));
        assert(parser.parse(array));
    });

    it(`parses a Uint16Array directly passed`, () => {
        const parser = new Parser(CaseInsensitiveGrammar, "base-rule");
        const charArray = toCharArray("a");
        assert(parser.parse(charArray));
    });

    it(`parses rule names case-insenstively`, () => {
        const parser = new Parser(CaseInsensitiveGrammar, "BASE-RULE");
        const array = toCharArray("a");
        assert(parser.parse(array));
    });

    it(`errors on using a non-existant rule`, () => {
        const parser = new Parser(ValueSetGrammar, "base-rule-not-found");
        try {
            parser.parse(toCharArray("abcbabcba"));
        } catch (e) {
            const error = <Error>e;
            assert(error.message === `Unable to find rule "base-rule-not-found" in current grammar.`);
        }
    });
});
