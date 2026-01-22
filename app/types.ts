export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
}

export interface HistoryPokemon {
  name: string;
  image: string;
  types?: { type: { name: string } }[];
}
