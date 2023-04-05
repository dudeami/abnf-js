import GrammarElement from "./GrammarElement.js";

type GrammarConcatenation = {
    type: "concatenation";
    elements: GrammarElement[];
};

export default GrammarConcatenation;
