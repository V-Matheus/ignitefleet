import theme from 'src/theme';
import { Container, Input, Label } from './styles';
import { TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string;
};

export default function LicensePlateInput({ label, ...rest }: Props) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={theme.COLORS.GRAY_400}
        {...rest} 
      />
    </Container>
  );
}
