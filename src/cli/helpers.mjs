import {cwd, exit} from "node:process";
import {stat} from "node:fs/promises";

export function extractUsername(args = []) {
    if (args.length < 3) {
        throw new Error("Error: Start file-manager as npm run start -- --username=<your_username>");
    }
    
    const [, value] = args[2].split("=");
    return value;
}

export function printCurrentDirectory() {
    console.log(`You are currently in ${cwd()}`);
}

export function promptGreeting(username) {
    console.log(`Welcome to the File Manager, ${username}!\n`);
    printCurrentDirectory();
}

export function promptFarewell(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    exit(0);
}

export const hasFile = (path) => stat(path).then(() => true).catch(() => false);