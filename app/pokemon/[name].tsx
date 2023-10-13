import { Button } from "@components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";

type Move = {
  move: {
    name: string;
  };
};

type Pokemon = {
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  moves: Move[];
};

const PokemonView = () => {
  const { name } = useLocalSearchParams();
  const fetchPokemonInfo = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const json = (await res.json()) as Pokemon;
    return json;
  };

  const { data: pokemon } = useQuery({
    queryKey: [`pokemonInfo/${name}`],
    queryFn: fetchPokemonInfo,
  });

  return (
    <View style={styles.mainView}>
      {!pokemon && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {!!pokemon && (
        <View style={styles.pokeView}>
          <View style={styles.infoView}>
            <Text style={styles.nameHeading}>{name}</Text>
            <View style={styles.stats}>
              <Text style={styles.infoText}>Height: {pokemon?.height}</Text>
              <Text style={styles.infoText}>Weight: {pokemon?.weight}</Text>
            </View>
          </View>
          <Image
            height={300}
            width={300}
            source={{ uri: pokemon?.sprites.front_default }}
          />
          <Button title="Save to collection" fullWidth />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pokeView: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
  },
  infoView: {
    display: "flex",
    gap: 8,
    alignSelf: "stretch",
  },
  stats: {
    display: "flex",
  },
  nameHeading: {
    fontSize: 32,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  mainView: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  loadingScreen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkStyle: {
    alignSelf: "flex-start",
  },
  backLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: "#dedede",
  },
});

export default PokemonView;
