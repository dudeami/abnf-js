import { GrammarRuleSet } from "../elements/GrammarRuleSet.js";
import { buildGrammar } from "../elements/buildGrammar.js";
import { CoreGrammar } from "./CoreGrammar.js";

const RULESET: GrammarRuleSet = {
    rulelist: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "rule",
                    },
                    min: 1,
                    max: 1,
                },
                {
                    type: "repetition",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "c-wsp",
                                },
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "c-nl",
                                },
                                min: 1,
                                max: 1,
                            },
                        ],
                    },
                    min: 1,
                    max: 1,
                },
            ],
        },
        min: 1,
    },
    rule: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "rulename",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "defined-as",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "elements",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-nl",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    rulename: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "alpha",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "alpha",
                            },
                            min: 1,
                            max: 1,
                        },
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
                                type: "value",
                                value: 45,
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
        ],
    },
    "defined-as": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "value",
                                value: 61,
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "concatenation",
                                elements: [
                                    {
                                        type: "value",
                                        value: 61,
                                    },
                                    {
                                        type: "value",
                                        value: 47,
                                    },
                                ],
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
        ],
    },
    elements: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "alternation",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
        ],
    },
    "c-wsp": {
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
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "c-nl",
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
                min: 1,
                max: 1,
            },
        ],
    },
    "c-nl": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "comment",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "crlf",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    comment: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 59,
                },
                min: 1,
                max: 1,
            },
            {
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
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "vchar",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "crlf",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    alternation: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "concatenation",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "c-wsp",
                            },
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "value",
                                value: 47,
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "c-wsp",
                            },
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "concatenation",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
        ],
    },
    concatenation: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "repetition",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "c-wsp",
                            },
                            min: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "repetition",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
        ],
    },
    repetition: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "repetition",
                        element: {
                            type: "alternation",
                            alternates: [
                                {
                                    type: "repetition",
                                    element: {
                                        type: "rule",
                                        name: "repeat",
                                    },
                                    min: 1,
                                    max: 1,
                                },
                                {
                                    type: "repetition",
                                    element: {
                                        type: "rule",
                                        name: "repeat-comma",
                                    },
                                    min: 1,
                                    max: 1,
                                },
                            ],
                        },
                        min: 1,
                        max: 1,
                    },
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "element",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    repeat: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "digit",
                },
                min: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "digit",
                            },
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "value",
                                value: 42,
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "digit",
                            },
                        },
                    ],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    element: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "rulename",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "group",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "option",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "char-val",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "num-val",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "prose-val",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    group: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 40,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "alternation",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 41,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    option: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 91,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "alternation",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "c-wsp",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 93,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "char-val": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "case-insensitive-string",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "case-sensitive-string",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "case-insensitive-string": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "repetition",
                        element: {
                            type: "concatenation",
                            elements: [
                                {
                                    type: "value",
                                    value: 37,
                                },
                                {
                                    type: "value-set",
                                    values: [105, 73],
                                },
                            ],
                        },
                        min: 1,
                        max: 1,
                    },
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "quoted-string",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "case-sensitive-string": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value",
                            value: 37,
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                    ],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "quoted-string",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "quoted-string": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "dquote",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "value-range",
                                values: [32, 33],
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "value-range",
                                values: [35, 126],
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "dquote",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "num-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 37,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "bin-val",
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "dec-val",
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "hex-val",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "bin-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [98, 66],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "bit",
                },
                min: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "alternation",
                        alternates: [
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 46,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "bit",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 45,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "bit",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                                max: 1,
                            },
                        ],
                    },
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "dec-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [100, 68],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "digit",
                },
                min: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "alternation",
                        alternates: [
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 46,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "digit",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 45,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "digit",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                                max: 1,
                            },
                        ],
                    },
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "hex-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [120, 88],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "hexdig",
                },
                min: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "alternation",
                        alternates: [
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 46,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "hexdig",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "concatenation",
                                    elements: [
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "value",
                                                value: 45,
                                            },
                                            min: 1,
                                            max: 1,
                                        },
                                        {
                                            type: "repetition",
                                            element: {
                                                type: "rule",
                                                name: "hexdig",
                                            },
                                            min: 1,
                                        },
                                    ],
                                },
                                min: 1,
                                max: 1,
                            },
                        ],
                    },
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "prose-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 60,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "value-range",
                                values: [32, 61],
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "value-range",
                                values: [63, 126],
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 62,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "repeat-comma": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "digit",
                },
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 35,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "digit",
                },
            },
        ],
    },
};

export const AbnfGrammar = buildGrammar(RULESET, CoreGrammar);
