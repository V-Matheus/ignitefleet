import React from 'react';
import { Container, Content } from './styles';
import { HomeHeader } from 'src/components/HomeHeader';
import { CarStatus } from 'src/components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';


export function Home() {
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate('departure');
  }

  function fetchVehicle() {
    historic
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}
