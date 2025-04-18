import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { Power } from 'phosphor-react-native';
import theme from 'src/theme';
import { Image } from 'expo-image';

export function HomeHeader() {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/V-Matheus.png' }}
        placeholder="L184i9kCblof00ayjZay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>Matheus</Name>
      </Greeting>

      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
