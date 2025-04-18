import styled, { css } from 'styled-components/native';
import theme from 'src/theme';

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin-top: 32px;
  padding: 22px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_700};
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_600};
`;

export const Message = styled.Text`
  flex: 1;
  text-align: justify;
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const TextHighlight = styled.Text`
  color: ${theme.COLORS.BRAND_LIGHT};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;
