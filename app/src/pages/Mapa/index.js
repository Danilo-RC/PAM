import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './style';
import { atms, initialRegion } from '../../data/atms'; // Importa os dados simulados

// Componente de Pin personalizado
const CustomMarker = ({ id }) => (
  <View style={styles.markerPin}>
    <Text style={styles.markerText}>{id}</Text>
  </View>
);

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        Alert.alert(
          'Permissão Negada',
          'O aplicativo precisa de permissão de localização para mostrar o mapa.',
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Centraliza o mapa na localização atual do usuário
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {atms.map(atm => (
            <Marker
              key={atm.id}
              coordinate={{ latitude: atm.latitude, longitude: atm.longitude }}
            >
              <CustomMarker id={atm.id} />
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{atm.nome}</Text>
                  <Text style={styles.calloutDescription}>{atm.descricao}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={setRegion}
      >
        {atms.map(atm => (
          <Marker
            key={atm.id}
            coordinate={{ latitude: atm.latitude, longitude: atm.longitude }}
          >
            <CustomMarker id={atm.id} />
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{atm.nome}</Text>
                <Text style={styles.calloutDescription}>{atm.descricao}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
