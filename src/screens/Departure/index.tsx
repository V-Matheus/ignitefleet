import Header from 'src/components/Header';
import { Container, Content } from './styles';
import { LicensePlateInput } from 'src/components/LicensePlateInput';
import { TextAreaInput } from 'src/components/TextAreaInput';
import { Button } from 'src/components/Button';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { licensePlateValidate } from 'src/utils/licensePlateValidate';

const KeyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert(
        'Placa inválida!',
        'A placa é inválida. Por favor, informe a placa correta do veículo.',
      );
    }

    if (description.trim().length === 0) {
      descriptionRef.current?.focus();
      return Alert.alert(
        'Finalidade',
        'Por favor, informe a finalidade do uso da utilização do veículo.',
      );
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={KeyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
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
              onChangeText={setDescription}
            />
            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
