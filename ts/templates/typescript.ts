/**
 * Helper used by the CLI to create a new TypeScript document containing a `AbnfGrammarRuleSet`
 * @param className The name of the new grammar class
 * @param grammar The `AbnfGrammarRuleSet` of the grammar
 * @param deps Any dependencies for this document. Only `CoreGrammar` and `AbnfGrammar` will work by default
 * @returns A string containing the typescript for the given grammar definition
 */
export function createTypescriptGrammar(className: string, grammar: string, deps: string[]) {
    const depString = deps.map((d) => ", " + d).join("");
    return `import { buildGrammar, AbnfGrammarRuleSet${depString} } from "abnf-js";

const RULESET: AbnfGrammarRuleSet = ${grammar};

export const ${className} = buildGrammar(RULESET${depString});
`;
}
