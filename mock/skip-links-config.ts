import { SkipLinks, SkipLinksProps } from "~/components/skip-links";
import { SkipLinksAppProps } from "~/app";

const data: SkipLinksProps = {
  onPressed: (e) => {
    console.log(e);
  },
};

const skipLinksConfig: SkipLinksAppProps = {
  template: SkipLinks,
  data,
};

export default skipLinksConfig;
