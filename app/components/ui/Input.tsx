import { TextInput, TextInputProps, View, StyleSheet } from "react-native";
import { FC, ReactNode } from "react";

type InputProps = TextInputProps & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export const Input: FC<InputProps> = ({
  startAdornment,
  endAdornment,
  ...props
}) => {
  return (
    <View style={styles.searchField}>
      {startAdornment}
      <TextInput {...props} style={styles.searchFieldInput} />
      {endAdornment}
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#efefef",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchFieldInput: {
    display: "flex",
    flex: 1,
  },
});
