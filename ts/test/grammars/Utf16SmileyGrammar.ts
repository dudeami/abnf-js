import GrammarRuleSet from "../../elements/GrammarRuleSet.js";

const Utf16SmileyGrammar: GrammarRuleSet = {
    "base-rule": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 55357,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 56832,
                },
                min: 1,
                max: 1,
            },
        ],
    },
};

export default Utf16SmileyGrammar;
