import React from 'react';
import { Container, Content } from './styles';
import { HomeHeader } from 'src/components/HomeHeader';
import { CarStatus } from 'src/components/CarStatus';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMovement() {
    navigate('departure');
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
