import { GrammarElement } from "./GrammarElement.js";

export type GrammarConcatenation = {
    type: "concatenation";
    elements: GrammarElement[];
};
