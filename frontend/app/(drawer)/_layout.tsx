import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

/* ─────────────────────────────
   Custom Drawer Content
───────────────────────────── */
function CustomDrawerContent() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <View style={styles.drawer}>
      {/* SETTINGS */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/settings")}
      >
        <Ionicons name="settings-outline" size={20} color="#A7F3D0" />
        <Text style={styles.label}>Settings</Text>
      </TouchableOpacity>

      {/* PUSH CONTENT UP */}
      <View style={{ flex: 1 }} />

      {/* SAFE AREA LOGOUT */}
      <SafeAreaView edges={["bottom"]}>
        <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#FCA5A5" />
          <Text style={[styles.label, styles.logoutText]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

/* ─────────────────────────────
   Root Layout
───────────────────────────── */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <CustomDrawerContent />}
        screenOptions={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#0F2F1C" },
          headerTintColor: "#EAF7EE",

          drawerStyle: { backgroundColor: "#0F2F1C" },
          drawerActiveTintColor: "#A7F3D0",
          drawerInactiveTintColor: "#D1FAE5",

          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => router.push("/help")}
                style={styles.headerIcon}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#A7F3D0"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/shop")}
              >
                <Ionicons
                  name="cart-outline"
                  size={22}
                  color="#A7F3D0"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="help"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="shop"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

/* ─────────────────────────────
   Styles
───────────────────────────── */
const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: "#0F2F1C",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: "#D1FAE5",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#14532D",
  },
  logoutText: {
    color: "#FCA5A5",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  headerIcon: {
    marginRight: 16,
  },
});
