import Header from 'src/components/Header';
import { Container, Content } from './styles';
import LicensePlateInput from 'src/components/LicensePlateInput';
import TextAreaInput from 'src/components/TextAreaInput';
import { Button } from 'src/components/Button';

export function Departure() {
  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA1234" />
        <TextAreaInput
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
        />
        <Button title="Registrar Saída" />
      </Content>
    </Container>
  );
}
