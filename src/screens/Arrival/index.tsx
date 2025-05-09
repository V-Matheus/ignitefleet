import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AsyncMessage,
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
import { useEffect, useState } from 'react';
import { getLastAsyncTimestamp } from 'src/libs/asyncStorage/syncStorage';
import { stopLocationTask } from 'src/tasks/backgroundLocationTask';
import { getStorageLocation } from 'src/libs/asyncStorage/locationStorage';
import { LatLng } from 'react-native-maps';
import { Map } from 'src/components/Map';

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coodinates, setCoordinates] = useState<LatLng[]>([]);

  const route = useRoute();
  const { id } = route.params as RouteParamsProps;
  const { goBack } = useNavigation();

  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ]);
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();

    goBack();
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        );
      }

      const locations = await getStorageLocation();

      realm.write(() => {
        if (historic) {
          historic.status = 'arrival';
          historic.update_at = new Date();
          historic.coords.push(...locations)
        }
      });

      await stopLocationTask();

      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo.');
    }
  }

  async function getLocationInfo() {
    if (!historic) return;

    const lastSync = await getLastAsyncTimestamp();
    const updatedAt = historic!.update_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    const locationStorage = await getStorageLocation();
    setCoordinates(locationStorage);
  }

  useEffect(() => {
    getLocationInfo();
  }, [historic]);

  return (
    <Container>
      <Header title={title} />

      {coodinates.length > 0 && <Map coordinates={coodinates} />}

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da{' '}
          {historic?.status === 'departure' ? ' partida' : 'chegada'} pendente.
        </AsyncMessage>
      )}
    </Container>
  );
}
