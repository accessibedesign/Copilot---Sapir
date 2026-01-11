import { setImmediate } from "timers";

/**
 * a promise that exhausts all promises so we can test the UI correctly in async manner
 * sources:
 * https://www.benmvp.com/blog/asynchronous-testing-with-enzyme-react-jest/
 * https://github.com/enzymejs/enzyme/issues/1587
 */

export const runAllPromises = (): Promise<void> => new Promise(setImmediate);
