import { Component, h, render } from "preact";
import App, { AppProps } from "./app";
import useTranslationHook from "./hooks/useTranslation";
import { SupportedLanguageCode } from "~/types";

export * from "./components/button";
export * from "./components/skip-links";
export * from "./components/screen-reader-button";
export * from "./components/widget";
export * from "./components/widget-chat";
export * from "./components/widget-skeleton";
export * from "./components/tooltip";
export * from "./components/reading-guide";
export * from "./components/reading-mask";
export * from "./components/text-simplifier-marker";
export * from "./components/text-simplifier";
export * from "./components/popup-dialog";
export * from "./components/consistent-help";

export {
  cursor_large_black,
  cursor_large_white,
  pointer_large_black,
  pointer_large_white,
  text_simplifier_popup_dialog,
} from "./external-assets/icons";
export { SupportedLanguageCode, SupportedFlagCode, Breakpoint } from "~/types";

/**
 * @class
 * @classdesc An entry point to the package when consumed as an module
 * Manages active instances and dictionary updates as well as enriching
 * the Preact<Component>
 * @see castToShadowComponent
 */
export default class AccessWidgetUiModule {
  static readonly RefTagName = "access-widget-ui";

  /**
   * List of active/attached instances
   */
  static instances: Set<ShadowComponent> = new Set();

  /**
   * Instantiate and Mounts given component `template` to given `container`
   *
   * @param template A constructor for preact component
   * @param data The props to be sent to the component
   * @param cssPosition The position of the component; `fixed` or `absolute` - exists to prevent widget-ui elements from affecting webos layouts that rely on order of elements (grid, flex).
   * @param container The container to append the component to
   * @param options Possible options
   * @param prepend whether to prepend the component to the top of the `container`
   */
  static async run(
    { template, data, cssPosition }: AppProps,
    container: ShadowRoot | HTMLElement,
    options: { prepend?: boolean } = {},
  ): Promise<ShadowComponent> {
    const appRoot = document.createElement(this.RefTagName);

    appRoot.attachShadow({ mode: "open" });

    container[options.prepend ? "prepend" : "append"](appRoot);

    let instance: ShadowComponent;

    data.ref = (c) => {
      instance = c as unknown as ShadowComponent;
    };

    render(h(App, { template, data, shadowRoot: appRoot.shadowRoot, cssPosition } as AppProps), appRoot.shadowRoot);

    this.castToShadowComponent(appRoot, instance);

    AccessWidgetUiModule.instances.add(instance);

    return instance;
  }

  /**
   * Extends Preact Component type with functionality required for using projects
   * Adds the following methods
   * `update` - method to update the component props and trigger `forceUpdate`
   * `detach` - method for removing the components host from the DOM/its parent
   * `ref` - reference to the first element in the component
   * @param appRoot
   * @param instance
   */
  static castToShadowComponent(appRoot: HTMLElement, instance: ShadowComponent): void {
    instance.ref = appRoot.shadowRoot.querySelector(":not(style)");

    instance.ref.setAttribute("part", "container");

    instance.host = appRoot;

    instance.update = async function (props) {
      for (const [key, value] of Object.entries(props)) {
        instance.props[key] = value;
      }

      instance.forceUpdate();

      return new Promise((resolve) => requestAnimationFrame(() => resolve()));
    };

    instance.detach = async function () {
      const instances = AccessWidgetUiModule.instances;

      if (instances.has(instance)) {
        appRoot.parentElement.removeChild(appRoot);

        instances.delete(instance);
      }
    };
  }

  /**
   * Determines whether given `element` is a component generated using this library
   */
  static isOwnComponentRef(element: HTMLElement): boolean {
    return element.localName === this.RefTagName;
  }

  /**
   * Sets given `dictionary` to the context of the `useTranslation` hook that serves the application
   * and updates all instances
   */
  static async setDictionary(
    dictionary: Record<string, string>,
    languageCode: SupportedLanguageCode = SupportedLanguageCode.EN,
  ): Promise<void> {
    useTranslationHook.setDictionary(dictionary, languageCode);

    for (const instance of AccessWidgetUiModule.instances.values()) {
      instance.forceUpdate();
    }

    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}

type ShadowComponent = Component & {
  update: <T>(props: T) => Promise<void>;
  detach: () => Promise<void>;
  ref: HTMLElement;
  host: HTMLElement;
};

export { AppProps, ShadowComponent };
