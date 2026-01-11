import { RenderOptions, RenderResult, render as originalRender } from "@testing-library/preact";
import { VNode, ComponentChildren, h } from "preact";
import { ShadowRootStateProvider, boundStylesheets } from "../hooks/useStylesheet/index";
import { defaultData as defaultLanguageState, LanguageStateProvider } from "~/components/widget/context/language-state";
import { ModalContext } from "~/context/modal-context";
import { WidgetEventEmitter } from "~/components/widget/context/event-emitter";

/**
 * TODO: for some reason, having this file inside 'tests' folder and importing it from there, is causing the build to pass but not generate typings for all files.
 * need to find a solution for this, in the meantime, it's in `src/utils` since it works as expected here.
 */
export function render(vnode: VNode, options?: RenderOptions): RenderResult {
  const shadowRoot = document as unknown as ShadowRoot;
  document.adoptedStyleSheets = [];
  boundStylesheets.set(shadowRoot, new Map()); // reset the bounded stylesheets for each test, otherwise tests will fail because the stylesheet will already be bounded to the shadowRoot

  return originalRender(<ShadowRootStateProvider shadowRoot={shadowRoot}>{vnode}</ShadowRootStateProvider>, options);
}

export const buildProvidedComponent = (
  children: ComponentChildren,
  { onEvent, toggle }: { onEvent?: () => void; toggle?: () => void }
) => {
  return render(
    <LanguageStateProvider value={defaultLanguageState}>
      <WidgetEventEmitter.Provider value={onEvent}>
        <ModalContext.Provider
          value={{
            toggle,
            isOpen: false,
            content: children,
          }}
        >
          {children}
        </ModalContext.Provider>
      </WidgetEventEmitter.Provider>
    </LanguageStateProvider>
  );
};
