import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const searchPokemon = async () => {
    if (!search.trim()) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      );
      if (!response.ok) throw new Error("Not found");
      const data: Pokemon = await response.json();
      setPokemon(data);
      const history = JSON.parse(
        (await AsyncStorage.getItem("history")) || "[]",
      );
      const exists = history.find((p: Pokemon) => p.name === data.name);
      if (!exists) {
        history.push({ name: data.name, image: data.sprites.front_default });
        await AsyncStorage.setItem("history", JSON.stringify(history));
      }
    } catch (error) {
      alert("Pokemon not found");
      setPokemon(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeDex</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search Pokemon"
        onSubmitEditing={searchPokemon}
      />
      <TouchableOpacity style={styles.button} onPress={searchPokemon}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {pokemon && (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/pokemon/[id]",
              params: { id: pokemon.name },
            })
          }
        >
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.name}>{pokemon.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
