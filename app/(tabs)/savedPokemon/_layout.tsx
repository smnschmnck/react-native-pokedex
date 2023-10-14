import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

const Layout = () => {
  return (
    <View style={styles.mainLayout}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    padding: 32,
    backgroundColor: "white",
  },
});

export default Layout;
