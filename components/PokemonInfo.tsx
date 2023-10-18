import { BackButton } from "@components/ui/BackButton";
import { usePokemonInfo } from "hooks/usePokemonInfo";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { FC } from "react";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";

export const PokemonInfo: FC<{ name: string }> = ({ name }) => {
  const { pokemon, refetchPokemonInfo } = usePokemonInfo(name);

  useRefreshOnFocus(refetchPokemonInfo);

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
    flex: 1,
    paddingTop: 32,
    gap: 32,
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
