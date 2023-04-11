import { GrammarElement } from "./GrammarElement.js";

export type GrammarAlternation = {
    type: "alternation";
    alternates: GrammarElement[];
};
