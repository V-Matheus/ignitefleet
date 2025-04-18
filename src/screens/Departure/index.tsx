import Header from 'src/components/Header';
import { Container, Content } from './styles';
import LicensePlateInput from 'src/components/LicensePlateInput';
import { TextAreaInput } from 'src/components/TextAreaInput';
import { Button } from 'src/components/Button';
import { useRef } from 'react';
import { TextInput } from 'react-native';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log('ok');
  }

  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />
        <TextAreaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={() => {
            descriptionRef.current?.blur();
            handleDepartureRegister();
          }}
          returnKeyLabel="send"
        />
        <Button title="Registrar Saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  );
}
