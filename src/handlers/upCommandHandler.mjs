import {sep} from 'node:path';
import {chdir, cwd} from "node:process";
import {printCurrentDirectory} from "../cli/helpers.mjs";

export function upCommandHandler() {
    try {
        const path = cwd().split(sep).slice(0, -1).join(sep);
        chdir(path);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("You have reached root directory. You cannot go 'up' from here!");
        }
    }

    printCurrentDirectory();
}