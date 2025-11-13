// Dados de caixas eletrônicos simulados para o Banco Inter (10 caixas)
// As coordenadas são fictícias e centradas em uma área próxima a São Paulo, Brasil.

export const atms = [
  {
    id: 1,
    nome: 'Caixa Eletrônico Inter - Av. Paulista',
    descricao: 'Caixa 24h, acesso fácil, próximo à estação de metrô.',
    latitude: -23.56135,
    longitude: -46.656,
  },
  {
    id: 2,
    nome: 'Caixa Eletrônico Inter - Shopping Eldorado',
    descricao: 'Localizado no 1º piso, ao lado da praça de alimentação.',
    latitude: -23.5898,
    longitude: -46.7088,
  },
  {
    id: 3,
    nome: 'Caixa Eletrônico Inter - Vila Olímpia',
    descricao: 'Aberto das 8h às 20h, dentro da agência parceira.',
    latitude: -23.596,
    longitude: -46.685,
  },
  {
    id: 4,
    nome: 'Caixa Eletrônico Inter - Pinheiros',
    descricao: 'Caixa rápido, ideal para saques e depósitos.',
    latitude: -23.567,
    longitude: -46.699,
  },
  {
    id: 5,
    nome: 'Caixa Eletrônico Inter - Centro',
    descricao: 'Próximo ao Teatro Municipal, alta segurança.',
    latitude: -23.545,
    longitude: -46.638,
  },
  {
    id: 6,
    nome: 'Caixa Eletrônico Inter - Moema',
    descricao: 'Disponível 24h, em posto de serviço.',
    latitude: -23.6,
    longitude: -46.678,
  },
  {
    id: 7,
    nome: 'Caixa Eletrônico Inter - Tatuapé',
    descricao: 'Localizado em área comercial movimentada.',
    latitude: -23.54,
    longitude: -46.57,
  },
  {
    id: 8,
    nome: 'Caixa Eletrônico Inter - Santana',
    descricao: 'Fácil acesso pela Av. Cruzeiro do Sul.',
    latitude: -23.5,
    longitude: -46.63,
  },
  {
    id: 9,
    nome: 'Caixa Eletrônico Inter - Santo Amaro',
    descricao: 'Dentro de um supermercado, horário estendido.',
    latitude: -23.65,
    longitude: -46.7,
  },
  {
    id: 10,
    nome: 'Caixa Eletrônico Inter - Osasco',
    descricao: 'Próximo à estação de trem, ponto de referência.',
    latitude: -23.53,
    longitude: -46.78,
  },
];

// Coordenada inicial (aproximadamente o centro de São Paulo)
export const initialRegion = {
  latitude: -23.55052,
  longitude: -46.633309,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
