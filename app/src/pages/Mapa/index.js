import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './style';

// Dados dos caixas eletrônicos
const caixasEletronicos = [
  {
    id: 1,
    latitude: -23.54643821441917,
    longitude: -46.408361718393664,
    titulo: 'Caixa24Horas - Dentro do Supermercado Rossi',
    descricao:
      'R. Carvalho de Araújo, 12 - Vila Cruzeiro, São Paulo - SP, 08412-020',
    imagem: 'https://imgur.com/vm6hBBr',
  },
  {
    id: 2,
    latitude: -23.554048020153225,
    longitude: -46.38377776034985,
    titulo: 'Caixa24Horas - Dentro da Padaria',
    descricao:
      'R. Fernando Sílvio Vaz de Carvalho, 149 - Jardim Julio de Carvalho, Ferraz de Vasconcelos - SP, 08534-420',
    imagem: 'https://imgur.com/b2e5b57',
  },
  {
    id: 3,
    latitude: -23.554581257945465,
    longitude: -46.38233463315734,
    titulo: 'Caixa24Horas - Dentro do Açougue',
    descricao:
      '1035 1053, Av. Gov. Jânio Quadros, 1023 - Parque Sao Francisco, Ferraz de Vasconcelos - SP, 08526-000',
    imagem: 'https://imgur.com/gLRuMHc',
  },
  {
    id: 4,
    latitude: -23.546224456666305,
    longitude: -46.3836267881735,
    titulo: 'Caixa24Horas - Dentro da Padaria e Confeitaria Mundy',
    descricao:
      'Esquina, R. Bernadete, 18 - Vila do Americano, Ferraz de Vasconcelos - SP, 08533-250',
    imagem: 'https://imgur.com/tJpPWDB',
  },
  {
    id: 5,
    latitude: -23.545118487518053,
    longitude: -46.40982892390208,
    titulo: 'Caixa - Banco Bradesco',
    descricao:
      'R. Otelo Augusto Ribeiro, 132 - Vila Minerva, São Paulo - SP, 08412-000',
    imagem: 'https://imgur.com/sTJ2Hkk',
  },
  {
    id: 6,
    latitude: -23.55337961417146,
    longitude: -46.40486366225741,
    titulo: 'Caixa - Dentro da Drogaria tieza',
    descricao:
      'Av. Miguel Achiole da Fonseca, 168 - Jardim São Paulo, São Paulo - SP, 08461-110',
    imagem: 'https://imgur.com/D5i4D8Y',
  },
  {
    id: 7,
    latitude: -23.553234750529203,
    longitude: -46.39416866002453,
    titulo: 'Caixa - Dentro da Ultrafarma Jardim Soares',
    descricao: 'Estr. de Poá, 2012 - Jardim Soares, São Paulo - SP, 08460-395',
    imagem: 'https://imgur.com/a8uzNU1',
  },
  {
    id: 8,
    latitude: -23.550727626399006,
    longitude: -46.41297305030259,
    titulo: 'Caixa24Horas - Dentro do Posto de Combustível',
    descricao:
      'R. Saturnino Pereira, 753 - Vila Santa Cruz (Zona Leste), São Paulo - SP, 08411-000',
    imagem: 'https://imgur.com/ytZPvyV',
  },
  {
    id: 9,
    latitude: -23.559121725218247,
    longitude: -46.40176962093834,
    titulo: 'Caixa24Horas - Dentro do Hortifruti Pomar Jm',
    descricao:
      'Av. Miguel Achiole da Fonseca, 1291 - Jardim São Paulo (Zona Leste), São Paulo - SP, 08461-110',
    imagem: 'https://imgur.com/MGnunXN',
  },
  {
    id: 10,
    latitude: -23.545474297199437,
    longitude: -46.380675409625546,
    titulo: 'Caixa24Horas - Dentro do Shibata Supermercados',
    descricao:
      'R. Gilda, 153 - Vila do Americano, Ferraz de Vasconcelos - SP, 08533-210',
    imagem: 'https://imgur.com/49ezvnf',
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Obtendo localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/*localização atual do usuário*/}
        <Marker
          coordinate={location.coords}
          title="Você está aqui"
          pinColor="blue"
        />

        {/*os marcadores dos caixas eletrônicos*/}
        {caixasEletronicos.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.titulo}
            description={point.descricao}
          />
        ))}
      </MapView>
    </View>
  );
}
