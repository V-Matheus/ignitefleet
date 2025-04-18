import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { Power } from 'phosphor-react-native';
import theme from 'src/theme';
import { useUser, useApp } from '@realm/react';

export function HomeHeader() {
  const user = useUser();
  const app = useApp();

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container>
      <Picture
        source={{ uri: user.profile.pictureUrl }}
        placeholder="L184i9kCblof00ayjZay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user.profile.name}</Name>
      </Greeting>

      <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
