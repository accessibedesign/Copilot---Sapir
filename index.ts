import { h, render } from "preact";
import App, { AppProps } from "./app";
import widgetConfig from "./mock/widget-config";
export { AppProps };

const container = document.body;

const appRoot = document.createElement(`div`);

appRoot.attachShadow({ mode: "open" });

container.appendChild(appRoot);

render(
  h(App, {
    ...widgetConfig,
    shadowRoot: appRoot.shadowRoot,
  }),
  appRoot.shadowRoot
);
