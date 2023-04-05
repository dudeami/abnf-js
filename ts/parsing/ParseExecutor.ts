import GrammarRule from "../elements/GrammarRule.js";
import GrammarGraph from "../graph/GrammarGraph.js";
import GrammarNode from "../graph/GrammarNode.js";
import GrammarParseNode from "../graph/GrammarParseNode.js";
import GrammarRepeatNode from "../graph/GrammarRepeatNode.js";
import { ParseCursor } from "./ParseCursor.js";
import ParseNamedStep from "./ParseNamedStep.js";
import ParseTreeBuilder from "./ParseTreeBuilder.js";
import { CharArray } from "./Parser.js";

/**
 * Takes a given `GrammarGraph` and produces a `ParseTreeNode`, or `false` on error.
 */
export default class ParseExecutor {
    private readonly grammar: GrammarGraph;
    private cursor: ParseCursor;
    private edges: ParseCursor[] = [];
    private text: CharArray;

    /**
     * Creates a new ParseExecutor
     * @param grammar The `GrammarGraph` to be used for parsing the document
     * @param baseRule The base or root rule of the document
     * @param text The document converted to a CharArray
     */
    constructor(grammar: GrammarGraph, baseRule: string, text: CharArray) {
        this.grammar = grammar;
        this.cursor = ParseCursor.createRootCursor(this.grammar.get(baseRule));
        this.text = text;
    }

    /**
     * Attempts to search all edges until a complete document parse is found
     * @returns `true` on success, otherwise `false`
     */
    public search() {
        let valid = true;
        while (valid) {
            while (this.next());
            if (this.cursor.getPosition() == this.text.length) {
                return true;
            } else if (this.edges.length > 0) {
                this.cursor = <ParseCursor>this.edges.pop();
            } else {
                valid = false;
            }
        }
        return false;
    }

    /**
     * Performs one step along the current edge of the `GrammarGraph`
     * @returns `true` if this edge is still active, otherwise false
     */
    public next() {
        const cursor = this.cursor;
        const index = <number>cursor.getIndex();
        const node = <GrammarNode>cursor.getNode();

        const children = node.children();

        if (node.isParse()) {
            const char = this.text[cursor.getPosition()];
            if (!(<GrammarParseNode>node).parse(char)) {
                return false;
            } else {
                cursor.incPosition();
                cursor.pop();
            }
        } else if (node.isRepeat()) {
            const min = (<GrammarRepeatNode>node).min();
            const max = (<GrammarRepeatNode>node).max();
            if (index >= max) {
                cursor.pop();
            } else {
                if (index >= min) {
                    this.edges.push(cursor.fork(children[0]));
                    cursor.pop();
                } else {
                    cursor.push(children[0]);
                }
            }
        } else if (node.isAlternate()) {
            let nextNode: GrammarNode | undefined;
            for (const child of children) {
                if (!nextNode) {
                    nextNode = child;
                } else {
                    this.edges.push(cursor.fork(child));
                }
            }
            cursor.push(<GrammarNode>nextNode);
        } else if (children.length > index) {
            if (node.getRule().type === "rule") {
                cursor.startStep((<GrammarRule>node.getRule()).name);
            }
            cursor.push(children[index]);
        } else {
            if (node.getRule().type === "rule") {
                cursor.endStep((<GrammarRule>node.getRule()).name);
            }
            cursor.pop();
        }
        return Boolean(cursor.getNode());
    }

    /**
     * Returns the `ParseTreeNode` representing the root of this document
     * @returns The `ParseTreeNode` of the document root
     */
    public getParseTreeNode() {
        const parseTree = new ParseTreeBuilder(<ParseNamedStep>this.cursor.getLastStep());
        return parseTree.build();
    }
}
