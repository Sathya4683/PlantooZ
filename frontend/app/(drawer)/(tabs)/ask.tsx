import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function Ask() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  /* ---------------- TEXT CHAT ---------------- */

  const sendTextMessage = async (prompt: string) => {
    if (!API_KEY) {
      Alert.alert("Error", "API key missing");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `
Answer in English only.
Do not use markdown.
Do not bold text.
Use simple punctuation only.

${prompt}
                    `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch {
      Alert.alert("Error", "Failed to contact Gemini");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);
    await sendTextMessage(text);
  };

  /* ---------------- IMAGE FLOW ---------------- */

  const captureAndAnalyze = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      setCameraVisible(false);
      setLoading(true);

      /* STEP 1: detect plant type */
      const detectRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `
You are an image classifier.

If the image contains a real plant,
respond ONLY with valid JSON like:
{"type":"mango-tree"}

If not a plant:
{"type":"unknown"}

No markdown.
No explanations.
English only.
                    `,
                  },
                  {
                    inlineData: {
                      data: photo.base64,
                      mimeType: "image/jpeg",
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const detectData = await detectRes.json();
      const rawText =
        detectData.candidates?.[0]?.content?.parts?.[0]?.text;

      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        throw new Error("Invalid AI response");
      }

      if (parsed.type === "unknown") {
        Alert.alert("Not a plant", "No plant detected in image.");
        setLoading(false);
        return;
      }

      const plantType = parsed.type;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Detected plant: ${plantType}`,
        },
      ]);

      /* STEP 2: facts about plant */
      await sendTextMessage(
        `Give simple facts about the plant ${plantType}.`
      );
    } catch {
      Alert.alert("Error", "Failed to analyze image");
      setLoading(false);
    }
  };

  /* ---------------- CAMERA VIEW ---------------- */

  if (cameraVisible) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} ref={cameraRef} />
        <View style={styles.cameraOverlay}>
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={captureAndAnalyze}
          >
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View style={styles.container}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chatContainer}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((m, i) => (
              <View
                key={i}
                style={[
                  styles.messageBubble,
                  m.role === "user"
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text style={styles.messageText}>{m.text}</Text>
              </View>
            ))}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#A7F3D0" />
                <Text style={styles.loadingText}>Thinking…</Text>
              </View>
            )}
          </ScrollView>

          <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#0F2F1C" }}>
            <View style={styles.inputRow}>
              <TouchableOpacity
                onPress={async () => {
                  if (!permission?.granted) {
                    await requestPermission();
                  }
                  setCameraVisible(true);
                }}
              >
                <Ionicons
                  name="camera-outline"
                  size={28}
                  color="#A7F3D0"
                />
              </TouchableOpacity>

              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask something..."
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                multiline
              />

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={sendMessage}
                disabled={loading}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1 },

  chatContainer: {
    padding: 16,
    paddingBottom: 20,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#0d1827ff",
  },

  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#1F2937",
  },

  messageText: {
    color: "white",
    fontSize: 15,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  loadingText: {
    color: "#A7F3D0",
    marginLeft: 8,
  },

  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#0F2F1C",
    alignItems: "flex-end",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 10,
    padding: 10,
    color: "white",
    maxHeight: 120,
  },

  sendBtn: {
    backgroundColor: "#A7F3D0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  sendText: {
    color: "#0F2F1C",
    fontWeight: "bold",
  },

  cameraOverlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },

  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
