import {isAbsolute, resolve} from "node:path";
import {chdir} from "node:process";
import {stat} from "node:fs/promises";
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";

export async function cdCommandHandler(_, args) {
    const [newPath] = args;
    const absolutePath = resolve(newPath);
    if (isAbsolute(absolutePath)) {
        return hasFile(absolutePath)
            .then(() => stat(absolutePath))
            .then(stats => stats.isDirectory())
            .then(() => chdir(absolutePath))
            .catch(() => console.error("FS operation failed"))
            .finally(printCurrentDirectory);
    }
}