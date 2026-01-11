import { Fragment, h, Ref, VNode } from "preact";
import { Button, ButtonProps } from "./components/button";
import { SkipLinks, SkipLinksProps } from "./components/skip-links";
import globalCss from "./styles/global.scss";
import { Widget, WidgetProps } from "./components/widget";
import {WidgetChat, WidgetChatProps} from "~/components/widget-chat";
import { WidgetSkeleton, WidgetSkeletonProps } from "./components/widget-skeleton";
import { ScreenReaderButton, ScreenReaderButtonProps } from "./components/screen-reader-button";
import { Tooltip, TooltipProps } from "./components/tooltip";
import { ReadingGuide, ReadingGuideProps } from "./components/reading-guide";
import { ReadingMask, ReadingMaskProps } from "./components/reading-mask";
import { useStylesheet, ShadowRootStateProvider } from "~/hooks/useStylesheet";
import { TextSimplifierMarker, TextSimplifierMarkerProps } from "./components/text-simplifier-marker";
import { TextSimplifier, TextSimplifierProps } from "./components/text-simplifier";
import { PopupDialog, PopupDialogProps } from "./components/popup-dialog";
import { ConsistentHelp, ConsistentHelpProps } from "./components/consistent-help";

type BaseAppProps<T, K> = {
  template: T;
  shadowRoot?: ShadowRoot;
  cssPosition?: "fixed" | "absolute" | "static";
  data: K & { ref?: Ref<HTMLElement> };
};
export type WidgetSkeletonAppProps = BaseAppProps<typeof WidgetSkeleton, WidgetSkeletonProps>;
export type WidgetAppProps = BaseAppProps<typeof Widget, WidgetProps>;
export type WidgetChatAppProps = BaseAppProps<typeof WidgetChat, WidgetChatProps>;
export type ButtonAppProps = BaseAppProps<typeof Button, ButtonProps>;
export type SkipLinksAppProps = BaseAppProps<typeof SkipLinks, SkipLinksProps>;
export type TooltipAppProps = BaseAppProps<typeof Tooltip, TooltipProps>;
export type PopupDialogAppProps = BaseAppProps<typeof PopupDialog, PopupDialogProps>;
export type ScreenReaderButtonAppProps = BaseAppProps<typeof ScreenReaderButton, ScreenReaderButtonProps>;
export type ReadingGuideAppProps = BaseAppProps<typeof ReadingGuide, ReadingGuideProps>;
export type ReadingMaskAppProps = BaseAppProps<typeof ReadingMask, ReadingMaskProps>;
export type TextSimplifierMarkerAppProps = BaseAppProps<typeof TextSimplifierMarker, TextSimplifierMarkerProps>;
export type SimplifiedTextAppProps = BaseAppProps<typeof TextSimplifier, TextSimplifierProps>;
export type ConsistentHelpAppProps = BaseAppProps<typeof ConsistentHelp, ConsistentHelpProps>;

export type AppProps =
  | SkipLinksAppProps
  | ButtonAppProps
  | ReadingGuideAppProps
  | ReadingMaskAppProps
  | WidgetAppProps
  | WidgetChatAppProps
  | WidgetSkeletonAppProps
  | ScreenReaderButtonAppProps
  | TooltipAppProps
  | PopupDialogAppProps
  | TextSimplifierMarkerAppProps
  | SimplifiedTextAppProps
  | ConsistentHelpAppProps;

/**
 * Wrapper - created in order to provide context for useStyleSheet
 */
export default function Wrapper(props: AppProps): VNode {
  return (
    <ShadowRootStateProvider shadowRoot={props.shadowRoot}>
      <App {...props} />
    </ShadowRootStateProvider>
  );
}
export function App(props: AppProps): VNode {
  const Template = props.template;
  /**
   * if cssPosition is provided, we append it to the global css so it'll override all: initial styles
   */
  useStylesheet(globalCss, { "css-position": props.cssPosition });
  return (
    <Fragment>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Template {...props.data} />
    </Fragment>
  );
}
