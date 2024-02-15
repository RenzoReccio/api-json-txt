import * as fs from 'fs'
import { promisify } from 'util';

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
    return fs.existsSync(path);
};

export const getFile = async (
    path: string,
): Promise<string | Buffer> => {
    const readFile = promisify(fs.readFile);
    if (!checkIfFileOrDirectoryExists(path)) {
        return ""
    }
    return readFile(path, { encoding: 'utf8' });
};

export const createFile = async (
    path: string,
    fileName: string,
    data: string,
): Promise<void> => {
    if (!checkIfFileOrDirectoryExists(path)) {
        fs.mkdirSync(path);
    }

    const writeFile = promisify(fs.writeFile);

    return await writeFile(`${path}/${fileName}`, data, 'utf8');
};
