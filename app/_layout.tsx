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
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 32,
    backgroundColor: "white",
  },
});

export default Layout;
