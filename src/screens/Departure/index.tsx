import Header from 'src/components/Header';
import { Container, Content, Message, MessageContent } from './styles';
import { LicensePlateInput } from 'src/components/LicensePlateInput';
import { TextAreaInput } from 'src/components/TextAreaInput';
import { Button } from 'src/components/Button';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { licensePlateValidate } from 'src/utils/licensePlateValidate';
import { useRealm } from 'src/libs/realm';
import { Historic } from 'src/libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
  useForegroundPermissions,
  watchPositionAsync,
} from 'expo-location';
import { getAddressLocation } from 'src/utils/getAddressLocation';
import Loading from 'src/components/Loading';
import { LocationInfo } from 'src/components/LocationInfo';
import { Car } from 'phosphor-react-native';
import { Map } from 'src/components/Map';
import { startLocationTask } from 'src/tasks/backgroundLocationTask';
import { openSettings } from 'src/utils/openSettings';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoods, setCurrentCoods] = useState<LocationObjectCoords | null>(
    null,
  );

  const [locationForeGroundPermission, requestLocationForeGroundPermission] =
    useForegroundPermissions();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const { goBack } = useNavigation();

  const realm = useRealm();
  const user = useUser();

  async function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          'Placa inválida!',
          'A placa é inválida. Por favor, informe a placa correta do veículo.',
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade do uso da utilização do veículo.',
        );
      }

      if (!currentCoods?.longitude && !currentCoods?.latitude) {
        return Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual do veículo.',
        );
      }

      setIsRegistering(true);

      const backgroundPermissions = await requestBackgroundPermissionsAsync();

      if (!backgroundPermissions.granted) {
        setIsRegistering(false);

        return Alert.alert(
          'Localização',
          'Permita o acesso a localização em segundo plano para registrar a saída do veículo.',
        );
      }

      await startLocationTask();

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
            coords: [
              {
                latitude: currentCoods.latitude,
                longitude: currentCoods.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          }),
        );
      });

      Alert.alert('Saída', 'Saída registrada com sucesso!');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não  foi possível registrar a saída do veículo.');
      setIsRegistering(false);
    }
  }

  useEffect(() => {
    requestLocationForeGroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForeGroundPermission?.granted) return;

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoods(location.coords);

        getAddressLocation(location.coords)
          .then((address) => {
            if (address) setCurrentAddress(address);
          })
          .finally(() => setIsLoadingLocation(false));
      },
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) subscription.remove();
    };
  }, [locationForeGroundPermission]);

  if (!locationForeGroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <MessageContent>
          <Message>
            Você precisa permitir que o aplicativo tenha acesso a localização
            para utilizar essa funcionalidade. Por favor, acesse as
            configurações do seu dispositivo e permita o acesso a localização.
          </Message>
        </MessageContent>

        <Button title="Abrir Configurações" onPress={openSettings} />
      </Container>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCoods && <Map coordinates={[currentCoods]} />}
          <Content>
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label="Localização Atual"
                description={currentAddress}
              />
            )}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={() => {
                descriptionRef.current?.blur();
                handleDepartureRegister();
              }}
              returnKeyLabel="send"
              onChangeText={setDescription}
            />
            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
