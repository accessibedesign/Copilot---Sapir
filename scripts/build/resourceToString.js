const glob = require("glob");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");

/**
 * @class
 * @classdesc An helper for converting resource files into an es-module (similar to raw-loader)
 */
module.exports = class ResourceToString {

    /**
     * Find all the files that matches the `pattern` under the `rootDir`
     * Run the provided `precompile` method on the content of the file, and
     * @param {string} pattern a glob pattern for matching the files to parse
     * @param {string} outputDir the root dir of the build directory (e.g dist)
     * @param {(content: string, filePath: string)=> string} precompile a method for running custom pre-compliation on the content of the file
     * @param {string} rootDir the root directory to match the pattern from
     * @param {boolean} includeRaw weather to also copy the file to the dist folder in its raw form
     */
    static run({pattern, outputDir, precompile, rootDir, includeRaw= false, conversionMethod = this.convertToESModule}) {

        console.log(`Running resource-to-string for pattern [pattern: ${pattern}, rootDir: ${rootDir}]`);

        const filesPath = glob.sync( rootDir + "/" + pattern);

        for(let filePath of filesPath) {

            const rawFileContent = fs.readFileSync(filePath).toString();
            let fileContent = precompile(rawFileContent, filePath);
            fileContent = conversionMethod(fileContent);

            fse.outputFileSync(path.resolve(`${outputDir}`,`${filePath.replace(rootDir + "/", "")}.js`), fileContent)
            if(includeRaw) {
                fse.outputFileSync(path.resolve(`${outputDir}`,`${filePath.replace(rootDir + "/", "")}`), rawFileContent)
            }

        }

        console.log(`Finished resource-to-string for pattern [pattern: ${pattern}, rootDir: ${rootDir}]`);

    }

    /**
     * Converts given `content` to an es-module that export the `content` as string.
     */
    static convertToESModule(content) {

       return `const s = \`${content}\`; export default s;`;


    }

    /**
     * Converts given `content` to a commonJS module that exports the `content` as string.
     */
    static convertToCommonJSModule(content) {
        return `module.exports = \`${content}\`;`;
    }

}
