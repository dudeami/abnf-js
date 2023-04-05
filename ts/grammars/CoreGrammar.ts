import GrammarRuleSet from "../elements/GrammarRuleSet.js";
import buildGrammar from "../elements/buildGrammar.js";

const RULESET: GrammarRuleSet = {
    ALPHA: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [65, 90],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [97, 122],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    BIT: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 48,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 49,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    CHAR: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [1, 127],
        },
        min: 1,
        max: 1,
    },
    CR: {
        type: "repetition",
        element: {
            type: "value",
            value: 13,
        },
        min: 1,
        max: 1,
    },
    CRLF: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "CR",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "LF",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    CTL: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [0, 31],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 127,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    DIGIT: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [48, 57],
        },
        min: 1,
        max: 1,
    },
    DQUOTE: {
        type: "repetition",
        element: {
            type: "value",
            value: 34,
        },
        min: 1,
        max: 1,
    },
    HEXDIG: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "DIGIT",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [65, 97],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [66, 98],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [67, 99],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [68, 100],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [69, 101],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [70, 102],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    HTAB: {
        type: "repetition",
        element: {
            type: "value",
            value: 9,
        },
        min: 1,
        max: 1,
    },
    LF: {
        type: "repetition",
        element: {
            type: "value",
            value: 10,
        },
        min: 1,
        max: 1,
    },
    LWSP: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "WSP",
                    },
                    min: 1,
                    max: 1,
                },
                {
                    type: "concatenation",
                    elements: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "CRLF",
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "WSP",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            ],
        },
    },
    OCTET: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [0, 255],
        },
        min: 1,
        max: 1,
    },
    SP: {
        type: "repetition",
        element: {
            type: "value",
            value: 32,
        },
        min: 1,
        max: 1,
    },
    VCHAR: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [33, 126],
        },
        min: 1,
        max: 1,
    },
    WSP: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "SP",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "HTAB",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    OWS: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "SP",
                    },
                    min: 1,
                    max: 1,
                },
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "HTAB",
                    },
                    min: 1,
                    max: 1,
                },
            ],
        },
    },
};

const CoreGrammar = buildGrammar(RULESET);

export default CoreGrammar;
