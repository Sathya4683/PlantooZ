import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    if (!isLoaded) return;

    try {
      const res = await signUp.create({
        emailAddress: email,
        password,
      });

      console.log("##################################", res);

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
      } else {
        Alert.alert("Signup not complete");
        console.log(res);
      }
    } catch (err) {
      Alert.alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#065F46"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#065F46"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* 👇 Already have an account */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>

        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

/* ─────────────────────────────
   Styles
───────────────────────────── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2F1C",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EAF7EE",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#EAF7EE",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    color: "#0F2F1C",
  },

  button: {
    backgroundColor: "#A7F3D0",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F2F1C",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: "#D1FAE5",
    marginRight: 6,
    fontSize: 14,
  },

  signInText: {
    color: "#A7F3D0",
    fontSize: 14,
    fontWeight: "bold",
  },
});
