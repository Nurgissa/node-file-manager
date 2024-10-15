import {readdir} from 'fs/promises';
import {hasFile, printCurrentDirectory} from "../cli/helpers.mjs";


function prettyPrint(dirs, files) {
    console.table(dirs.concat(files))
}

const list = async (pathname) => {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    try {
        const dirEntries = await readdir(pathname, { withFileTypes: true });
        const folderList = dirEntries.filter(de => de.isDirectory()).map(de => ({ name: de.name, type: 'directory' })).sort();
        const fileList = dirEntries.filter(de => !de.isDirectory()).map(de => ({ name: de.name, type: 'file' })).sort();
        prettyPrint(folderList, fileList);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function lsCommandHandler(_, __, basePath) {
    list(basePath)
        .catch(err => console.error(err.message))
        .finally(printCurrentDirectory)
}