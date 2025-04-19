import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Arrival } from 'src/screens/Arrival';
import { Departure } from 'src/screens/Departure';
import { Home } from 'src/screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="departure" component={Departure} />
      <Screen name="arrival" component={Arrival} />
    </Navigator>
  );
}
