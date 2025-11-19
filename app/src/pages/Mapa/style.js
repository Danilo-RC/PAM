import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  // Estilo para o Pin personalizado (ícone do Banco Inter)
  markerPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF7A00', // Cor do Banco Inter
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  // Estilo para o Card de Detalhes (Bottom Sheet)
  detailsCardContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    maxHeight: height * 0.4, // Máximo de 40% da tela
    backgroundColor: '#333', // Fundo escuro para contraste
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  detailsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7A00', // Cor do Banco Inter
    flexShrink: 1,
    paddingRight: 10,
  },
  detailsCardBody: {
    paddingVertical: 10,
  },
  detailsCardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  detailsCardLabel: {
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
