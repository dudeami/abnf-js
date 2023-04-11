import { GrammarAlternation } from "./GrammarAlternation.js";
import { GrammarConcatenation } from "./GrammarConcatenation.js";
import { GrammarOption } from "./GrammarOption.js";
import { GrammarRepetition } from "./GrammarRepetition.js";
import { GrammarRule } from "./GrammarRule.js";
import { GrammarValue } from "./GrammarValue.js";
import { GrammarValueRange } from "./GrammarValueRange.js";
import { GrammarValueSet } from "./GrammarValueSet.js";

export type GrammarElement =
    | GrammarRepetition
    | GrammarAlternation
    | GrammarRule
    | GrammarValue
    | GrammarValueRange
    | GrammarValueSet
    | GrammarConcatenation
    | GrammarOption;
