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
          headerTitle: "",
          headerShadowVisible: false,

          // 🌿 Header theme
          headerStyle: {
            backgroundColor: "#0F2F1C",
          },
          headerTintColor: "#EAF7EE",

          // 🌿 Drawer theme
          drawerStyle: {
            backgroundColor: "#0F2F1C",
          },
          drawerActiveTintColor: "#A7F3D0",
          drawerInactiveTintColor: "#D1FAE5",

          // Top-right icons
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              {/* ❓ Help */}
              <TouchableOpacity
                onPress={() => router.push("/help")}
                style={{ marginRight: 16 }}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#A7F3D0"
                />
              </TouchableOpacity>

              {/* 🛒 Shop */}
              <TouchableOpacity onPress={() => router.push("/shop")}>
                <Ionicons
                  name="cart-outline"
                  size={22}
                  color="#A7F3D0"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ),
        }}
      >
        {/* -------- Hidden routes -------- */}

        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="help"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="shop"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        {/* -------- Visible route -------- */}

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
