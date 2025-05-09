import React, { useRef } from 'react';
import MapView, {
  MapViewProps,
  PROVIDER_GOOGLE,
  LatLng,
  Marker,
  Polyline,
} from 'react-native-maps';
import { IconBox } from '../IconBox';
import { Car, FlagCheckered } from 'phosphor-react-native';
import theme from 'src/theme';

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinate = coordinates[coordinates.length - 1];
  const mapRef = useRef<MapView>(null);

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      onMapLoaded={onMapLoaded}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            strokeColor={theme.COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  );
}
