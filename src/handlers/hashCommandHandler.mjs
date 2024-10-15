import {createReadStream} from 'node:fs';
import {isAbsolute, resolve} from "node:path";
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";


const {
    createHash
} = await import('crypto');

const calculateHash = async (filepath) => {
    const hash = createHash('sha256');

    const rs = createReadStream(filepath);

    rs.on('readable', () => {
        const data = rs.read();

        if (data) {
            hash.update(data);
        } else {
            console.log(hash.copy().digest("hex"));
        }
    });

    rs.on('error', () => {
        console.error("FS operation failed");
    })
};

export async function hashCommandHandler(_, args) {
    if (!args || args.length < 1) {
        console.error('Invalid input');
        return;
    }

    const [source] = args;
    const absolutePath = resolve(source);

    if (isAbsolute(absolutePath)) {
        return hasFile(absolutePath)
            .then(() => calculateHash(absolutePath))
            .catch(err => console.error(err))
            .finally(printCurrentDirectory)
    }
}