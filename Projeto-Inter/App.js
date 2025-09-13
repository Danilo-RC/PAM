import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Formulario from './src/Pages/Formulario';
import Home from './src/Pages/Home';

const Pilha = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Formulario">
        <Pilha.Screen 
          name="Formulario" 
          component={Formulario} 
          options={{ headerShown: false }}
        />
        <Pilha.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}

