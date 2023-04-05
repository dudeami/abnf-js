import GrammarRuleSet from "../../elements/GrammarRuleSet.js";

const ValueSetGrammar: GrammarRuleSet = {
    "base-rule": {
        type: "repetition",
        element: {
            type: "value-set",
            values: [97, 98, 99],
        },
    },
};

export default ValueSetGrammar;
