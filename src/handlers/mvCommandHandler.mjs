import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";
import {resolve} from "node:path";
import {copy} from "./cpCommandHandler.mjs";
import {remove} from "./rmCommandHandler.mjs";


const move = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    try {
        await copy(source, target);
        await remove(source);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function mvCommandHandler(_, args) {
    if (!args || args.length < 2) {
        console.error('Invalid input');
        return;
    }

    const [source, target] = args;
    const absoluteSourcePath = resolve(source);
    const absoluteTargetPath = resolve(target);
    move(absoluteSourcePath, absoluteTargetPath)
        .catch(err => console.error(err))
        .finally(printCurrentDirectory);
}