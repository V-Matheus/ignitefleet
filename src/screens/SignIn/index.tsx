import { Container, Slogan, Title } from './styles';
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useApp, Realm } from '@realm/react';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const {data} = await GoogleSignin.signIn();

      if (data?.idToken) {
        const credentials = Realm.Credentials.jwt(data.idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar com a conta Google');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Entrar', 'Não foi possível conectar com a conta Google');
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com o Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
