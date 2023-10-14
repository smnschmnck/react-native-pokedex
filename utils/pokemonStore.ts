import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "constants/AsyncStorageKeys";
import { SavedPokemonList } from "types/asyncStorage";

export const getSavedPokemonList = async () => {
  const savedPokemonListRes = await AsyncStorage.getItem(
    asyncStorageKeys.savedPokemon
  );
  if (!savedPokemonListRes) {
    await AsyncStorage.setItem(
      asyncStorageKeys.savedPokemon,
      JSON.stringify([])
    );

    return [];
  }

  const savedPokemonList = (await JSON.parse(
    savedPokemonListRes ?? ""
  )) as SavedPokemonList;

  return savedPokemonList;
};

export const savePokemonToList = async (name: string) => {
  const savedPokemonList = await getSavedPokemonList();
  if (savedPokemonList.includes(name)) {
    return;
  }

  savedPokemonList.push(name);
  await AsyncStorage.setItem(
    asyncStorageKeys.savedPokemon,
    JSON.stringify(savedPokemonList)
  );
};
