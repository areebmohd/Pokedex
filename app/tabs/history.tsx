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
import { getTypeColor } from "../utils/typeColors";

interface Pokemon {
  name: string;
  image: string;
  types?: { type: { name: string } }[];
}

export default function History() {
  const [history, setHistory] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const raw = (await AsyncStorage.getItem("history")) || "[]";
      const data: Pokemon[] = JSON.parse(raw);

      const updated = await Promise.all(
        data.map(async (p) => {
          if (p.types && p.types.length) return p;
          try {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${p.name}`,
            );
            if (!res.ok) return p;
            const d = await res.json();
            return { ...p, types: d.types };
          } catch {
            return p;
          }
        }),
      );

      setHistory(updated);
      await AsyncStorage.setItem("history", JSON.stringify(updated));
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { backgroundColor: getTypeColor(pokemon.types?.[0]?.type.name) },
            ]}
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
    paddingTop: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  card: {
    width: "46%",
    marginHorizontal: "2%",
    marginBottom: 10,
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
});
