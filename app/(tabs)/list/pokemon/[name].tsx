import { PokemonInfo } from "@components/PokemonInfo";
import { Button } from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePokemonToList } from "@utils/pokemonStore";
import { useLocalSearchParams } from "expo-router";
import { usePokemonInfo } from "hooks/usePokemonInfo";
import { View } from "react-native";

const PokemonView = () => {
  const { name } = useLocalSearchParams();
  const pokemonName = String(name);
  const queryClient = useQueryClient();
  const { pokemon, refetchPokemonInfo } = usePokemonInfo(pokemonName);

  const savePokemonMutation = useMutation({
    mutationFn: () => savePokemonToList(String(name)),
    onSuccess: async () => {
      await refetchPokemonInfo(),
        await queryClient.refetchQueries({
          queryKey: ["savedPokemon"],
        });
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <PokemonInfo name={pokemonName} />
      <Button
        onPress={() => savePokemonMutation.mutate()}
        isLoading={savePokemonMutation.isLoading}
        disabled={pokemon?.isSaved}
        title={pokemon?.isSaved ? "Saved" : "Save to collection"}
        fullWidth
      />
    </View>
  );
};

export default PokemonView;
