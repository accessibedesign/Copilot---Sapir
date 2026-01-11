import { Color } from "~/components/widget/components/actions/components/color-picker";
import {WidgetChatAppProps} from "~/app";
import { ActionBoxName, BoxElementName, ProfileType, AIToolType } from "~/components/widget/components/actions/types";
import {WidgetChat, WidgetChatProps} from "~/components/widget-chat";

export const data: WidgetChatProps = {
  loading: false,
  onEvent: (data) => {
    console.log(data);
  },
  /**
   * commented options are left for future reference
   */
  // options: {
  //   accessibilityStatement: {
  //     hide: true,
  //   },
  //   search: {
  //     hide: true,
  //   },
  //   profilesSection: {
  //     hide: true,
  //   },
  //   adjustments: {
  //     [BoxElementName.readableFont]: {
  //       hide: true,
  //     },
  //   },
  // },
  hasTransition: true,
  visible: true,
  leadColor: "#146ff8",
  state: {
    aiTools: {
      [AIToolType.TEXT_SIMPLIFIER]: "disabled",
    },
    profiles: {
      [ProfileType.SEIZURES]: true,
      [ProfileType.ADHD]: true,
      [ProfileType.MOTOR]: true,
    },
    actions: {
      [ActionBoxName.textAdjustments]: {
        [BoxElementName.readableFont]: true,
        [BoxElementName.emphasizeLinks]: true,
        [BoxElementName.zoom]: 0,
      },
      [ActionBoxName.colorAdjustments]: {
        [BoxElementName.textColor]: Color.Black,
      },
      [ActionBoxName.orientationAdjustments]: {
        [BoxElementName.usefulLinks]: [
          [
            {
              value: "homepage",
              text: "HOMEPAGE",
            },
            {
              value: "top",
              text: "HEADER",
            },
            {
              value: "bottom",
              text: "FOOTER",
            },
            {
              value: "content",
              text: "NAVIGATOR_MAIN_CONTENT",
            },
          ],
          [
            {
              value: "bottom",
              text: "FOOTER",
            },
          ],
        ],
      },
    },
  },
  footerContent: "",
};

const widgetChatConfig: WidgetChatAppProps = {
  template: WidgetChat,
  data,
};

export default widgetChatConfig;
