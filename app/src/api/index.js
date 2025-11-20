import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração da API para IP local com XAMPP
const api = axios.create({
  // A baseURL será definida dinamicamente pelo interceptor
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar a baseURL dinâmica e o token
api.interceptors.request.use(
  async config => {
    try {
      const urlApi = await AsyncStorage.getItem('url_api');
      if (urlApi) {
        // Normaliza a URL: garante que comece com https:// e termine com /api
        let normalizedUrl = urlApi.trim();
        if (!normalizedUrl.startsWith('https://')) {
          normalizedUrl = 'https://' + normalizedUrl;
        }
        if (normalizedUrl.endsWith('/')) {
          normalizedUrl = normalizedUrl.slice(0, -1);
        }
        if (!normalizedUrl.endsWith('/api')) {
          normalizedUrl = normalizedUrl + '/api';
        }
        config.baseURL = normalizedUrl;
      }

      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro no interceptor de requisição:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar as respostas e ele funciona para logout automático se o token expirar
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      // Token foi expirado ou inválido
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.error('Erro ao remover token:', e);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
