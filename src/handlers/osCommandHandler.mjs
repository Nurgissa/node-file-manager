import os from 'os';
import {printCurrentDirectory} from "../cli/helpers.mjs";

export function osCommandHandler(_, args) {
    const [ key = '--'] = args;
    switch(key) {
        case '--EOL': {
            console.log(os.EOL);
            break;
        }
        case '--cpus': {
            console.log(os.cpus());
            break;
        }
        case '--homedir': {
            console.log(os.homedir());
            break;
        }
        case '--username': {
            console.log(os.userInfo().username);
            break;
        }
        case '--architecture': {
            console.log(os.arch());
            break;
        }
        default: {
            console.error('Invalid input');
        }
    }

    printCurrentDirectory();
}