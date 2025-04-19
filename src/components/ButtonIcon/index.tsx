import { IconProps } from 'phosphor-react-native';
import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';
import theme from 'src/theme';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxProps;
};

export default function ButtonIcon({ icon: Icon, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={theme.COLORS.BRAND_MID} />
    </Container>
  );
}
