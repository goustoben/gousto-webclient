import fs from "fs";
import path from "path";

function getPactFilePaths(pactDirectoryPath: string) {
    const pactFilesDirectoryPath = path.join(pactDirectoryPath, 'pacts');
    const pactFileNames = fs.readdirSync(pactFilesDirectoryPath);
    return pactFileNames.map(url => path.join(pactFilesDirectoryPath, url));
}

function getProviderNameFrom(pactFilePath: string) {
    const pactFileContent = JSON.parse(fs.readFileSync(pactFilePath).toString('utf8'));
    return pactFileContent.provider.name;
}

export async function forEachPactFileIn<TReturn>(pactDirectoryPath: string, handlePactFile: (pactFilePath: string, providerName: string) => Promise<TReturn>) {
    const pactFilePaths = getPactFilePaths(pactDirectoryPath);

    return await pactFilePaths.reduce(
        async (previousResultsPromise, pactFilePath) => {
            const providerName = getProviderNameFrom(pactFilePath);
            const result = await handlePactFile(pactFilePath, providerName)
            return [...await previousResultsPromise, result];
        },
        Promise.resolve([] as TReturn[])
    );
}
