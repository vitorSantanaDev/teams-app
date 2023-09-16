import { TouchableOpacityProps } from "react-native";

import { Container, ButtonText, ButtonStylesType } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  type?: ButtonStylesType;
};

export function Button({ label, type = "PRIMARY", ...restProps }: ButtonProps) {
  return (
    <Container type={type} {...restProps}>
      <ButtonText>{label}</ButtonText>
    </Container>
  );
}
