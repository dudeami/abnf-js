import { ParseNamedStep } from "./ParseNamedStep.js";
import { ParseTreeNode } from "./ParseTreeNode.js";

/**
 * Given a `ParseNamedStep`, returns a `ParseTreeNode` to be used with an `AbnfReader` or manually accessed.
 */
export class ParseTreeBuilder {
    private readonly steps: ParseNamedStep[];
    private index: number;

    /**
     * Initialized the `ParseTreeBuilder`
     * @param lastStep The `ParseNamedStep` to iterate
     */
    constructor(lastStep: ParseNamedStep) {
        this.steps = this.flatten(lastStep);
        this.index = this.steps.length - 1;
    }

    /**
     * Constructs an array of `ParseNamedStep` in reverse order
     * @param lastStep The `ParseNamedStep` to iterate
     * @returns An array of `ParsedNamedItem` in reverse order
     */
    private flatten(lastStep: ParseNamedStep) {
        const results: ParseNamedStep[] = [];
        let step: ParseNamedStep | undefined = lastStep;
        while (step) {
            results.push(step);
            step = step.prev;
        }
        return results;
    }

    /**
     * Builds the `ParseTreeNode` structure from the given `ParseNamedStep`
     * @returns The `ParseTreeNode` representing the parse
     */
    public build() {
        const root = {
            start: 0,
            end: -1,
            children: {},
        };
        return this.buildObject(root);
    }

    /**
     * Builds a `ParseTreeNode` and it's children from the `steps` array
     * @param object the `ParseTreeNode` to build out
     * @returns A `ParseTreeNode` with the relevent `ParseNamedStep`s applied
     */
    public buildObject(object: ParseTreeNode) {
        let item = this.steps[this.index];
        while (item && item.isStart) {
            const child: ParseTreeNode = {
                start: item.position,
                end: -1,
                children: {},
            };
            if (!object.children[item.name]) {
                object.children[item.name] = [];
            }
            object.children[item.name].push(child);
            this.index--;
            this.buildObject(child);
            const closeItem = this.steps[this.index];
            child.end = closeItem.position;
            this.index--;
            item = this.steps[this.index];
        }
        return object;
    }
}
