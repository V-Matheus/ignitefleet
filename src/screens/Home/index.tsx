import React, { useEffect, useState } from 'react';
import { Container, Content } from './styles';
import { HomeHeader } from 'src/components/HomeHeader';
import { CarStatus } from 'src/components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';
import { Alert } from 'react-native';
import HistoricCard from 'src/components/HistoricCard';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() });
    }
    return navigate('departure');
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.',
      );
    }
  }

  function fetchHistoric() {
    const response = historic.filtered(
      'status = "arrival" SORT(created_at DESC)',
    );
    console.log(response);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => realm.removeListener('change', () => fetchVehicleInUse);
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <HistoricCard
          data={{ created: '20/04', licensePlate: 'XXX1234', isSync: true }}
        />
      </Content>
    </Container>
  );
}
