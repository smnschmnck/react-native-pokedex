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
    <View style={styles.inputWrapper}>
      {startAdornment}
      <TextInput {...props} style={styles.input} />
      {endAdornment}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#efefef",
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
  },
});
