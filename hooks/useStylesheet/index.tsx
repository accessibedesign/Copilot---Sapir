import { ComponentChildren, VNode, createContext, h } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { isAdoptedStyleSheetsSupported } from "./utils";
interface ShadowRootState {
  shadowRoot: ShadowRoot;
}

const replaceStyleContent = (cssText: string, style: HTMLStyleElement | CSSStyleSheet): void => {
  if (style instanceof CSSStyleSheet) {
    style.replaceSync(cssText);
  } else {
    style.textContent = cssText;
  }
};

const insertAdoptedStyleSheet = (shadowRoot: ShadowRoot, styleSheetContent: string) => {
  const newStyleSheet = new CSSStyleSheet();
  newStyleSheet.replaceSync(styleSheetContent);
  shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, newStyleSheet];
  return newStyleSheet;
};

const insertStyleElement = (shadowRoot: ShadowRoot, styleSheetContent: string) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = styleSheetContent;
  shadowRoot.appendChild(styleElement);
  return styleElement;
};

/**
 * a set of all bound stylesheets, being instantiated once per ShadowRootStateProvider.
 * this is to prevent the same stylesheet being added multiple times to the same ShadowRoot.
 * NOTE: since we have multiple 'apps' running (button, skip-links, widget etc.) and they share the same state (`boundStylesheets`),
 * we need to differentiate between them by saving sets per shadowRoot.
 */
export const boundStylesheets: Map<ShadowRoot, Map<string, CSSStyleSheet | HTMLStyleElement>> = new Map();

const ShadowRootStateContext = createContext<ShadowRootState>({
  shadowRoot: null,
});

export const ShadowRootStateProvider = ({
  shadowRoot,
  children,
}: {
  children: ComponentChildren;
  shadowRoot: ShadowRoot;
}): VNode => {
  if (!boundStylesheets.has(shadowRoot)) {
    boundStylesheets.set(shadowRoot, new Map());
  }

  return <ShadowRootStateContext.Provider value={{ shadowRoot }}>{children}</ShadowRootStateContext.Provider>;
};

/**
 * Hook for attaching a component's stylesheet to the adopted stylesheets of a root node within a parent container.
 * @param cssText - The content of the stylesheet.
 * @param cssVariables - An object holding dynamically added CSS variables.
 *
 * for backwards compatibility, we are checking if the browser supports the `adoptedStyleSheets` API and if not, we are using style injection.
 */
export function useStylesheet(cssText: string, cssVariables: Record<string, string | number> = {}): void {
  const { shadowRoot } = useContext(ShadowRootStateContext);
  if (!shadowRoot) {
    throw new Error("ShadowRoot is not initialized. Please call `setShadowRoot` before using this hook.");
  }
  useMemo(() => {
    // since useStylesheet is being called on each render, we only want to run this once per component
    const styleSheetContent = `:host {${Object.entries(cssVariables)
      .map(([key, value]) => `--${key}:${value};`)
      .join("")}}${cssText}`;

    let style: HTMLStyleElement | CSSStyleSheet;
    
    // if the stylesheet is already bound replace it's content
    if (boundStylesheets.get(shadowRoot).has(cssText)) {
      // we are checking against `cssText`, since the `styleSheetContent` might be different according to received props and can't be used as an identifier
      replaceStyleContent(styleSheetContent, boundStylesheets.get(shadowRoot).get(cssText));
      return;
    }

    if (isAdoptedStyleSheetsSupported) {
      style = insertAdoptedStyleSheet(shadowRoot, styleSheetContent);
    } else {
      style = insertStyleElement(shadowRoot, styleSheetContent);
    }
    boundStylesheets.get(shadowRoot).set(cssText, style);
  }, [cssText, cssVariables, shadowRoot]);
}
