import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import estilos from './styles';

export default function Formulario({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');

  const validar = () => {
    if (!email || !senha || !cpf || !idade) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    navigation.replace('Home');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.logo}>Banco Inter</Text>

      <TextInput
        placeholder="E-mail"
        style={estilos.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={estilos.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="CPF"
        style={estilos.input}
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        placeholder="Idade"
        style={estilos.input}
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <TouchableOpacity style={estilos.botao} 
      onPress={validar}>
        <Text style={estilos.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
