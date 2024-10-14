import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';


function extractUsername() {
    return "unknown";
}

function parseCommand() {
    return "";
}

function commandHandler() {
    return "";
}

function promptGreeting(username) {
    console.log(`Welcome to the File Manager, ${username}!\n`);
}

(function main() {
    const username = extractUsername(process.argv);
    promptGreeting(username);

    const rl = createInterface({
        input: stdin,
        output: stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        const commandParams = parseCommand(line);
        console.log(commandParams);
    });

    rl.once('close', () => {
        // end of input
        console.log("ending interaction");
    });
})()