import React, { useState, useEffect } from 'react'; // Adicione useEffect aqui
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';
import styles from './style';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [currentApiUrl, setCurrentApiUrl] = useState('');

  const loadApiUrl = async () => {
    const savedUrl = await AsyncStorage.getItem('url_api');
    if (savedUrl) {
      setApiUrl(savedUrl);
      setCurrentApiUrl(savedUrl);
    }
  };

  // Agora useEffect está importado e funcionará corretamente
  useEffect(() => {
    loadApiUrl();
  }, []);

  // ... resto do código permanece igual
  const handleSaveApiUrl = async () => {
    if (!apiUrl) {
      Alert.alert('Erro', 'O campo da URL não pode estar vazio.');
      return;
    }

    let normalizedUrl = apiUrl.trim();
    if (normalizedUrl.endsWith('/')) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    await AsyncStorage.setItem('url_api', normalizedUrl);
    setCurrentApiUrl(normalizedUrl);
    setModalVisible(false);
    Alert.alert(
      'Sucesso',
      'URL da API salva com sucesso! Reinicie o app para garantir que todas as requisições usem a nova URL.',
    );
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/login', {
        email: email,
        password: senha,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('userToken', response.data.token);

        Alert.alert('Sucesso', 'Login realizado com sucesso!');

        navigation.replace('Main', {
          user: response.data.user,
        });
      }
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error);

      let errorMessage = 'Erro no login. Tente novamente.';

      if (error.response?.status === 401) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de Engrenagem para Configuração da API */}
      <Pressable
        style={styles.configButton}
        onPress={() => setModalVisible(true)}
        disabled={loading}
      >
        <Ionicons name="settings-outline" size={24} color="#FF7A00" />
      </Pressable>

      {/* Modal de Configuração da API */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Configuração da API</Text>
            <Text style={styles.modalSubtitle}>
              URL Atual: {currentApiUrl || 'Não configurada'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: 1234abcd.ngrok.io"
              value={apiUrl}
              onChangeText={setApiUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleSaveApiUrl}
            >
              <Text style={styles.buttonText}>Salvar URL</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Banco Inter</Text>
      <Text style={styles.subtitle}>Faça seu login</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Cadastro')}
        disabled={loading}
      >
        <Text style={styles.registerLink}>Criar uma conta</Text>
      </Pressable>
    </View>
  );
}
