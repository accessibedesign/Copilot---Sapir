const resourceToString = require("./resourceToString");
const sass = require("sass");
const {optimize} = require('svgo');
const csso = require("csso");
const {pathToFileURL} = require("url");

const moduleType = process.env.npm_lifecycle_event.replace("build:", "")
const outputDir = `dist/${moduleType}`;
const conversionMethod = moduleType === 'cjs'?  resourceToString.convertToCommonJSModule : resourceToString.convertToESModule
/**
 * A build step, optimize and `SVG` files and copy them to the `dist` folder
 */
resourceToString.run({
    pattern: "**/*.svg", rootDir: "src", outputDir, precompile: (content) => {
        return optimize(content).data;
    }, conversionMethod
});


/**
 * A build step, convert and optimize `SCSS` files into `CSS` and copy them to the `dist` folder
 */
resourceToString.run({
    pattern: "**/*.scss", rootDir: "src", outputDir, precompile: (content, filePath) => {
        const css = sass
            .compile(filePath, {
                importers: [{
                    findFileUrl: (url) => url.startsWith("~") ? new URL(pathToFileURL("src").href + url.substring(1)) : null,
                },],
            })
            .css.toString();

        return csso.minify(css).css;
    }, conversionMethod
});

resourceToString.run({
    pattern: "**/*.json", rootDir: "src", outputDir, includeRaw: true, precompile: (content) => {
        return content;
    }, conversionMethod
});