import "@testing-library/jest-dom";
import "construct-style-sheets-polyfill";

/**
 * JSDOM does not implement global "open" function
 */
window.open = jest.fn();
