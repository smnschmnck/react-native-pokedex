import { Button } from "@components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import {
  deletePokemonFromList,
  getSavedPokemonList,
} from "@utils/pokemonStore";
import { capitalizeString } from "@utils/stringFormatters";
import { Link } from "expo-router";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { FC } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

const ListEntry: FC<{ name: string; refetch: () => Promise<any> }> = ({
  name,
  refetch,
}) => {
  const triggerDeleteDialog = () => {
    const capitalizedName = capitalizeString(name);
    Alert.alert(
      `Delete ${capitalizedName}?`,
      `Do you really want to delete ${capitalizedName} from your collection?`,
      [
        {
          text: "Cancel",
          isPreferred: true,
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deletePokemonFromList(name);
            await refetch();
          },
        },
      ]
    );
  };

  return (
    <Link href={`/(tabs)/savedPokemon/pokemon/${name}`} key={name} asChild>
      <Pressable style={styles.listEntry}>
        <Text style={styles.pokemonName}>{name}</Text>
        <View>
          <Button
            onPress={triggerDeleteDialog}
            title="Delete"
            variant="ghost"
            destructive
          />
        </View>
      </Pressable>
    </Link>
  );
};

const SavedPokemon = () => {
  const { data: savedPokemonList, refetch } = useQuery({
    queryKey: ["savedPokemon"],
    queryFn: getSavedPokemonList,
  });
  useRefreshOnFocus(refetch);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Saved Pokemon</Text>
      <FlatList
        data={savedPokemonList}
        renderItem={({ item }) => <ListEntry name={item} refetch={refetch} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 24,
  },
  pokemonName: {
    textTransform: "capitalize",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
  },
  listEntry: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
});

export default SavedPokemon;
