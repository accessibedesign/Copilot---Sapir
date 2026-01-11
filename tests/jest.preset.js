const defaultPreset = require("jest-preset-preact");

//Removing the Ignore from scss files
defaultPreset.transformIgnorePatterns = defaultPreset.transformIgnorePatterns.filter((pattern) => pattern !== "^.+\\.(css|sass|scss|less)$");
//Removing the aliasing of scss files
delete defaultPreset.moduleNameMapper["^.+\\.(css|sass|scss|less)$"];

defaultPreset.transform["^.+\\.scss"] = "./tests/transformers/scss.js";

module.exports = defaultPreset;
