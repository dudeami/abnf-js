import { ParseTreeNode } from "../parsing/ParseTreeNode.js";
import { CharArray } from "../parsing/Parser.js";

/**
 * Creates a `Reader` object to navigate and read `ParseTreeNode`s
 */
export class Reader {
    private readonly text: CharArray;
    private readonly tree: ParseTreeNode;

    /**
     * Creates a new `Reader` object from the given document and `ParseTreeNode`
     * @param text Document to extract text from
     * @param tree The `ParseTreeNode` representing the document
     */
    constructor(text: CharArray, tree: ParseTreeNode) {
        this.text = text;
        this.tree = tree;
    }

    /**
     * Returns the start position of the current `ParseTreeNode`
     * @returns
     */
    public start() {
        return this.tree.start;
    }

    /**
     * Returns the end position of the current `ParseTreeNode`
     * @returns
     */
    public end() {
        return this.tree.end;
    }

    /**
     * Returns a new `Reader` for the given rule name and index provided, or throws an error if it does not exist.
     * @param name The rule name to extract text for
     * @param index The index of the rule within the current `ParseTreeNode`
     * @returns
     */
    public get(name: string, index: number = 0) {
        name = name.toLowerCase();
        try {
            return new Reader(this.text, this.tree.children[name][index]);
        } catch (e) {
            throw new Error(`Child "${name}" at index ${index} does not exist within this parse tree.`);
        }
    }

    /**
     * Returns if the current `Reader` has a child with the given name at the given child index.
     * @param name The name of the child to check for
     * @param index The index of the child to check for
     * @returns `true` if the child exists, otherwise `false`
     */
    public has(name: string, index: number = 0) {
        name = name.toLowerCase();
        const child = this.tree.children[name];
        return Boolean(child) && Boolean(child[index]);
    }

    /**
     * Reads the substring of the document for the current `ParseTreeNode`
     * @returns The text from the document for the current `ParseTreeNode`
     */
    public read() {
        const slice = this.text.slice(this.tree.start, this.tree.end);
        const bpb = slice.BYTES_PER_ELEMENT;
        const textFormat = bpb == 1 ? "utf-8" : bpb == 4 ? "utf-32" : "utf-16";
        const decoder = new TextDecoder(textFormat);
        return decoder.decode(slice);
    }
}
