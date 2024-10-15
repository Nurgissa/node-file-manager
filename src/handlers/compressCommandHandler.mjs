import {resolve} from "node:path";
import {createReadStream, createWriteStream} from 'node:fs';
import {createBrotliCompress} from 'node:zlib';
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";


const compress = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    const rs = createReadStream(source);
    const ws = createWriteStream(target);
    const brotli = createBrotliCompress();

    const stream = rs.pipe(brotli).pipe(ws);
    stream.on("error", () => {
        console.error("FS operation failed");
    });

    stream.on("finish", () => {
       ws.close();
    });
};

export async function compressCommandHandler(_, args) {
    if (!args || args.length < 2) {
        console.error('Invalid input');
        return;
    }

    const [source, target] = args;

    const absoluteSourcePath = resolve(source);
    const absoluteTargetPath = resolve(target);
    compress(absoluteSourcePath, absoluteTargetPath)
        .catch(err => console.error(err))
        .finally(printCurrentDirectory);
}