import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function TabsLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="list"
          options={{
            tabBarLabel: "Pokemon",
            title: "Pokemon",
          }}
        />
        <Tabs.Screen
          name="savedPokemon"
          options={{
            tabBarLabel: "Saved Pokemon",
            title: "Saved Pokemon",
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
