import { Image } from 'expo-image';
import theme from 'src/theme';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_700};
`;

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Message = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const Name = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.LG}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const Picture = styled(Image).attrs((props) => ({
  ...props,
}))`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`;
