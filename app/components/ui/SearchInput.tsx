import { FC } from "react";
import { Input } from "./Input";
import { MagnifyingGlassIcon } from "../../icons/MagnifyingGlassIcon";
import { ClearIcon } from "../../icons/ClearIcon";
import { Pressable } from "react-native";

type ClearButtonProps = {
  setSearchQuery: (searchQuery: string) => void;
};

const ClearButton: FC<ClearButtonProps> = ({ setSearchQuery }) => {
  return (
    <Pressable onPress={() => setSearchQuery("")}>
      <ClearIcon color="#8a8a8a" />
    </Pressable>
  );
};

type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({
  setSearchQuery,
  searchQuery,
}) => {
  const showClearButton = searchQuery.length > 0;

  return (
    <Input
      onChangeText={setSearchQuery}
      returnKeyType="done"
      value={searchQuery}
      placeholder="Search Pokemon"
      placeholderTextColor={"#8a8a8a"}
      startAdornment={<MagnifyingGlassIcon color="#8a8a8a" />}
      endAdornment={
        showClearButton ? (
          <ClearButton setSearchQuery={setSearchQuery} />
        ) : undefined
      }
    />
  );
};
