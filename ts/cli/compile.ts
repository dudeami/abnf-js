#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import Compiler from "../compilation/Compiler.js";
import createTypescriptGrammar from "../templates/typescript.js";

program
    .option("-n, --name <string>", "Name of the grammar class created")
    .option("-i, --input <string>", "ABNF file to input")
    .option("-o, --output <string>", "JS Grammar file to output, or - for STDOUT")
    .option("-d, --deps [letters...]", "Add dependencies");

program.parse();

const opts = program.opts();

const text = fs.readFileSync(opts.input).toString();
const compiler = new Compiler(text);

const rules = compiler.build();

const grammar = createTypescriptGrammar(opts.name, JSON.stringify(rules, null, "\t"), opts.deps || []);
if (opts.output === "-") {
    process.stdout.write(grammar);
    process.stdout.write("\n");
} else {
    fs.writeFileSync(opts.output, grammar);
}
