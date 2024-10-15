import {createReadStream, createWriteStream} from "node:fs";
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {resolve} from "node:path";

export const copy = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    const rs = createReadStream(source);
    const ws = createWriteStream(target);
    
    try {
        rs.pipe(ws);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function cpCommandHandler(_, args) {
    if (!args || args.length < 2) {
        console.error('Invalid input');
        return;
    }

    const [source, target] = args;
    const absoluteSourcePath = resolve(source);
    const absoluteTargetPath = resolve(target);
    copy(absoluteSourcePath, absoluteTargetPath)
        .catch(err => console.error(err))
        .finally(printCurrentDirectory);
}