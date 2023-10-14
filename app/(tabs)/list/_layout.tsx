import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: styles.mainLayout }}
    />
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "white",
  },
});

export default Layout;
