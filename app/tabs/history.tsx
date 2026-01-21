import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Pokemon {
  name: string;
  image: string;
}

export default function History() {
  const [history, setHistory] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = JSON.parse((await AsyncStorage.getItem("history")) || "[]");
      setHistory(data);
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search History</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/pokemon/[id]",
                params: { id: pokemon.name },
              })
            }
          >
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name}</Text>
          </TouchableOpacity>
        ))}
        {history.length === 0 && (
          <Text style={styles.emptyText}>
            No Pokemon searched yet. Go to Home tab and search for some Pokemon!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
});
