import { useQuery } from "@tanstack/react-query";
import { getSavedPokemonList } from "@utils/pokemonStore";

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

export const usePokemonInfo = (name: string) => {
  const fetchPokemonInfo = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const json = (await res.json()) as Pokemon;
    const savedPokemonList = await getSavedPokemonList();
    return {
      ...json,
      isSaved: savedPokemonList.includes(name),
    };
  };

  const { data: pokemon, refetch: refetchPokemonInfo } = useQuery({
    queryKey: [`pokemonInfo/${name}`],
    queryFn: fetchPokemonInfo,
  });

  return { pokemon, refetchPokemonInfo };
};
