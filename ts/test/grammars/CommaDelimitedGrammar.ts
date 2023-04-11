import { GrammarRuleSet } from "../../elements/GrammarRuleSet.js";
import { buildGrammar } from "../../elements/buildGrammar.js";
import { CoreGrammar } from "../../grammars/CoreGrammar.js";

const RULESET: GrammarRuleSet = {
    "base-rule": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [97, 65],
                },
            },
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "rule",
                            name: "ows",
                        },
                        {
                            type: "value",
                            value: ",",
                        },
                        {
                            type: "rule",
                            name: "ows",
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "value-set",
                                values: [97, 65],
                            },
                        },
                    ],
                },
            },
        ],
    },
};

export const CommaDelimitedGrammar = buildGrammar(RULESET, CoreGrammar);
