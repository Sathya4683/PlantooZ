import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerTitle: "PlantooZ",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#0F2F1C" },
          headerTintColor: "#EAF7EE",
          drawerStyle: { backgroundColor: "#0F2F1C" },
          drawerActiveTintColor: "#A7F3D0",
          drawerInactiveTintColor: "#D1FAE5",
          headerRight: () => (
            <TouchableOpacity
              style={{ flexDirection: "row", marginRight: 16 }}
            >
              <TouchableOpacity onPress={() => router.push("/help")} style={{ marginRight: 16 }}>
                <Ionicons name="help-circle-outline" size={22} color="#A7F3D0" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/shop")}>
                <Ionicons name="cart-outline" size={22} color="#A7F3D0" />
              </TouchableOpacity>
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerLabel: "Home Garden" }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: "Settings" }}
        />
        {/* Hidden from Drawer Menu but accessible via routes */}
        <Drawer.Screen name="help" options={{ drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="shop" options={{ drawerItemStyle: { display: "none" } }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}