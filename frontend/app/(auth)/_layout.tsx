import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  // If already signed in → send them to protected home
  if (isSignedIn) {
    return <Redirect href="/(drawer)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // remove header/title
        contentStyle: styles.authScreen, // apply consistent bg color
      }}
    />
  );
}

const styles = StyleSheet.create({
  authScreen: {
    backgroundColor: "#0F2F1C", // same dark green as your tabs
  },
});
