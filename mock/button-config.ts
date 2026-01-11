import {ButtonAppProps} from "~/app";
import {
  Button,
  ButtonIcon,
  ButtonPositionXType,
  ButtonPositionYType,
  ButtonProps,
  ButtonSizeType
} from "~/index.module";

const data: ButtonProps = {
  visible: true,
  active: false,
  color: "red",
  positionY: ButtonPositionYType.Bottom,
  positionX: ButtonPositionXType.Right,
  size: ButtonSizeType.Medium,
  radius: "50%",
  icon: ButtonIcon.people,
  offsetLeft: 20,
  offsetTop: 20,
  onInteraction: (e) => {
    console.log(e);
  },
};

const buttonConfig: ButtonAppProps = {
  template: Button,
  data,
};

export default buttonConfig;
