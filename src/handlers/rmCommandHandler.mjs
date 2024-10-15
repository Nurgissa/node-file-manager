import {rm} from 'fs/promises';
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {isAbsolute, resolve} from "node:path";

export const remove = async (pathname) => {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    try {
        await rm(pathname);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function rmCommandHandler(_, args) {
    if (!args || args.length < 1) {
        console.error('Invalid input');
        return;
    }

    const [source] = args;
    const absolutePath = resolve(source);

    if (isAbsolute(absolutePath)) {
        return hasFile(absolutePath)
            .then(() => remove(absolutePath))
            .catch(err => console.error(err))
            .finally(printCurrentDirectory)
    }
}