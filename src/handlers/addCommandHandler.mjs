import {writeFile} from 'fs/promises';
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {isAbsolute, resolve} from "node:path";

async function create(pathname) {
    if (await hasFile(pathname)) throw Error("FS operation failed");

    try {
        await writeFile(pathname, "");
    } catch (error) {
        throw Error("FS operation failed");
    }
}

export async function addCommandHandler(_, args) {
    if (!args || args.length < 1) {
        console.error('Invalid input');
        return;
    }

    const [source] = args;
    const absolutePath = resolve(source);

    if (isAbsolute(absolutePath)) {
        return hasFile(absolutePath)
            .then(() => create(absolutePath))
            .catch(err => console.error(err))
            .finally(printCurrentDirectory);
    }
}