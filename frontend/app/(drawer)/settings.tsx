import { Screen } from "@/components/Screen";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { user } = useUser();
  const { sessionId } = useAuth();

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent. Your account will be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await user?.delete();
            } catch (err) {
              console.error("Failed to delete account:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Settings</Text>

        {/* INFO CARD */}
        <View style={styles.card}>
          <InfoRow label="User ID" value={user?.id} />
          <InfoRow
            label="Email"
            value={user?.primaryEmailAddress?.emailAddress}
          />
          <InfoRow label="Session ID" value={sessionId} />
        </View>

        {/* DANGER ZONE */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

/* ─────────────────────────────
   Reusable row
───────────────────────────── */
function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>
        {value || "—"}
      </Text>
    </View>
  );
}

/* ─────────────────────────────
   Styles
───────────────────────────── */
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#0F2F1C",
  },

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EAF7EE",
    marginBottom: 24,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#EAF7EE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },

  row: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: "#065F46",
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    color: "#0F2F1C",
  },

  dangerZone: {
    borderTopWidth: 1,
    borderTopColor: "#14532D",
    paddingTop: 24,
  },

  dangerTitle: {
    color: "#FCA5A5",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  deleteButton: {
    backgroundColor: "#7F1D1D",
    paddingVertical: 14,
    borderRadius: 10,
  },

  deleteText: {
    color: "#FECACA",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
