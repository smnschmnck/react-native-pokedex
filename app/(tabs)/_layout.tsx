import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClearIcon } from "@icons/ClearIcon";
const queryClient = new QueryClient();

export default function TabsLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#06f",
        }}
      >
        <Tabs.Screen
          name="list"
          options={{
            tabBarLabel: "All Pokemon",
            title: "All Pokemon",
            tabBarIcon: ClearIcon,
          }}
        />
        <Tabs.Screen
          name="savedPokemon"
          options={{
            tabBarLabel: "Collection",
            title: "Collection",
            tabBarIcon: ClearIcon,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
