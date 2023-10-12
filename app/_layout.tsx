import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: styles.mainLayout }}
      />
    </QueryClientProvider>
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
