# ABNF parser written in TypeScript

This package is designed to allow easy usage of ABNF grammars in a javascript environment. This package can:

-   Compile ABNF grammars into a JSON grammar format
-   Take the JSON grammar and use it to parse text
-   Read text from the parse tree returned

## Example usage

A very simple example of creating a grammar to read numbers with optional decimal points:

```typescript
import { AbnfCompiler, AbnfParser, AbnfReader, toCharArray } from "abnf-js";

// Create a simple grammar
const grammarText = `number = 1*%x30-39 [ decimal ]\ndecimal = "." 1*%x30-39\n`;

// And a simple test string and convert it to a Uint16Array with the toCharArray helper provided
const text = toCharArray("615.485932053165");

// Create a compiler and use it to build a GrammarRuleSet
const compiler = new AbnfCompiler(grammarText);
const grammar = compiler.build();

// Create a parser and parse the text to return a ParseTree
const parser = new AbnfParser(grammar, "number");
const results = parser.parse(text);

// Results will be `false` on error, or a `ParseTree` on success
if (results) {
    // Create a reader with the results to extract text
    const reader = new AbnfReader(text, results);
    // Read the "decimal" rule from the "number" rule.
    console.log(reader.get("decimal").read());
}
```

## Compiling grammars to reduce overhead

It's fairly easy to compile a grammar using the CLI and `npx`. An example of compiling the ScramGrammar, including the
core ABNF grammar is as follows:

```bash
npx abnf-js -n ScramGrammar --input scram.abnf --output - -d CoreGrammar
```

This will output a TypeScript file that exports an `AbnfGrammarRuleSet` which can be used with this library. Most of
this is JSON with some wrappers for type declarations. You can then use the resulting grammar by passing it to
`AbnfParser` and `AbnfReader`:

```typescript
import { AbnfParser, AbnfReader, toCharArray } from "abnf-js";
import ScramGrammar from "./ScramGrammar.js";

const text = toCharArray("c=biws,r=fyko+d2lbbFgONRv9qkxdawL3rfcNHYJY1ZVvWVs7j,ext=test,p=v0X8v3Bz2T0CJGbJQyF0X+HI4Ts=");

const parser = new AbnfParser(ScramGrammar, "client-final-message");
const results = parser.parse(text);

if (results) {
    const reader = new AbnfReader(text, results);
    console.log(reader.get("proof").read());
}
```

## Troubleshooting compiling grammars

Grammars can fail for numerous reasons. Common issues are:

-   File uses LF for new lines, ABNF grammars specify CRLF new lines
-   Whitespace at the end of the file, end of file must be a CRLF
