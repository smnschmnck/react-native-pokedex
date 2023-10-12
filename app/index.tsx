import { FlatList, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

type Pokemon = {
  name: string;
};

type PokeApiRes = {
  results: Pokemon[];
};

const Home = () => {
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
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Pokedex</Text>
      <FlatList
        data={pokemon}
        renderItem={({ item }) => (
          <Link
            href={`/pokemon/${item.name}`}
            style={styles.listEntry}
            key={item.name}
          >
            <Text>{item.name}</Text>
          </Link>
        )}
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
    borderBottomColor: "#f1f1f1",
    paddingBottom: 8,
    paddingTop: 16,
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
