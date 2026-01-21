import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
}

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text
          style={{ fontSize: 18, color: "blue", marginLeft: 20, marginTop: 45 }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.detail}>Height: {pokemon.height / 10} m</Text>
          <Text style={styles.detail}>Weight: {pokemon.weight / 10} kg</Text>
          <Text style={styles.detail}>
            Types: {pokemon.types.map((t) => t.type.name).join(", ")}
          </Text>
          <Text style={styles.detail}>
            Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "capitalize",
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
});
