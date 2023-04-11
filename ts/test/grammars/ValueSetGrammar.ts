import { GrammarRuleSet } from "../../elements/GrammarRuleSet.js";

export const ValueSetGrammar: GrammarRuleSet = {
    "base-rule": {
        type: "repetition",
        element: {
            type: "value-set",
            values: [97, 98, 99],
        },
    },
};
