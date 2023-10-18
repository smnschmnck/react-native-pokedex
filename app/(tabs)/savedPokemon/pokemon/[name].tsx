import { PokemonInfo } from "@components/PokemonInfo";
import { useLocalSearchParams } from "expo-router";

const PokemonView = () => {
  const { name } = useLocalSearchParams();
  return <PokemonInfo name={String(name)} />;
};

export default PokemonView;
