import { BackButton } from "@components/ui/BackButton";
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
      <View style={styles.header}>
        <View style={styles.headerSpacerView}>
          <BackButton />
        </View>
        <Text style={styles.nameHeading}>{name}</Text>
        <View style={styles.headerSpacerView} />
      </View>
      {!pokemon && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {!!pokemon && (
        <View style={styles.pokeView}>
          <View style={styles.infoView}>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacerView: {
    flex: 1,
  },
  pokeView: {
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 32,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
  },
  infoView: {
    gap: 8,
    alignSelf: "stretch",
  },
  stats: {},
  nameHeading: {
    fontSize: 24,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  mainView: {
    flex: 1,
    justifyContent: "space-between",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkStyle: {
    alignSelf: "flex-start",
  },
  backLink: {
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
