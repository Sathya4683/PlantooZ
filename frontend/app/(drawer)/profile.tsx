import React, { useState } from "react";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";

import { ContributionGraph } from "@/components/ContributionGraph";
import { useStreak } from "@/hooks/use-streak";

/* ---------------- Screen ---------------- */

export default function ProfileScreen() {
  // TEMP: replace with auth user id later
  const userId = "3";

  const {
    heatmap,
    currentStreak,
    loading,
    logActivity,
  } = useStreak(userId);

  /* ---------------- NEW: profile posts ---------------- */

  const [posts, setPosts] = useState([
    require("@/assets/images/tree1.jpg"),
    require("@/assets/images/tree2.jpg"),
    require("@/assets/images/tree3.jpg"),
  ]);

  const [previewImage, setPreviewImage] = useState<any>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const addPost = () => {
    if (!caption.trim()) return;
    setPosts((p) => [
      require("@/assets/images/tree1.jpg"),
      ...p,
    ]);
    setCaption("");
    setCreateOpen(false);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* ---------------- EXISTING HEADER ---------------- */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>username</Text>
          <Text style={styles.bio}>Planting habits. Growing futures 🌍</Text>
        </View>

        {/* ---------------- EXISTING STATS ---------------- */}
        <View style={styles.statsRow}>
          <Stat label="Plants" value="248" />
          <Stat label="Rank" value="#7" />
          <Stat label="Friends" value="12" />
        </View>

        {/* ---------------- EXISTING STREAK ---------------- */}
        <Card title="Daily Growth">
          <View style={styles.streakRow}>
            <View>
              <Text style={styles.streakValue}>
                {currentStreak} day streak
              </Text>
              <Text style={styles.streakSub}>
                Keep growing every day
              </Text>
            </View>

            <TouchableOpacity onPress={logActivity} style={styles.logBtn}>
              <Ionicons name="leaf-outline" size={18} color="#14532D" />
              <Text style={styles.logBtnText}>Log</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator color="#4ADE80" style={{ marginVertical: 24 }} />
          ) : (
            <ContributionGraph data={heatmap} />
          )}
        </Card>

        {/* ---------------- NEW: PROFILE POSTS GRID ---------------- */}
        <Card title="Posts">
          <FlatList
            data={posts}
            numColumns={3}
            keyExtractor={(_, i) => i.toString()}
            columnWrapperStyle={{ gap: 6 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setPreviewImage(item)}>
                <Image source={item} style={styles.gridImage} />
              </TouchableOpacity>
            )}
          />
        </Card>

        {/* ---------------- EXISTING BADGES ---------------- */}
        <Card title="Badges Earned">
          <View style={styles.badgeGrid}>
            {BADGES.map((b, i) => (
              <View key={i} style={styles.badge}>
                <Text style={styles.badgeEmoji}>{b.emoji}</Text>
                <Text style={styles.badgeText}>{b.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* ---------------- EXISTING FRIENDS ---------------- */}
        <Card title="Green Friends">
          <FlatList
            data={FRIENDS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.friendRow}>
                <Text style={styles.friendName}>{item.name}</Text>
                <View style={styles.friendActions}>
                  <IconBtn icon="chatbubble-outline" />
                  <IconBtn icon="remove-circle-outline" danger />
                </View>
              </View>
            )}
          />
        </Card>
      </ScrollView>

      {/* ---------------- NEW: CREATE POST BUTTON ---------------- */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCreateOpen(true)}
      >
        <Ionicons name="add" size={28} color="#14532D" />
      </TouchableOpacity>

      {/* ---------------- NEW: CREATE POST MODAL ---------------- */}
      <Modal visible={createOpen} animationType="slide">
        <View style={styles.createBox}>
          <Text style={styles.cardTitle}>Create Post</Text>
          <TextInput
            placeholder="Write something green 🌱"
            placeholderTextColor="#9CA3AF"
            value={caption}
            onChangeText={setCaption}
            style={styles.input}
          />

          <TouchableOpacity onPress={addPost} style={styles.publishBtn}>
            <Text style={{ color: "#14532D", fontWeight: "700" }}>
              Publish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCreateOpen(false)}>
            <Text style={{ color: "#9CA3AF", marginTop: 12 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ---------------- IMAGE PREVIEW ---------------- */}
      <Modal visible={!!previewImage} transparent>
        <TouchableOpacity
          style={styles.modalBg}
          onPress={() => setPreviewImage(null)}
        >
          <Image source={previewImage} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

/* ---------------- Components ---------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function IconBtn({
  icon,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.iconBtn,
        danger && { backgroundColor: "#1B3A2A" },
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={danger ? "#FCA5A5" : "#A7F3D0"}
      />
    </TouchableOpacity>
  );
}

/* ---------------- Static Data ---------------- */

const BADGES = [
  { emoji: "🌱", label: "Planter" },
  { emoji: "🔥", label: "7-Day Streak" },
  { emoji: "🌳", label: "Tree Lover" },
  { emoji: "🏆", label: "Top Gardener" },
];

const FRIENDS = [
  { id: "1", name: "Arjun" },
  { id: "2", name: "Meera" },
  { id: "3", name: "Karthik" },
];

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { paddingBottom: 120 },

  header: { alignItems: "center", paddingVertical: 32 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#A7F3D0",
  },
  name: { fontSize: 20, fontWeight: "700", color: "#EAF7EE" },
  bio: { fontSize: 13, color: "#B7E4C7", marginTop: 4 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  statValue: { fontSize: 18, fontWeight: "700", color: "#A7F3D0" },
  statLabel: { fontSize: 12, color: "#B7E4C7" },

  card: {
    backgroundColor: "#0F2F1C",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    color: "#EAF7EE",
  },

  gridImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 6,
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#A7F3D0",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  createBox: {
    flex: 1,
    padding: 24,
    backgroundColor: "#0F2F1C",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#163826",
    borderRadius: 12,
    padding: 14,
    color: "#EAF7EE",
    marginBottom: 12,
  },

  publishBtn: {
    backgroundColor: "#A7F3D0",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "95%",
    height: "70%",
    resizeMode: "contain",
  },

  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  badge: {
    width: "45%",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#1B3A2A",
    alignItems: "center",
  },
  badgeEmoji: { fontSize: 26 },
  badgeText: { marginTop: 6, fontSize: 12, color: "#D1FAE5" },

  friendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  friendName: { fontSize: 14, color: "#EAF7EE" },
  friendActions: { flexDirection: "row", gap: 8 },
  iconBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#163826",
  },
  stat: {
    alignItems: "center",
  },
  streakRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  streakValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4ADE80",
  },

  streakSub: {
    fontSize: 12,
    color: "#86EFAC",
    marginTop: 2,
  },

  logBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#A7F3D0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  logBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#14532D",
  },

});
