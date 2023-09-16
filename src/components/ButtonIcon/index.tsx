import { TouchableOpacityProps } from "react-native";

import { ButtonIconStylesTypes, Container, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStylesTypes;
};

export function ButtonIcon({
  icon,
  type = "PRIMARY",
  ...restProps
}: ButtonIconProps) {
  return (
    <Container {...restProps}>
      <Icon type={type} name={icon} />
    </Container>
  );
}
