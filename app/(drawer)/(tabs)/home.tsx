import { Screen } from "@/components/Screen";
import { Text, View } from "react-native";

export default function GardenScreen() {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>🌿 My Garden</Text>
      </View>
    </Screen>
  );
}
