import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export function Screen({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2F1C", // 🌿 global app bg
  },
});
