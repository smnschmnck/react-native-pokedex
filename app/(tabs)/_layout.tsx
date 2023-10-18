import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListIcon } from "@icons/ListIcon";
import { ArchiveIcon } from "@icons/ArchiveIcon";
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
            tabBarIcon: ListIcon,
          }}
        />
        <Tabs.Screen
          name="savedPokemon"
          options={{
            tabBarLabel: "Collection",
            title: "Collection",
            tabBarIcon: ArchiveIcon,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
