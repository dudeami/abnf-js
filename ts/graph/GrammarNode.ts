import GrammarElement from "../elements/GrammarElement.js";

/**
 * Defines the behavior of a `GrammarElement` within a `GrammarGraph`
 */
export default interface GrammarNode {
    /**
     * Child elements of this `GrammarNode`, if any
     */
    children(): GrammarNode[];

    /**
     * If true, this `GrammarNode`'s children are alternate paths. If false, this `GrammarNode`'s children are sequential.
     */
    isAlternate(): boolean;

    /**
     * If true, this `GrammarNode` can be repeated between a minimum of 0 to a maximum infinite times, as defined by
     * GrammarRepeatNode
     */
    isRepeat(): boolean;

    /**
     * If true, this `GrammarNode` checks against a character within the text being parsed.
     */
    isParse(): boolean;

    /**
     * Returns the rule this `GrammarNode` represents
     */
    getRule(): GrammarElement;
}
