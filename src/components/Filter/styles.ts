import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterStylesProps = {
  isActive?: boolean;
};

export const Container = styled(TouchableOpacity)<FilterStylesProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `};

  width: 70px;
  height: 38px;
  border-radius: 4px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

export const FilterText = styled.Text`
  ${({ theme }) =>
    css`
      text-transform: uppercase;
      font-family: ${theme.FONT_FAMILY.BOLD};
      font-size: ${theme.FONT_SIZE.SM}px;
      color: ${theme.COLORS.WHITE};
    `};
`;
