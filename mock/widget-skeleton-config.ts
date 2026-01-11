import { WidgetSkeletonAppProps } from "~/app";
import { WidgetSkeleton, WidgetSkeletonPosition, WidgetSkeletonProps } from "~/components/widget-skeleton";

export const data: WidgetSkeletonProps = {
  visible: true,
  position: WidgetSkeletonPosition.LEFT,
  leadColor: "#146ff8",
};

const widgetSkeletonConfig: WidgetSkeletonAppProps = {
  template: WidgetSkeleton,
  data,
};

export default widgetSkeletonConfig;
