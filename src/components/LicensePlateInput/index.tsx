import theme from 'src/theme';
import { Container, Input, Label } from './styles';
import { TextInput, TextInputProps } from 'react-native';
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label: string;
};

export const LicensePlateInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input ref={ref} {...rest} />
      </Container>
    );
  },
);
