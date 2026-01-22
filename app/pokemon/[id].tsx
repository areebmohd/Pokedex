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
import { Pokemon } from "../types";
import { capitalize, fetchWithCache } from "../utils/api";
import { getTypeColor } from "../utils/typeColors";

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data: Pokemon = await fetchWithCache(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text
          style={{
            fontSize: 18,
            color: "blue",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View
          style={[
            styles.card,
            { backgroundColor: getTypeColor(pokemon.types?.[0]?.type.name) },
          ]}
        >
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
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
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    marginVertical: 16,
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
