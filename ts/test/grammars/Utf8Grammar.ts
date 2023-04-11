import { GrammarRuleSet } from "../../elements/GrammarRuleSet.js";
import { buildGrammar } from "../../elements/buildGrammar.js";
import { CoreGrammar } from "../../index.js";

const RULESET: GrammarRuleSet = {
    "utf8-octets": {
        type: "repetition",
        element: {
            type: "repetition",
            element: {
                type: "rule",
                name: "utf8-char",
            },
            min: 1,
            max: 1,
        },
    },
    "utf8-char": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "utf8-1",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "utf8-2",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "utf8-3",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "utf8-4",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "utf8-1": {
        type: "repetition",
        element: {
            type: "value-range",
            values: [0, 127],
        },
        min: 1,
        max: 1,
    },
    "utf8-2": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [194, 223],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "utf8-tail",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "utf8-3": {
        type: "alternation",
        alternates: [
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value",
                            value: 224,
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [160, 191],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "rule",
                            name: "utf8-tail",
                        },
                        min: 1,
                        max: 1,
                    },
                ],
            },
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [225, 236],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "utf8-tail",
                            },
                            min: 1,
                            max: 1,
                        },
                        min: 2,
                        max: 2,
                    },
                ],
            },
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value",
                            value: 237,
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [128, 159],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "rule",
                            name: "utf8-tail",
                        },
                        min: 1,
                        max: 1,
                    },
                ],
            },
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [238, 239],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "utf8-tail",
                            },
                            min: 1,
                            max: 1,
                        },
                        min: 2,
                        max: 2,
                    },
                ],
            },
        ],
    },
    "utf8-4": {
        type: "alternation",
        alternates: [
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value",
                            value: 240,
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [144, 191],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "utf8-tail",
                            },
                            min: 1,
                            max: 1,
                        },
                        min: 2,
                        max: 2,
                    },
                ],
            },
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [241, 243],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "utf8-tail",
                            },
                            min: 1,
                            max: 1,
                        },
                        min: 3,
                        max: 3,
                    },
                ],
            },
            {
                type: "concatenation",
                elements: [
                    {
                        type: "repetition",
                        element: {
                            type: "value",
                            value: 244,
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "value-range",
                            values: [128, 143],
                        },
                        min: 1,
                        max: 1,
                    },
                    {
                        type: "repetition",
                        element: {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "utf8-tail",
                            },
                            min: 1,
                            max: 1,
                        },
                        min: 2,
                        max: 2,
                    },
                ],
            },
        ],
    },
    "utf8-tail": {
        type: "repetition",
        element: {
            type: "value-range",
            values: [128, 191],
        },
        min: 1,
        max: 1,
    },
};

export const Utf8Grammar = buildGrammar(RULESET, CoreGrammar);
