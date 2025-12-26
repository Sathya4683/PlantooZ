import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(drawer)/(tabs)/home" />;
  }

  // If not signed in → send them into the auth flow
  return <Redirect href="/(auth)/sign-in" />;
}
