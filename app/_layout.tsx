import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

const Layout = () => {
  return (
    <View style={styles.mainLayout}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    display: "flex",
    flex: 1,
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 32,
  },
});

export default Layout;
