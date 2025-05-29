import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Repositorio } from "@/interfaces/Repositorio";

interface RepositorioItemProps {
  repositorio: Repositorio;
}

function RepositorioItem({ repositorio, }: RepositorioItemProps) {
  return (
    <View style={styles.repositorioItem}>
      <Text style={styles.repoNome}>Repositório: {repositorio.repoid}</Text>
      <Text style={styles.camposRepo}>Dono do repositório: {repositorio.ownerid}</Text>
      <Text style={styles.camposRepo}>Node_id: {repositorio.node_id}</Text>
      <Text style={styles.camposRepo}>Visibility: {repositorio.visibility}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  repositorioItem: {
    width: 300,
    padding: 10,
    marginTop: 7,
    marginBottom: 3,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#9a5ff7",
  },
  repoNome: {
    color: "#820847",
    fontSize: 20,
    fontWeight: "bold",
  },
  camposRepo: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RepositorioItem;
