import {rename as renameFile} from 'fs/promises';
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {resolve} from "node:path";

const rename = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    try {
        await renameFile(source, target);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function rnCommandHandler(_, args) {
    if (!args || args.length < 2) {
        console.error('Invalid input');
        return;
    }


    const [source, target] = args;
    const absoluteSourcePath = resolve(source);
    const absoluteTargetPath = resolve(target);
    rename(absoluteSourcePath, absoluteTargetPath)
        .catch(err => console.error(err));

    printCurrentDirectory();
}