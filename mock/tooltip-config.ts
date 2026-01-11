import { TooltipAppProps } from "~/app";
import { Tooltip, TooltipProps } from "~/components/tooltip";

const data: TooltipProps = {
  visible: true,
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  position: {
    x: 10,
    y: 10,
  },

  text: "123",
  fontSize: 32,
};

const tooltipConfig: TooltipAppProps = {
  template: Tooltip,
  data,
};

export default tooltipConfig;
