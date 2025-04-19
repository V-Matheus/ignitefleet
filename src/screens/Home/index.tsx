import React, { useEffect, useState } from 'react';
import { Container, Content } from './styles';
import { HomeHeader } from 'src/components/HomeHeader';
import { CarStatus } from 'src/components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';
import { Alert } from 'react-native';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate('departure');
  }

  function fetchVehicle() {
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

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
