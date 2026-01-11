import * as icons from ".";
import { VNode, h } from "preact";
import BaseIcon from "~/components/base-icon";
export default {
  title: "Example/ExternalIcons",
};

export const Default = (): VNode => {
  return (
    <div style="display: flex; flex-flow: column; gap: 5rem;">
      {Object.keys(icons).map((icon) => (
        <div key={icon} style="display: flex; flex-flow: column;  align-items:center;">
          <BaseIcon>{icons[icon]}</BaseIcon>
          <span>{icon}</span>
        </div>
      ))}
    </div>
  );
};
