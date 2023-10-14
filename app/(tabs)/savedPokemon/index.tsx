import { useQuery } from "@tanstack/react-query";
import { getSavedPokemonList } from "@utils/pokemonStore";
import { FlatList, Text, View } from "react-native";

const SavedPokemon = () => {
  const { data: savedPokemonList } = useQuery({
    queryKey: ["savedPokemon"],
    queryFn: getSavedPokemonList,
  });
  return (
    <View>
      <Text>List</Text>
      <FlatList
        data={savedPokemonList}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default SavedPokemon;
