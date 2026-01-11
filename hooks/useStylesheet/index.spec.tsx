import { renderHook, waitFor } from "@testing-library/preact";
import { h } from "preact";
import { ShadowRootStateProvider, boundStylesheets, useStylesheet } from ".";
import * as utils from "./utils";
jest.mock("./utils", () => ({
  __esModule: true,
  isAdoptedStyleSheetsSupported: null,
}));

describe("useStylesheet", () => {
  afterEach(() => {
    boundStylesheets.clear();
    document.adoptedStyleSheets = [];
    document.body.innerHTML = "";
  });
  beforeEach(() => {
    (utils.isAdoptedStyleSheetsSupported as unknown) = true;
  });
  const shadowRoot = document as unknown as ShadowRoot;
  const wrapper = ({ children }) => (
    <ShadowRootStateProvider shadowRoot={shadowRoot}>{children}</ShadowRootStateProvider>
  );
  it("should add a stylesheet with the given cssText and css variables to the shadowRoot's adoptedStyleSheets", async () => {
    const cssText = "body { background-color: red; }";
    const cssVariables = { color: "blue" };
    renderHook(() => useStylesheet(cssText, cssVariables), { wrapper });
    await waitFor(() => {
      expect(getComputedStyle(document.body).backgroundColor).toBe("red");

      expect(document.querySelector("style").innerHTML).toBe(":host {--color:blue;}body { background-color: red; }"); // TODO: for some reason, getComputedStyle doesnt return the css variables values. need to that the css variables are actually applied

      expect(document.adoptedStyleSheets.length).toBe(1);
    });
  });
  it("should replace stylesheet content if it already exists in the shadowRoot's adoptedStyleSheets and not add another one", async () => {
    const cssText = "body { background-color: red; }";
    const cssVariables = { color: "blue" };

    renderHook(() => useStylesheet(cssText, cssVariables), { wrapper });
    renderHook(() => useStylesheet(cssText, cssVariables), { wrapper });
    await waitFor(() => {
      expect(document.querySelector("style").innerHTML).toBe(":host {--color:blue;}body { background-color: red; }");
    });
    renderHook(() => useStylesheet(cssText, { ...cssVariables, color: "white" }), { wrapper });

    await waitFor(() => {
      expect(document.querySelector("style").innerHTML).toBe(":host {--color:white;}body { background-color: red; }");
    });

    expect(document.adoptedStyleSheets.length).toBe(1);
  });

  it("should throw if useStylesheetState.setShadowRoot is not called before calling useStylesheet", () => {
    const cssText = "body { background-color: red; }";
    const cssVariables = { color: "blue" };
    const wrapper = ({ children }) => <ShadowRootStateProvider shadowRoot={null}>{children}</ShadowRootStateProvider>;
    expect(() => renderHook(() => useStylesheet(cssText, cssVariables), { wrapper })).toThrowError(
      "ShadowRoot is not initialized. Please call `setShadowRoot` before using this hook."
    );
  });

  describe("isAdoptedStyleSheetsSupported: false", () => {
    const shadowRoot = document.body as unknown as ShadowRoot;
    const wrapper = ({ children }) => (
      <ShadowRootStateProvider shadowRoot={shadowRoot}>{children}</ShadowRootStateProvider>
    );

    beforeEach(() => {
      (utils.isAdoptedStyleSheetsSupported as unknown) = false;
    });
    it("should replace stylesheet content if it already exists in the DOM and not add another one", () => {
      const cssText = "body { background-color: red; }";
      const cssVariables = { color: "blue" };
      renderHook(() => useStylesheet(cssText, cssVariables), { wrapper });
      expect(document.querySelector("style").innerHTML).toBe(":host {--color:blue;}body { background-color: red; }");
      renderHook(() => useStylesheet(cssText, { color: "white" }), { wrapper });
      expect(document.querySelector("style").innerHTML).toBe(":host {--color:white;}body { background-color: red; }");
      expect(document.adoptedStyleSheets.length).toBe(0);
    });
    it('should inject style tag if "adoptedStyleSheets" is not supported', () => {
      const cssText = "body { background-color: red; }";
      const cssVariables = { color: "blue" };
      renderHook(() => useStylesheet(cssText, cssVariables), { wrapper });
      expect(document.adoptedStyleSheets.length).toBe(0);
      expect(document.querySelector("style").innerHTML).toBe(":host {--color:blue;}body { background-color: red; }");
    });
  });
});
