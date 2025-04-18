import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name } from './styles';
import { Power } from 'phosphor-react-native';
import theme from 'src/theme';

export function HomeHeader() {
  return (
    <Container>
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
