import Header from 'src/components/Header';
import { Container, Content } from './styles';
import LicensePlateInput from 'src/components/LicensePlateInput';

export function Departure() {
  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA1234" />
      </Content>
    </Container>
  );
}
