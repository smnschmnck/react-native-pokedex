import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { SearchInput } from "./components/ui/SearchInput";
import { PokemonList } from "./components/PokemonList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Pokedex</Text>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PokemonList searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    gap: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
