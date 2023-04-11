import { GrammarElement } from "./GrammarElement.js";

export type GrammarRepetition = {
    type: "repetition";
    min?: number;
    max?: number;
    element: GrammarElement;
};
