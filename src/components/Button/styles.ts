import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonStylesType = "PRIMARY" | "SECONDARY";
type ButtonStylesProps = { type: ButtonStylesType };

export const Container = styled(TouchableOpacity)<ButtonStylesProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;
