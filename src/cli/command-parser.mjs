import {cwd} from 'node:process';

import {osCommandHandler} from "../handlers/osCommandHandler.mjs";
import {catCommandHandler} from "../handlers/catCommandHandler.mjs";
import {rmCommandHandler} from '../handlers/rmCommandHandler.mjs';
import {lsCommandHandler} from '../handlers/lsCommandHandler.mjs';
import {addCommandHandler} from '../handlers/addCommandHandler.mjs';
import {rnCommandHandler} from '../handlers/rnCommandHandler.mjs';
import {cpCommandHandler} from '../handlers/cpCommandHandler.mjs';
import {hashCommandHandler} from '../handlers/hashCommandHandler.mjs';
import {upCommandHandler} from "../handlers/upCommandHandler.mjs";
import {printCurrentDirectory, promptFarewell} from "./helpers.mjs";
import {mvCommandHandler} from "../handlers/mvCommandHandler.mjs";
import {cdCommandHandler} from "../handlers/cdCommandHandler.mjs";
import {compressCommandHandler} from "../handlers/compressCommandHandler.mjs";
import {decompressCommandHandler} from "../handlers/decompressCommandHandler.mjs";

const commandMap = {
    'up': upCommandHandler,
    'cd': cdCommandHandler,
    'ls': lsCommandHandler,
    'cat': catCommandHandler,
    'add': addCommandHandler,
    'rn': rnCommandHandler,
    'cp': cpCommandHandler,
    'mv': mvCommandHandler,
    'rm': rmCommandHandler,
    'os': osCommandHandler,
    'hash': hashCommandHandler,
    'compress': compressCommandHandler,
    'decompress': decompressCommandHandler,
    '.exit': (username) => {
        promptFarewell(username);
    },
}

function invalidCommandHandler() {
    console.error('Invalid input');
    printCurrentDirectory();
}

export function commandHandler(username) {
    return function(commandParams) {
        const { command, commandArgs } = commandParams;
        const handler = commandMap[command] || invalidCommandHandler;
        handler(username, commandArgs, cwd());
    }
}

export function parseCommand(line = "") {
    if (!line) {
        return {};
    }

    const [command, ...rest] = line.trim().split(/\s+/);
    
    return {
        command,
        commandArgs: rest
    }
}