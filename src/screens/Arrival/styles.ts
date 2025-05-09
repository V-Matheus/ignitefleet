import theme from 'src/theme';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`;

export const Label = styled.Text`
  color: ${theme.COLORS.GRAY_300};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  margin-top: 32px;
  margin-bottom: 5px;
`;

export const LicensePlate = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.XXXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const Description = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: justify;
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  margin-top: 32px;
`;

export const AsyncMessage = styled.Text`
  color: ${theme.COLORS.GRAY_300};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: center;
  flex: 1;
  margin: 32px;
`;
