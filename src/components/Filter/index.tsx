import { TouchableOpacityProps } from "react-native";

import { Container, FilterText, FilterStylesProps } from "./styles";

type FilterProps = TouchableOpacityProps &
  FilterStylesProps & {
    label: string;
  };

export function Filter({ label, isActive = false, ...restProps }: FilterProps) {
  return (
    <Container isActive={isActive} {...restProps}>
      <FilterText>{label}</FilterText>
    </Container>
  );
}
