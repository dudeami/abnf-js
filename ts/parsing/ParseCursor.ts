import { GrammarNode } from "../graph/GrammarNode.js";
import { ParseCursorData } from "./ParseCursorData.js";
import { ParseNamedStep } from "./ParseNamedStep.js";

/**
 * A cursor which represents a branch in the GrammarGraph that is being parsed.
 */
export class ParseCursor {
    /**
     * The last named rule that this cursor is tracking
     */
    private lastStep: ParseNamedStep | undefined;
    /**
     * Data related to the state of the branch of parsing
     */
    private data: ParseCursorData | undefined;
    /**
     * Position the cursor is at within the document
     */
    private position: number = 0;

    /**
     * Creates the entry cursor to start processing a document
     * @param node The `GrammarNode` that represents the rule to process the document with
     * @returns A `ParseCursor` correlating with the start of the `GrammarGraph`
     */
    static createRootCursor(node: GrammarNode) {
        const data = new ParseCursorData(0, 0, node);
        return new ParseCursor(data);
    }

    /**
     * Forks this `ParseCursor` to follow a seperate branch of a `GrammarGraph`
     * @param node The `GrammarNode` of the new branch
     * @returns A `ParseCursor` correlating with the new branch
     */
    fork(node: GrammarNode) {
        const result = new ParseCursor(<ParseCursorData>this.data);
        result.position = this.position;
        result.lastStep = this.lastStep;
        result.push(node);
        return result;
    }

    /**
     * Creates a new `ParseCursor` with the given data object
     * @param data
     */
    private constructor(data: ParseCursorData) {
        this.data = data;
    }

    /**
     * Returns the current position of the cursor within the document
     * @returns The positon within the document
     */
    public getPosition() {
        return this.position;
    }

    /**
     * Incremenes the position within the document
     */
    public incPosition() {
        this.position++;
    }

    /**
     * Returns the current index of the cursor. Depending on context, the index can be the number of repetitions or the
     * index of the child being processed.
     * @returns
     */
    public getIndex() {
        const data = <ParseCursorData>this.data;
        return data.index;
    }

    /**
     * Returns the current `GrammarNode` for this cursor
     * @returns The current `GrammarNode`
     */
    public getNode() {
        return this.data?.node;
    }

    /**
     * Removes the child `GrammarNode` and moves the cursor back to the closest non-alternate parent
     */
    public pop() {
        const data = <ParseCursorData>this.data;
        this.data = data.pop();
        if (this.getNode()?.isAlternate()) {
            this.pop();
        }
    }

    /**
     * Adds a child to this `ParseCursor`
     * @param node The child `GrammarNode` to move the cursor to
     */
    public push(node: GrammarNode) {
        const data = <ParseCursorData>this.data;
        this.data = data.push(node);
    }

    /**
     * Adds a ParseNamedStep`  item that represents the start of a rule which will be used to construct the parse tree
     * @param name The name of the rule the `ParseNamedStep` entry represents
     */
    public startStep(name: string) {
        this.lastStep = new ParseNamedStep(this.lastStep, name, true, this.position);
    }

    /**
     * Adds a `ParseNamedStep` that represents the end of a rule which will be used to construct the parse tree
     * @param name The name of the rule the `ParseNamedStep` entry represents
     */
    public endStep(name: string) {
        this.lastStep = new ParseNamedStep(this.lastStep, name, false, this.position);
    }

    /**
     * Returns the `ParseNamedStep` of this `ParseCursor` for constructor a `ParseTreeNode`
     * @returns The `ParseNamedStep` of this `ParseCursor`
     */
    public getLastStep() {
        return this.lastStep;
    }
}
