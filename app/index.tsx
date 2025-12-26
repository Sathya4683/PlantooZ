import { Login } from "@/components/Login";
import { Screen } from "@/components/Screen";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const handleSuccess = () => {
    router.replace("/(drawer)/(tabs)/home");
  };

  return (
    <Screen>
      <View style={styles.center}>
        <Login onSuccess={handleSuccess} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
});
