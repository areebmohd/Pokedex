import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HistoryPokemon, Pokemon } from "../types";
import { capitalize, fetchWithCache } from "../utils/api";
import { getTypeColor } from "../utils/typeColors";

const PokemonCard = memo(({ pokemon }: { pokemon: Pokemon }) => (
  <TouchableOpacity
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
    <Image
      source={{ uri: pokemon.sprites.front_default }}
      style={styles.image}
    />
    <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
  </TouchableOpacity>
));
PokemonCard.displayName = "PokemonCard";

export default function Index() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [focused, setFocused] = useState(false);

  const searchPokemon = async () => {
    if (!search.trim()) return;
    try {
      const data: Pokemon = await fetchWithCache(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      );
      setPokemon(data);
      const history: HistoryPokemon[] = JSON.parse(
        (await AsyncStorage.getItem("history")) || "[]",
      );
      const exists = history.some((p) => p.name === data.name);
      if (!exists) {
        history.push({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types,
        });
        await AsyncStorage.setItem("history", JSON.stringify(history));
      }
    } catch {
      alert("Pokemon not found");
      setPokemon(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeDex</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={search}
        onChangeText={setSearch}
        placeholder="Search Pokemon"
        onSubmitEditing={searchPokemon}
      />
      <TouchableOpacity style={styles.button} onPress={searchPokemon}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "blue",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: "blue",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    gap: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    marginVertical: 10,
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
});
