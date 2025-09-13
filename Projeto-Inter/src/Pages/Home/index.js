import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import estilos from './styles';

export default function Home() {
  const [saldo, setSaldo] = useState(1000.00);
  const [registros, setRegistros] = useState([
    { id: '1', tipo: 'gasto', descricao: 'Almoço', valor: 25.50 },
    { id: '2', tipo: 'gasto', descricao: 'Transporte', valor: 7.00 },
  ]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [tipo, setTipo] = useState('gasto'); // ou ganho
  const [descricao, setDescricao] = useState('');
  const [valorTexto, setValorTexto] = useState('');

  const abrirModal = () => {
    setTipo('gasto');
    setDescricao('');
    setValorTexto('');
    setModalVisivel(true);
  };

  const salvarRegistro = () => {
    const valor = parseFloat(valorTexto.replace(',', '.'));

    if (!descricao || isNaN(valor) || valor <= 0) {
      Alert.alert('Preencha todos os campos corretamente');
      return;
    }

    const novoRegistro = {
      id: Date.now().toString(),
      tipo,
      descricao,
      valor
    };

    const novoSaldo = tipo === 'ganho' ? saldo + valor : saldo - valor;

    setRegistros([novoRegistro, ...registros]);
    setSaldo(novoSaldo);
    setModalVisivel(false);
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.textoHeader}>Olá, Usuário</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.tituloSaldo}>Saldo disponível:</Text>
        <Text style={estilos.valorSaldo}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <Text style={estilos.tituloLista}>Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={estilos.itemGasto}>
            <Text style={estilos.descricaoGasto}>
              {item.tipo === 'ganho' ? '🔼 ' : '🔽 '}
              {item.descricao}
            </Text>
            <Text style={estilos.valorGasto}>
              {item.tipo === 'gasto' ? '- ' : '+ '}
              R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={estilos.botaoAdicionar} onPress={abrirModal}>
        <Text style={estilos.textoBotaoAdicionar}>Registrar valor</Text>
      </TouchableOpacity>

      {/* Modal de adicionar valor */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Novo Registro</Text>

            <View style={estilos.modalOpcoes}>
              <TouchableOpacity
                style={[estilos.botaoTipo, tipo === 'ganho' && estilos.botaoSelecionado]}
                onPress={() => setTipo('ganho')}
              >
                <Text style={estilos.textoTipo}>Ganho</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[estilos.botaoTipo, tipo === 'gasto' && estilos.botaoSelecionado]}
                onPress={() => setTipo('gasto')}
              >
                <Text style={estilos.textoTipo}>Gasto</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Descrição"
              style={estilos.inputModal}
              value={descricao}
              onChangeText={setDescricao}
            />

            <TextInput
              placeholder="Valor (ex: 100.00)"
              style={estilos.inputModal}
              value={valorTexto}
              onChangeText={setValorTexto}
              keyboardType="numeric"
            />

            <TouchableOpacity style={estilos.botaoSalvar} onPress={salvarRegistro}>
              <Text style={estilos.textoSalvar}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisivel(false)}>
              <Text style={{ color: '#888', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
