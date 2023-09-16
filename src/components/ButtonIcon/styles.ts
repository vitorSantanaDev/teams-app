import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export type ButtonIconStylesTypes = "PRIMARY" | "SECONDARY";

type ButtonIconStylesProps = {
  type: ButtonIconStylesTypes;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconStylesProps>(
  ({ theme, type }) => ({
    size: 24,
    color: type === "SECONDARY" ? theme.COLORS.RED : theme.COLORS.GREEN_700,
  })
)``;
