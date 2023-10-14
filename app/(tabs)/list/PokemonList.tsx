import { ActivityIndicator, FlatList, View } from "react-native";
import { StyleSheet, Text, Pressable } from "react-native";
import { FC } from "react";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";

type Pokemon = {
  name: string;
};

type PokeApiRes = {
  results: Pokemon[];
};

const ListEntry: FC<{ pokemon: Pokemon }> = ({ pokemon }) => (
  <Link
    href={`/(tabs)/list/pokemon/${pokemon.name}`}
    key={pokemon.name}
    asChild
  >
    <Pressable style={styles.listEntry}>
      <Text>{pokemon.name}</Text>
    </Pressable>
  </Link>
);

export const PokemonList: FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const fetchPokemon = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const json = (await res.json()) as PokeApiRes;
    return json.results;
  };

  const { data: pokemon } = useQuery({
    queryKey: [`pokemonList`],
    queryFn: fetchPokemon,
  });

  return (
    <View style={{ flex: 1 }}>
      {pokemon && (
        <FlatList
          data={pokemon?.filter((p) => {
            const name = p.name.toLowerCase();
            const nameQuery = searchQuery.toLowerCase();

            return name.includes(nameQuery);
          })}
          renderItem={({ item }) => <ListEntry pokemon={item} />}
        />
      )}
      {!pokemon && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listEntry: {
    paddingVertical: 24,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
