import { useNavigation, useRoute } from '@react-navigation/native';
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
import { useObject, useRealm } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';
import { BSON } from 'realm';
import { Alert } from 'react-native';

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;
  const { goBack } = useNavigation();

  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ]);
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        {historic?.isValid() ? (
          <>
            <Label>Placa do veículo</Label>
            <LicensePlate>{historic?.license_plate}</LicensePlate>
            <Label>Finalidade</Label>
            <Description>{historic?.description}</Description>
          </>
        ) : (
          <Label>O registro foi removido.</Label>
        )}

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
