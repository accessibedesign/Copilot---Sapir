const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "./tests/jest.preset.js",
  transform: {
    "^.+\\.svg$": "<rootDir>/tests/transformers/svg.js",
    "^.+\\.scss$": "<rootDir>/tests/transformers/scss.js",
    "^.+\\.json$": "<rootDir>/tests/transformers/json.js",
  },
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  modulePathIgnorePatterns: ["dist/"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  collectCoverageFrom: ["src/**/*.{js,jsx,tsx,ts}", "!src/**/*.stories.tsx"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts", "<rootDir>/src/mock/*"],
  setupFilesAfterEnv: ["<rootDir>/tests/__mocks__/setupJestDom.ts", "<rootDir>/tests/__mocks__/setupDictionary.ts"],
};
