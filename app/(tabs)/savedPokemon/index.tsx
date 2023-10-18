import { Button } from "@components/ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  ActivityIndicator,
} from "react-native";

const ListEntry: FC<{ name: string }> = ({ name }) => {
  const queryClient = useQueryClient();
  const deletePokemonMutation = useMutation({
    mutationFn: () => deletePokemonFromList(name),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["savedPokemon"],
      });
      await queryClient.refetchQueries({
        queryKey: [`pokemonInfo/${name}`],
      });
    },
  });

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
          onPress: () => {
            deletePokemonMutation.mutate();
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
      {savedPokemonList && (
        <>
          {savedPokemonList.length >= 1 && (
            <FlatList
              data={savedPokemonList}
              renderItem={({ item }) => <ListEntry name={item} />}
            />
          )}
          {savedPokemonList.length <= 0 && (
            <View style={styles.noPokemonContainer}>
              <Text>No saved Pokemon</Text>
            </View>
          )}
        </>
      )}
      {!savedPokemonList && (
        <View style={styles.noPokemonContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 24,
  },
  noPokemonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
