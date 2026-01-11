import { ReadingMaskAppProps } from "~/app";
import { ReadingMask, ReadingMaskProps } from "~/components/reading-mask";

const config: ReadingMaskAppProps = {
  template: ReadingMask,
  data: {
    visible: true,
    top: "150px",
  } as ReadingMaskProps,
};

export default config;
