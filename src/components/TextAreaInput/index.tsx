import { TextInput, TextInputProps } from 'react-native';
import { Container, Input } from './styles';
import { Label } from '../LicensePlateInput/styles';
import theme from 'src/theme';
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label: string;
};

export const TextAreaInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input ref={ref} {...rest} />
      </Container>
    );
  },
);
