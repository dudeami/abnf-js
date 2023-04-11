import { GrammarRuleSet } from "../../elements/GrammarRuleSet.js";
import { buildGrammar } from "../../elements/buildGrammar.js";
import { CoreGrammar } from "../../grammars/CoreGrammar.js";

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
    DIGIT: {
        type: "repetition",
        element: {
            type: "value-range",
            values: [48, 57],
        },
        min: 1,
        max: 1,
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
    "UTF8-2": {
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
                    name: "UTF8-tail",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "UTF8-3": {
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
                            name: "UTF8-tail",
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
                                name: "UTF8-tail",
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
                            name: "UTF8-tail",
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
                                name: "UTF8-tail",
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
    "UTF8-4": {
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
                                name: "UTF8-tail",
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
                                name: "UTF8-tail",
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
                                name: "UTF8-tail",
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
    "UTF8-tail": {
        type: "repetition",
        element: {
            type: "value-range",
            values: [128, 191],
        },
        min: 1,
        max: 1,
    },
    "attr-val": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "ALPHA",
                },
                min: 1,
            },
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
                    type: "rule",
                    name: "value",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    value: {
        type: "repetition",
        element: {
            type: "rule",
            name: "value-char",
        },
        min: 1,
    },
    "value-safe-char": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [1, 43],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [45, 60],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [62, 127],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "UTF8-2",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "UTF8-3",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "UTF8-4",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "value-char": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "value-safe-char",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 61,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    printable: {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [33, 43],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [45, 126],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "base64-char": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "ALPHA",
                },
                min: 1,
                max: 1,
            },
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
                    type: "value",
                    value: 47,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 43,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "base64-4": {
        type: "repetition",
        element: {
            type: "rule",
            name: "base64-char",
        },
        min: 4,
        max: 4,
    },
    "base64-3": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "base64-char",
                },
                min: 3,
                max: 3,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 61,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "base64-2": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "base64-char",
                },
                min: 2,
                max: 2,
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
                            value: 61,
                        },
                    ],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    base64: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "base64-4",
                },
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
                                    type: "rule",
                                    name: "base64-3",
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "base64-2",
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
    "posit-number": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "value-range",
                    values: [49, 57],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "DIGIT",
                },
            },
        ],
    },
    saslname: {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "value-safe-char",
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
                                value: 50,
                            },
                            {
                                type: "value-set",
                                values: [67, 99],
                            },
                        ],
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
                                value: 51,
                            },
                            {
                                type: "value-set",
                                values: [68, 100],
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
    authzid: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "saslname",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "cb-name": {
        type: "repetition",
        element: {
            type: "alternation",
            alternates: [
                {
                    type: "repetition",
                    element: {
                        type: "rule",
                        name: "ALPHA",
                    },
                    min: 1,
                    max: 1,
                },
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
                        type: "value",
                        value: 46,
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
        min: 1,
    },
    "gs2-cbind-flag": {
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
                                type: "concatenation",
                                elements: [
                                    {
                                        type: "value-set",
                                        values: [112, 80],
                                    },
                                    {
                                        type: "value",
                                        value: 61,
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
                                name: "cb-name",
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
                    type: "value-set",
                    values: [110, 78],
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value-set",
                    values: [121, 89],
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "gs2-header": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "gs2-cbind-flag",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "repetition",
                        element: {
                            type: "rule",
                            name: "authzid",
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
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
        ],
    },
    username: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "saslname",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "reserved-mext": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [109, 77],
                        },
                        {
                            type: "value",
                            value: 61,
                        },
                    ],
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
                        name: "value-char",
                    },
                    min: 1,
                    max: 1,
                },
                min: 1,
            },
        ],
    },
    "channel-binding": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "base64",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    proof: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "base64",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    nonce: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "c-nonce",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "repetition",
                        element: {
                            type: "rule",
                            name: "s-nonce",
                        },
                        min: 1,
                        max: 1,
                    },
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "c-nonce": {
        type: "repetition",
        element: {
            type: "rule",
            name: "printable",
        },
    },
    "s-nonce": {
        type: "repetition",
        element: {
            type: "rule",
            name: "printable",
        },
    },
    salt: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "base64",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    verifier: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [118, 86],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "base64",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "iteration-count": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "posit-number",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "client-first-message-bare": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "reserved-mext",
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
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
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "username",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "nonce",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "extensions",
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
    "client-first-message": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "gs2-header",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "client-first-message-bare",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "server-first-message": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "reserved-mext",
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
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
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "nonce",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "salt",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "iteration-count",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "extensions",
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
    "client-final-message-without-proof": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "channel-binding",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "nonce",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "extensions",
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
    "client-final-message": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "client-final-message-without-proof",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "value",
                    value: 44,
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "proof",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "server-error": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value",
                            value: 61,
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
                    name: "server-error-value",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "server-error-value": {
        type: "alternation",
        alternates: [
            {
                type: "repetition",
                element: {
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [118, 86],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                    ],
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
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [120, 88],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                    ],
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
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [118, 86],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [102, 70],
                        },
                    ],
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
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [98, 66],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [109, 77],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                    ],
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
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [118, 86],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [98, 66],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                    ],
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
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [98, 66],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                    ],
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
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [98, 66],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [121, 89],
                        },
                        {
                            type: "value-set",
                            values: [112, 80],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                    ],
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
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [107, 75],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [119, 87],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                    ],
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
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [118, 86],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [108, 76],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [97, 65],
                        },
                        {
                            type: "value-set",
                            values: [109, 77],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [100, 68],
                        },
                        {
                            type: "value-set",
                            values: [105, 73],
                        },
                        {
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [103, 71],
                        },
                    ],
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
                            type: "value-set",
                            values: [110, 78],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [115, 83],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [117, 85],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [99, 67],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
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
                    type: "concatenation",
                    elements: [
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [116, 84],
                        },
                        {
                            type: "value-set",
                            values: [104, 72],
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value",
                            value: 45,
                        },
                        {
                            type: "value-set",
                            values: [101, 69],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
                        },
                        {
                            type: "value-set",
                            values: [111, 79],
                        },
                        {
                            type: "value-set",
                            values: [114, 82],
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
                    name: "server-error-value-ext",
                },
                min: 1,
                max: 1,
            },
        ],
    },
    "server-error-value-ext": {
        type: "repetition",
        element: {
            type: "rule",
            name: "value",
        },
        min: 1,
        max: 1,
    },
    "server-final-message": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "alternation",
                    alternates: [
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "server-error",
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "verifier",
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
                    type: "option",
                    element: {
                        type: "concatenation",
                        elements: [
                            {
                                type: "repetition",
                                element: {
                                    type: "value",
                                    value: 44,
                                },
                                min: 1,
                                max: 1,
                            },
                            {
                                type: "repetition",
                                element: {
                                    type: "rule",
                                    name: "extensions",
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
    extensions: {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "attr-val",
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
                                type: "value",
                                value: 44,
                            },
                            min: 1,
                            max: 1,
                        },
                        {
                            type: "repetition",
                            element: {
                                type: "rule",
                                name: "attr-val",
                            },
                            min: 1,
                            max: 1,
                        },
                    ],
                },
            },
        ],
    },
    "cbind-data": {
        type: "repetition",
        element: {
            type: "rule",
            name: "OCTET",
        },
        min: 1,
    },
    "cbind-input": {
        type: "concatenation",
        elements: [
            {
                type: "repetition",
                element: {
                    type: "rule",
                    name: "gs2-header",
                },
                min: 1,
                max: 1,
            },
            {
                type: "repetition",
                element: {
                    type: "option",
                    element: {
                        type: "repetition",
                        element: {
                            type: "rule",
                            name: "cbind-data",
                        },
                        min: 1,
                        max: 1,
                    },
                },
                min: 1,
                max: 1,
            },
        ],
    },
};

export const ScramGrammar = buildGrammar(RULESET, CoreGrammar);
