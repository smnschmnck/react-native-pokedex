import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const Layout = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    mainLayout: {
      flex: 1,
      paddingTop: insets.top + 16,
      paddingBottom: insets.bottom + 16,
      paddingHorizontal: 32,
      backgroundColor: "white",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: styles.mainLayout }}
      />
    </QueryClientProvider>
  );
};

export default Layout;
