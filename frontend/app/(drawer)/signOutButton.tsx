import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(); // Clerk signs user out & clears the session token :contentReference[oaicite:1]{index=1}

      // Redirect back to sign-in or welcome screen
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Error signing out:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    color: "#0f9d58",
    fontSize: 16,
    fontWeight: "bold",
  },
});
