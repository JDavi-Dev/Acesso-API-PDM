import React from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Repositorio } from "@/interfaces/Repositorio";

interface ModalNovoRepoProps {
  visible: boolean;
  onClose: () => void;
  repositorio: Repositorio;
  onChange: (campo: string, valor: string) => void;
  onSalvar: () => void;
}

function ModalNovoRepo({ visible, onClose, repositorio, onChange, onSalvar}: ModalNovoRepoProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Busca de repositório</Text>
        <TextInput
          placeholder="Dono do repositório"
          value={repositorio.ownerid}
          onChangeText={(text) => onChange("ownerid", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Nome do repositório"
          value={repositorio.repoid}
          onChangeText={(text) => onChange("repoid", text)}
          style={styles.input}
        />
        <View style={styles.botoes}>
          <Button color="#edb410" title="Cancelar" onPress={onClose} />
          <View style={{ width: 10 }} />
          <Button color="#61eb2b" title="Salvar" onPress={onSalvar} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: "100%",
  },
  botoes: {
    flexDirection: "row",
    marginTop: 5,
  },
});

export default ModalNovoRepo;
