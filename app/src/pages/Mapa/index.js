import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone personalizado
import { styles } from './style';

// Dados dos caixas eletrônicos (da branch mesclada)
const caixasEletronicos = [
  {
    id: 1,
    latitude: -23.54643821441917,
    longitude: -46.408361718393664,
    titulo: 'Caixa24Horas - Dentro do Supermercado Rossi',
    endereco:
      'R. Carvalho de Araújo, 12 - Vila Cruzeiro, São Paulo - SP, 08412-020',
    descricao: 'Caixa 24h, acesso fácil, próximo à estação de metrô.',
    imagem: 'https://imgur.com/vm6hBBr',
  },
  {
    id: 2,
    latitude: -23.554048020153225,
    longitude: -46.38377776034985,
    titulo: 'Caixa24Horas - Dentro da Padaria',
    endereco:
      'R. Fernando Sílvio Vaz de Carvalho, 149 - Jardim Julio de Carvalho, Ferraz de Vasconcelos - SP, 08534-420',
    descricao: 'Localizado no 1º piso, ao lado da praça de alimentação.',
    imagem: 'https://imgur.com/b2e5b57',
  },
  {
    id: 3,
    latitude: -23.554581257945465,
    longitude: -46.38233463315734,
    titulo: 'Caixa24Horas - Dentro do Açougue',
    endereco:
      '1035 1053, Av. Gov. Jânio Quadros, 1023 - Parque Sao Francisco, Ferraz de Vasconcelos - SP, 08526-000',
    descricao: 'Aberto das 8h às 20h, dentro da agência parceira.',
    imagem: 'https://imgur.com/gLRuMHc',
  },
  {
    id: 4,
    latitude: -23.546224456666305,
    longitude: -46.3836267881735,
    titulo: 'Caixa24Horas - Dentro da Padaria e Confeitaria Mundy',
    endereco:
      'Esquina, R. Bernadete, 18 - Vila do Americano, Ferraz de Vasconcelos - SP, 08533-250',
    descricao: 'Caixa rápido, ideal para saques e depósitos.',
    imagem: 'https://imgur.com/tJpPWDB',
  },
  {
    id: 5,
    latitude: -23.545118487518053,
    longitude: -46.40982892390208,
    titulo: 'Caixa - Banco Bradesco',
    endereco:
      'R. Otelo Augusto Ribeiro, 132 - Vila Minerva, São Paulo - SP, 08412-000',
    descricao: 'Próximo ao Teatro Municipal, alta segurança.',
    imagem: 'https://imgur.com/sTJ2Hkk',
  },
  {
    id: 6,
    latitude: -23.55337961417146,
    longitude: -46.40486366225741,
    titulo: 'Caixa - Dentro da Drogaria tieza',
    endereco:
      'Av. Miguel Achiole da Fonseca, 168 - Jardim São Paulo, São Paulo - SP, 08461-110',
    descricao: 'Disponível 24h, em posto de serviço.',
    imagem: 'https://imgur.com/D5i4D8Y',
  },
  {
    id: 7,
    latitude: -23.553234750529203,
    longitude: -46.39416866002453,
    titulo: 'Caixa - Dentro da Ultrafarma Jardim Soares',
    endereco: 'Estr. de Poá, 2012 - Jardim Soares, São Paulo - SP, 08460-395',
    descricao: 'Localizado em área comercial movimentada.',
    imagem: 'https://imgur.com/a8uzNU1',
  },
  {
    id: 8,
    latitude: -23.550727626399006,
    longitude: -46.41297305030259,
    titulo: 'Caixa24Horas - Dentro do Posto de Combustível',
    endereco:
      'R. Saturnino Pereira, 753 - Vila Santa Cruz (Zona Leste), São Paulo - SP, 08411-000',
    descricao: 'Fácil acesso pela Av. Cruzeiro do Sul.',
    imagem: 'https://imgur.com/ytZPvyV',
  },
  {
    id: 9,
    latitude: -23.559121725218247,
    longitude: -46.40176962093834,
    titulo: 'Caixa24Horas - Dentro do Hortifruti Pomar Jm',
    endereco:
      'Av. Miguel Achiole da Fonseca, 1291 - Jardim São Paulo (Zona Leste), São Paulo - SP, 08461-110',
    descricao: 'Dentro de um supermercado, horário estendido.',
    imagem: 'https://imgur.com/MGnunXN',
  },
  {
    id: 10,
    latitude: -23.545474297199437,
    longitude: -46.380675409625546,
    titulo: 'Caixa24Horas - Dentro do Shibata Supermercados',
    endereco:
      'R. Gilda, 153 - Vila do Americano, Ferraz de Vasconcelos - SP, 08533-210',
    descricao: 'Próximo à estação de trem, ponto de referência.',
    imagem: 'https://imgur.com/49ezvnf',
  },
];

// Coordenada inicial (aproximadamente o centro dos caixas)
const initialRegion = {
  latitude: -23.55052,
  longitude: -46.395,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Componente de Pin personalizado (Ícone do Banco Inter)
const CustomMarker = () => (
  <View style={styles.markerPin}>
    <Ionicons name="cash-outline" size={20} color="#fff" />
  </View>
);

// Componente para o Card de Detalhes (Modal/Bottom Sheet)
const DetailsCard = ({ point, onClose }) => {
  if (!point) return null;

  return (
    <View style={styles.detailsCardContainer}>
      <View style={styles.detailsCardHeader}>
        <Text style={styles.detailsCardTitle}>{point.titulo}</Text>
        <Ionicons
          name="close-circle"
          size={30}
          color="#fff"
          onPress={onClose}
        />
      </View>
      <View style={styles.detailsCardBody}>
        <Text style={styles.detailsCardText}>
          <Text style={styles.detailsCardLabel}>Endereço:</Text>{' '}
          {point.endereco}
        </Text>
        <Text style={styles.detailsCardText}>
          <Text style={styles.detailsCardLabel}>Detalhes:</Text>{' '}
          {point.descricao}
        </Text>
        {/* Adicionar mais informações se existirem nos dados */}
      </View>
    </View>
  );
};

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(initialRegion);
  const [selectedPoint, setSelectedPoint] = useState(null); // Ponto selecionado para o card

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
          {caixasEletronicos.map(point => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              onPress={() => setSelectedPoint(point)}
            >
              <CustomMarker />
            </Marker>
          ))}
        </MapView>
        <DetailsCard
          point={selectedPoint}
          onClose={() => setSelectedPoint(null)}
        />
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
        {caixasEletronicos.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            onPress={() => setSelectedPoint(point)}
          >
            <CustomMarker />
          </Marker>
        ))}
      </MapView>
      <DetailsCard
        point={selectedPoint}
        onClose={() => setSelectedPoint(null)}
      />
    </View>
  );
}
