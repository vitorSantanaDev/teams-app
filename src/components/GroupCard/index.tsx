import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...restProps }: GroupCardProps) {
  return (
    <Container {...restProps}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
