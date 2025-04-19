import { useRoute } from '@react-navigation/native';
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles';
import Header from 'src/components/Header';
import { Button } from 'src/components/Button';
import ButtonIcon from 'src/components/ButtonIcon';
import { X } from 'phosphor-react-native';

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>XXX000</LicensePlate>
        <Label>Finalidade</Label>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
          ipsum ea expedita veniam recusandae id voluptatibus, commodi,
          laboriosam fugiat placeat incidunt doloribus hic alias est non numquam
          aliquid repudiandae nihil?
        </Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
