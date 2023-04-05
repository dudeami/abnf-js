import GrammarRuleSet from "../../elements/GrammarRuleSet.js";
import buildGrammar from "../../elements/buildGrammar.js";

const RULESET: GrammarRuleSet = {
    "base-rule": {
        type: "repetition",
        element: {
            type: "rule",
            name: "second-rule",
        },
        min: 1,
        max: 1,
    },
    "second-rule": {
        type: "repetition",
        element: {
            type: "value-set",
            values: [97, 65],
        },
        min: 1,
        max: 1,
    },
};

const CaseInsensitiveGrammar = buildGrammar(RULESET);

export default CaseInsensitiveGrammar;
