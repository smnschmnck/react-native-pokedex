import { FlatList } from "react-native";
import { StyleSheet, Text, Pressable } from "react-native";
import { FC, useEffect, useState } from "react";
import { Link } from "expo-router";

type Pokemon = {
  name: string;
};

type PokeApiRes = {
  results: Pokemon[];
};

const ListEntry: FC<{ pokemon: Pokemon }> = ({ pokemon }) => (
  <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name} asChild>
    <Pressable style={styles.listEntry}>
      <Text>{pokemon.name}</Text>
    </Pressable>
  </Link>
);

export const PokemonList: FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const json = (await res.json()) as PokeApiRes;
      setPokemon(json.results);
    };

    fetchPokemon();
  }, []);

  return (
    <FlatList
      data={pokemon.filter((p) => {
        const name = p.name.toLowerCase();
        const nameQuery = searchQuery.toLowerCase();

        return name.includes(nameQuery);
      })}
      renderItem={({ item }) => <ListEntry pokemon={item} />}
    />
  );
};

const styles = StyleSheet.create({
  listEntry: {
    paddingVertical: 24,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
});
