import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import RepositorioItem from "@/components/repositorio/RepositorioItem";
import ModalNovoRepo from "@/components/modal/ModalNovoRepo";
import { Repositorio } from "@/interfaces/Repositorio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function ReposApi() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoRepositorio, setNovoRepositorio] = useState<Repositorio>({
    id: "",
    ownerid: "",
    repoid: "",
    node_id: "",
    visibility: "",
  });

  const [repositorios, setRepositorios] = useState<Repositorio[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@AcessoApiApp:repositorios");
        const repositoriosData = data != null ? JSON.parse(data) : [];
        setRepositorios(repositoriosData);
      } catch (e) {}
    }
    getData();
  }, []);

  const adicionarRepositorio = async () => {
    if (!novoRepositorio.ownerid || !novoRepositorio.repoid) {
      Alert.alert("Erro", "Por favor, preencha os campos do repositório.");
      return;
    }

    try {
      // Faz a requisição para obter os dados do repositório
      const response = await axios.get(
        `https://api.github.com/repos/${novoRepositorio.ownerid}/${novoRepositorio.repoid}`
      );

      const { node_id, visibility } = response.data;

      const repositorioAtualizado = {
        ...novoRepositorio,
        node_id,
        visibility,
      };

      // Atualiza a lista de repositórios
      setRepositorios((prevRepositorios) => [
        ...prevRepositorios,
        repositorioAtualizado,
      ]);

      // Armazena a lista de repositórios no AsyncStorage
      await AsyncStorage.setItem(
        "@AcessoApiApp:repositorios",
        JSON.stringify([...repositorios, repositorioAtualizado])
      );

      fecharModal();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o repositório.");
      console.error("Erro na requisição:", error);
    }
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovoRepositorio({ ...novoRepositorio, [campo]: valor });
  };

  const fecharModal = () => {
    setModalVisible(false);
    // Limpa os campos da nova receita ao fechar o modal
    setNovoRepositorio({
      id: "",
      ownerid: "",
      repoid: "",
      node_id: "",
      visibility: "",
    });
  };

  // Função para deletar todos os repositórios
  const deletarTodosRepositorios = async () => {
    try {
      // Limpa o AsyncStorage
      await AsyncStorage.removeItem("@AcessoApiApp:repositorios");

      // Limpa a lista de repositórios no estado
      setRepositorios([]);

      Alert.alert("Sucesso", "Todos os repositórios foram deletados.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar os repositórios.");
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Repositórios</Text>

      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisible(true)}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity style={styles.botaoDelete} onPress={deletarTodosRepositorios}>
          <Text style={styles.textoBotao}>-</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {repositorios.map((item) => (
          <RepositorioItem
            key={item.id}
            repositorio={item}
          />
        ))}
      </ScrollView>

      <ModalNovoRepo
        visible={modalVisible}
        onClose={fecharModal}
        repositorio={novoRepositorio}
        onChange={atualizarCampo}
        onSalvar={adicionarRepositorio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#393340",
  },
  containerBotoes: {
    flexDirection: "row",
    marginBottom: 10
  },
  botaoAdicionar: {
    backgroundColor: "#2161d9",
    marginTop: 10,
    width: 50,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoDelete: {
    backgroundColor: "#ff4d4d",
    marginTop: 10,
    width: 50,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ReposApi;
