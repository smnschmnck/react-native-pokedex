import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { FC, useEffect, useState } from "react";
import { Link } from "expo-router";
import { Input } from "./components/ui/Input";
import { MagnifyingGlass } from "./icons/MagnifyingGlass";

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

const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const json = (await res.json()) as PokeApiRes;
      setPokemon(json.results);
    };

    fetchPokemon();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Pokedex</Text>
      <Input
        onChangeText={setSearchQuery}
        returnKeyType="done"
        placeholder="Search Pokemon"
        placeholderTextColor={"#8a8a8a"}
        startAdornment={<MagnifyingGlass strokeColor="#8a8a8a" />}
      />
      <FlatList
        data={pokemon.filter((p) => {
          const name = p.name.toLowerCase();
          const nameQuery = searchQuery.toLowerCase();

          return name.includes(nameQuery);
        })}
        renderItem={({ item }) => <ListEntry pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    gap: 24,
  },
  listEntry: {
    paddingVertical: 24,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  searchField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#efefef",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchFieldInput: {
    display: "flex",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
