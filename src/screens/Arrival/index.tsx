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
import { useObject } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';
import { BSON } from 'realm';

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id));

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
