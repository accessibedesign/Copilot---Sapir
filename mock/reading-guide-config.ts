import { ReadingGuideAppProps } from "~/app";
import { ReadingGuide, ReadingGuideProps } from "~/components/reading-guide";

const data: ReadingGuideProps = {
  left: "350px",
  top: "50px",
};

const config: ReadingGuideAppProps = {
  template: ReadingGuide,
  data,
};

export default config;
