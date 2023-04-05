import GrammarNode from "../graph/GrammarNode.js";

/**
 * Represents the current state of a `ParseCursor` that is forkable to follow seperate branches of a `GrammarGraph`
 */
export default class ParseCursorData {
    readonly index: number;
    readonly depth: number;
    readonly node: GrammarNode;
    readonly prev: ParseCursorData | undefined;

    /**
     *
     * @param index The index of the `ParseCursor`, which is either an iteration count or child `GrammarNode` index.
     * @param depth The depth of the current `ParseCursor`
     * @param node The next available node in the `GrammarGraph`
     * @param prev The parent `ParseCursorData`
     */
    constructor(index: number, depth: number, node: GrammarNode, prev?: ParseCursorData) {
        this.index = index;
        this.depth = depth;
        this.node = node;
        this.prev = prev;
    }

    /**
     * Returns a forked `ParseCursorData` of the next index within the parent
     * @returns The new `ParseCursorData` pointing at the parent of this
     */
    pop() {
        const prev = <ParseCursorData>this.prev;
        if (prev) {
            return new ParseCursorData(prev.index + 1, prev.depth, prev.node, prev.prev);
        } else {
            return undefined;
        }
    }

    /**
     * Returns a forked `ParseCursorData` for the `GrammarNode` given
     * @param node
     * @returns
     */
    push(node: GrammarNode) {
        return new ParseCursorData(0, this.depth + 1, node, this);
    }
}
