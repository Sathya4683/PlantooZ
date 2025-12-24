import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "test" && password === "test") {
      onSuccess();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Plantooz</Text>
      <Text style={styles.subtitle}>Grow habits. Grow nature.</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login / Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Hint: use <Text style={{ fontWeight: "600" }}>test / test</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 32,
  width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#EAF7EE",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#B7E4C7",
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#1B3A2A",
    borderRadius: 12,
    padding: 14,
    color: "#EAF7EE",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#A7F3D0",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#0F2F1C",
    fontWeight: "700",
  },

  error: {
    color: "#FCA5A5",
    marginBottom: 8,
  },

  hint: {
    marginTop: 16,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
