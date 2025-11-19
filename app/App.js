import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { View, Text, StyleSheet } from 'react-native';

import LoginScreen from './src/pages/Login';
import CadastroScreen from './src/pages/Cadastro';
import HomeScreen from './src/pages/Home';
import PerfilScreen from './src/pages/Perfil';
import MapaScreen from './src/pages/Mapa'; // Importa a nova tela de Mapa

// Definição do Tab Navigator
const Tab = createBottomTabNavigator();

// Componente para o ícone da TabBar com o estilo de contorno circular
const TabBarIcon = ({ name, color, focused }) => {
  const iconStyle = focused ? styles.focusedIcon : styles.icon;
  return (
    <View style={iconStyle}>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
};

// Componente para a navegação principal (Home, Perfil, Mapa)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF7A00', // Cor laranja do Inter
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabel: ({ focused, color }) => {
          const label = route.name;
          return <Text style={{ color: color, fontSize: 12 }}>{label}</Text>;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <TabBarIcon name={iconName} color={color} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// Estilos para o ícone focado
const styles = StyleSheet.create({
  focusedIcon: {
    backgroundColor: 'rgba(255, 122, 0, 0.2)', // Laranja com transparência para o contorno
    borderRadius: 30,
    padding: 5,
  },
  icon: {
    padding: 5,
  },
});

// Definição do Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        {/* A tela Home agora é o MainTabs, que contém Home, Perfil e Mapa */}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
