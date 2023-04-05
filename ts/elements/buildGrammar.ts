import GrammarRuleSet from "./GrammarRuleSet.js";

/**
 * Creates a new grammar based on a `GrammarRuleSet` and a set of inherited `GrammarRuleSet`'s
 * @param ruleSet The rule set of the new grammar
 * @param grammars Optional grammars to use ruleset's of
 * @returns A `GrammarRuleSet` composed of the inheritied `GrammarRuleSet`'s and the given `GrammarRuleSet`
 */
export default function buildGrammar(ruleSet: GrammarRuleSet, ...grammars: GrammarRuleSet[]) {
    const combinedRuleSet = {};
    for (const grammar of grammars) {
        Object.assign(combinedRuleSet, grammar);
    }
    Object.assign(combinedRuleSet, ruleSet);
    return combinedRuleSet;
}
