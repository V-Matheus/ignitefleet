import { TextInputProps } from 'react-native';
import { Container, Input } from './styles';
import { Label } from '../LicensePlateInput/styles';
import theme from 'src/theme';

type Props = TextInputProps & {
  label: string;
};

export default function TextAreaInput({ label, ...rest }: Props) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
        placeholderTextColor={theme.COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </Container>
  );
}
