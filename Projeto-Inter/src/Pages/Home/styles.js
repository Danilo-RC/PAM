import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    backgroundColor: '#FF6F00',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  tituloSaldo: {
    fontSize: 16,
    color: '#333',
  },
  valorSaldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginTop: 5,
  },
  tituloLista: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemGasto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  descricaoGasto: {
    fontSize: 16,
  },
  valorGasto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  botaoAdicionar: {
    backgroundColor: '#FF6F00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

    modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOpcoes: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  botaoTipo: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botaoSelecionado: {
    backgroundColor: '#FF6F00',
  },
  textoTipo: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputModal: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#FF6F00',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  textoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
