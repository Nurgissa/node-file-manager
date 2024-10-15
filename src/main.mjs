import {createInterface} from 'node:readline';
import {argv, chdir, stdin, stdout} from 'node:process';
import {homedir} from "node:os";

import {commandHandler, parseCommand} from "./cli/command-parser.mjs";
import {extractUsername, promptFarewell, promptGreeting} from "./cli/helpers.mjs";

(function main() {
    const username = extractUsername(argv);
    chdir(homedir());


    promptGreeting(username);

    // const newPath = join(__dirname, 'subfolder'); // or any other path you want
    // process.chdir(newPath);

    const rl = createInterface({
        input: stdin,
        output: stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        const commandParams = parseCommand(line);
        commandHandler(username)(commandParams);
    });

    rl.once('close', () => {
        promptFarewell(username);
    });

    process.on('SIGINT', () => {
        promptFarewell(username);
    })
})()