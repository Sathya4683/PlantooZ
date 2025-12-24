import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Rect } from "react-native-svg";

/* ---------------- Fake Data ---------------- */

const contributions = Array.from({ length: 84 }, () =>
  Math.floor(Math.random() * 5)
);

const badges = [
  { emoji: "🌱", label: "Planter" },
  { emoji: "🔥", label: "7-Day Streak" },
  { emoji: "🌳", label: "Tree Lover" },
  { emoji: "🏆", label: "Top Gardener" },
];

const friends = [
  { id: "1", name: "Arjun" },
  { id: "2", name: "Meera" },
  { id: "3", name: "Karthik" },
];

/* ---------------- Screen ---------------- */

export default function ProfileScreen() {
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>username after clerk usage</Text>
          <Text style={styles.bio}>Planting habits. Growing futures 🌍</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Stat label="Plants" value="248" />
          <Stat label="Rank" value="#7" />
          <Stat label="Friends" value="12" />
        </View>

        {/* Contributions */}
        <Card title="Daily Growth">
          <ContributionGrid />
        </Card>

        {/* Badges */}
        <Card title="Badges Earned">
          <View style={styles.badgeGrid}>
            {badges.map((b, i) => (
              <View key={i} style={styles.badge}>
                <Text style={styles.badgeEmoji}>{b.emoji}</Text>
                <Text style={styles.badgeText}>{b.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Friends */}
        <Card title="Green Friends">
          <FlatList
            data={friends}
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
      style={[styles.iconBtn, danger && { backgroundColor: "#1B3A2A" }]}
    >
      <Ionicons name={icon} size={18} color={danger ? "#FCA5A5" : "#A7F3D0"} />
    </TouchableOpacity>
  );
}

/* ---------------- Contribution Grid ---------------- */

function ContributionGrid() {
  const size = 12;
  const gap = 4;

  return (
    <Svg height={7 * (size + gap)} width={12 * (size + gap)}>
      {contributions.map((lvl, i) => {
        const x = Math.floor(i / 7) * (size + gap);
        const y = (i % 7) * (size + gap);

        const color =
          lvl === 0
            ? "#1B3A2A"
            : lvl === 1
            ? "#2D5A27"
            : lvl === 2
            ? "#3F7D3A"
            : lvl === 3
            ? "#6FBF73"
            : "#A7F3D0";

        return (
          <Rect
            key={i}
            x={x}
            y={y}
            width={size}
            height={size}
            rx={3}
            fill={color}
          />
        );
      })}
    </Svg>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },

  header: {
    alignItems: "center",
    paddingVertical: 32,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#A7F3D0",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EAF7EE",
  },

  bio: {
    fontSize: 13,
    color: "#B7E4C7",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  stat: {
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A7F3D0",
  },

  statLabel: {
    fontSize: 12,
    color: "#B7E4C7",
  },

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

  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  badge: {
    width: "45%",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#1B3A2A",
    alignItems: "center",
  },

  badgeEmoji: {
    fontSize: 26,
  },

  badgeText: {
    marginTop: 6,
    fontSize: 12,
    color: "#D1FAE5",
  },

  friendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },

  friendName: {
    fontSize: 14,
    color: "#EAF7EE",
  },

  friendActions: {
    flexDirection: "row",
    gap: 8,
  },

  iconBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#163826",
  },
});
