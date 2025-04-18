import React from 'react';
import { Container, Content } from './styles';
import { HomeHeader } from 'src/components/HomeHeader';
import { CarStatus } from 'src/components/CarStatus';

export function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
         <CarStatus />
       </Content>
    </Container>
  );
}
