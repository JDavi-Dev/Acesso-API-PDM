import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Repositorio } from "@/interfaces/Repositorio";

interface RepositorioItemProps {
  repositorio: Repositorio;
}

function RepositorioItem({ repositorio }: RepositorioItemProps) {
  return (
    <View style={styles.repositorioItem}>
      <Text style={styles.repoNome}>
        Repositório: <Text style={styles.dadosRepo}>{repositorio.repoid}</Text>
      </Text>
      <Text style={styles.camposRepo}>
        Node_id: <Text style={styles.dadosRepo}>{repositorio.node_id}</Text>
      </Text>
      <Text style={styles.camposRepo}>
        Visibility:{" "}
        <Text style={styles.dadosRepo}>{repositorio.visibility}</Text>
      </Text>
      <Text style={styles.repoNome}>
        Dono do repositório:{" "}
        <Text style={styles.dadosRepo}>{repositorio.ownerid}</Text>
      </Text>
      <Text style={styles.camposRepo}>
        Id Owner: <Text style={styles.dadosRepo}>{repositorio.id_owner}</Text>
      </Text>
      <Text style={styles.camposRepo}>
        Type: <Text style={styles.dadosRepo}>{repositorio.type}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  repositorioItem: {
    width: 325,
    padding: 10,
    marginTop: 7,
    marginBottom: 3,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "flex-start",
    backgroundColor: "#9a5ff7",
  },
  repoNome: {
    color: "#820847",
    marginTop: 6,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  camposRepo: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  dadosRepo: {
    color: "white",
  },
});

export default RepositorioItem;
