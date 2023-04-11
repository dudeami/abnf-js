import { GrammarRuleSet } from "../elements/GrammarRuleSet.js";
import { buildGrammar } from "../elements/buildGrammar.js";

const RULESET: GrammarRuleSet = {
    alpha: {
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
    bit: {
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
    char: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [1, 127],
        },
        min: 1,
        max: 1,
    },
    cr: {
        type: "repetition",
        element: {
            type: "value",
            value: 13,
        },
        min: 1,
        max: 1,
    },
    crlf: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "cr",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "lf",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    ctl: {
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
    digit: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [48, 57],
        },
        min: 1,
        max: 1,
    },
    dquote: {
        type: "repetition",
        element: {
            type: "value",
            value: 34,
        },
        min: 1,
        max: 1,
    },
    hexdig: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "digit",
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
    htab: {
        type: "repetition",
        element: {
            type: "value",
            value: 9,
        },
        min: 1,
        max: 1,
    },
    lf: {
        type: "repetition",
        element: {
            type: "value",
            value: 10,
        },
        min: 1,
        max: 1,
    },
    lwsp: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "wsp",
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
                                name: "crlf",
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "wsp",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            ],
        },
    },
    octet: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [0, 255],
        },
        min: 1,
        max: 1,
    },
    sp: {
        type: "repetition",
        element: {
            type: "value",
            value: 32,
        },
        min: 1,
        max: 1,
    },
    vchar: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [33, 126],
        },
        min: 1,
        max: 1,
    },
    wsp: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "sp",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "htab",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    ows: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "sp",
                    },
                    min: 1,
                    max: 1,
                },
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "htab",
                    },
                    min: 1,
                    max: 1,
                },
            ],
        },
    },
};

export const CoreGrammar = buildGrammar(RULESET);
