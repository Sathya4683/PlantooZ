import { StyleSheet, Text, View } from "react-native";

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🛒 You are in shop component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
