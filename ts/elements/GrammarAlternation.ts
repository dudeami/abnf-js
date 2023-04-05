import GrammarElement from "./GrammarElement.js";

type GrammarAlternation = {
    type: "alternation";
    alternates: GrammarElement[];
};

export default GrammarAlternation;
