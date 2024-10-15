import {createReadStream} from "node:fs";
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {isAbsolute, resolve} from "node:path";
import {stdout} from "node:process";


async function read(pathname) {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    const rs = createReadStream(pathname);
    rs.pipe(stdout);

    rs.on("error", () => {
        console.error("FS operation failed");
    });
}

export async function catCommandHandler(_, args) {
    if (!args || args.length < 1) {
        console.error('Invalid input');
        return;
    }

    const [source] = args;
    const absolutePath = resolve(source);

    if (isAbsolute(absolutePath)) {
        return hasFile(absolutePath)
            .then(() => read(absolutePath))
            .catch(err => console.error(err))
            .finally(printCurrentDirectory);
    }
}