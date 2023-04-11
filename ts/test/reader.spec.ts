import { assert } from "chai";
import { ParseTreeNode } from "../parsing/ParseTreeNode.js";
import { Parser } from "../parsing/Parser.js";
import { toCharArray } from "../parsing/toCharArray.js";
import { Reader } from "../reader/Reader.js";
import { ScramGrammar } from "./grammars/ScramGrammar.js";

describe(`Reader Tests`, () => {
    const text = "c=biws,r=fyko+d2lbbFgONRv9qkxdawL3rfcNHYJY1ZVvWVs7j,ext=test,p=v0X8v3Bz2T0CJGbJQyF0X+HI4Ts=";
    const charArray = toCharArray(text);
    const parser = new Parser(ScramGrammar, "client-final-message");
    const results = <ParseTreeNode>parser.parse(charArray);
    it("results should contain a `proof` element", () => {
        assert(results);
        assert(results.children.proof);
    });

    it("results should contain a `base64` element within the `channel-binding` element", () => {
        assert(results);
        assert(results.children["client-final-message-without-proof"]);
        assert(results.children["client-final-message-without-proof"][0].children["channel-binding"][0]);
        assert(
            results.children["client-final-message-without-proof"][0].children["channel-binding"][0].children["base64"]
        );
    });

    it(`reads the proof`, () => {
        const reader = new Reader(charArray, results);
        assert(reader.get("proof").get("base64").read() === "v0X8v3Bz2T0CJGbJQyF0X+HI4Ts=");
    });

    it(`returns valid start and end for the document`, () => {
        const reader = new Reader(charArray, results);
        assert(reader.start() === 0);
        assert(reader.end() === charArray.length);
    });

    it(`returns valid start and end for the proof element`, () => {
        const reader = new Reader(charArray, results);
        assert(reader.get("proof").start() === 61);
        assert(reader.get("proof").end() === 91);
    });

    it(`reads the proof from utf-8`, () => {
        const charArray = toCharArray(text, 8);
        const results = <ParseTreeNode>parser.parse(charArray);
        const reader = new Reader(charArray, results);
        assert(reader.get("proof").get("base64").read() === "v0X8v3Bz2T0CJGbJQyF0X+HI4Ts=");
    });

    it(`reads using a case-insensitive rule name`, () => {
        const reader = new Reader(charArray, results);
        assert(reader.get("PROOF").get("base64").read() === "v0X8v3Bz2T0CJGbJQyF0X+HI4Ts=");
    });

    it(`reads all children for a given rule`, () => {
        const charArray = toCharArray(
            "c=biws,r=fyko+d2lbbFgONRv9qkxdawL3rfcNHYJY1ZVvWVs7j,ext=test,another=another,p=v0X8v3Bz2T0CJGbJQyF0X+HI4Ts="
        );
        const results = <ParseTreeNode>parser.parse(charArray);
        const reader = new Reader(charArray, results);
        const children = reader
            .get("client-final-message-without-proof")
            .get("extensions")
            .getAll("attr-val")
            .map((r) => r.read());
        assert(children.length === 2);
        assert(children[0] === "ext=test");
        assert(children[1] === "another=another");
    });

    it(`returns if children exist or not`, () => {
        const reader = new Reader(charArray, results);
        assert(reader.has("PROOF"));
        assert(!reader.has("PROOF", 1));
        assert(!reader.has("does-not-exist"));
    });

    it(`errors on unknown utf-32 encoding`, () => {
        const charArray = toCharArray(text, 32);
        const results = <ParseTreeNode>parser.parse(charArray);
        const reader = new Reader(charArray, results);
        try {
            reader.get("proof").get("base64").read();
            assert(false);
        } catch (e) {
            const error = <Error>e;
            assert(error.message === `The "utf-32" encoding is not supported`);
        }
    });

    it(`errors on invalid child`, () => {
        const reader = new Reader(charArray, results);
        try {
            reader.get("does-not-exist");
            assert(false);
        } catch (e) {
            const error = <Error>e;
            assert(error.message === `Child "does-not-exist" at index 0 does not exist within this parse tree.`);
        }
    });
});
