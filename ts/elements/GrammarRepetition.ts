import GrammarElement from "./GrammarElement.js";

type GrammarRepetition = {
    type: "repetition";
    min?: number;
    max?: number;
    element: GrammarElement;
};

export default GrammarRepetition;
