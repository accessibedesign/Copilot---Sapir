import { PopupDialogAppProps } from "~/app";
import { PopupDialog, PopupDialogProps } from "src/components/popup-dialog";
import { text_simplifier_popup_dialog } from "~/external-assets/icons";

const data: PopupDialogProps = {
  visible: true,
  refAnchorRect: new DOMRect(0, 0, 100, 100),
  content: {
    text: "Simplify Text",
    icon: text_simplifier_popup_dialog,
  },
  onEvent: () => console.log("Event triggered")
};

const popupDialogConfig: PopupDialogAppProps = {
  template: PopupDialog,
  data,
};

export default popupDialogConfig;
