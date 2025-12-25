// import React from "react";
// import { Screen } from "@/components/Screen";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { ContributionGraph } from "@/components/ContributionGraph";
// import { useStreak } from "@/hooks/use-streak";

// /* ---------------- Screen ---------------- */

// export default function ProfileScreen() {
//   // TEMP: hardcoded userId (replace with auth later)
//   const userId = "1";

//   // Hook MUST be inside component
//   const { heatmap, logActivity } = useStreak(userId);

//   return (
//     <Screen>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <Image
//             source={{ uri: "https://i.pravatar.cc/300" }}
//             style={styles.avatar}
//           />
//           <Text style={styles.name}>username</Text>
//           <Text style={styles.bio}>Planting habits. Growing futures 🌍</Text>
//         </View>

//         {/* Stats */}
//         <View style={styles.statsRow}>
//           <Stat label="Plants" value="248" />
//           <Stat label="Rank" value="#7" />
//           <Stat label="Friends" value="12" />
//         </View>

//         {/* Contributions / Streak */}
//         <Card title="Daily Growth">
//           {/* Test button — remove later */}
//           <TouchableOpacity
//             onPress={logActivity}
//             style={{ marginBottom: 10 }}
//           >
//             <Text style={{ color: "#40c463" }}>
//               + Log Activity (Test)
//             </Text>
//           </TouchableOpacity>

//           <ContributionGraph data={heatmap} />
//         </Card>

//         {/* Badges */}
//         <Card title="Badges Earned">
//           <View style={styles.badgeGrid}>
//             {BADGES.map((b, i) => (
//               <View key={i} style={styles.badge}>
//                 <Text style={styles.badgeEmoji}>{b.emoji}</Text>
//                 <Text style={styles.badgeText}>{b.label}</Text>
//               </View>
//             ))}
//           </View>
//         </Card>

//         {/* Friends */}
//         <Card title="Green Friends">
//           <FlatList
//             data={FRIENDS}
//             keyExtractor={(i) => i.id}
//             renderItem={({ item }) => (
//               <View style={styles.friendRow}>
//                 <Text style={styles.friendName}>{item.name}</Text>
//                 <View style={styles.friendActions}>
//                   <IconBtn icon="chatbubble-outline" />
//                   <IconBtn icon="remove-circle-outline" danger />
//                 </View>
//               </View>
//             )}
//           />
//         </Card>
//       </ScrollView>
//     </Screen>
//   );
// }

// /* ---------------- Components ---------------- */

// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <View style={styles.stat}>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>{title}</Text>
//       {children}
//     </View>
//   );
// }

// function IconBtn({
//   icon,
//   danger,
// }: {
//   icon: keyof typeof Ionicons.glyphMap;
//   danger?: boolean;
// }) {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.iconBtn,
//         danger && { backgroundColor: "#1B3A2A" },
//       ]}
//     >
//       <Ionicons
//         name={icon}
//         size={18}
//         color={danger ? "#FCA5A5" : "#A7F3D0"}
//       />
//     </TouchableOpacity>
//   );
// }

// /* ---------------- Fake Static Data ---------------- */

// const BADGES = [
//   { emoji: "🌱", label: "Planter" },
//   { emoji: "🔥", label: "7-Day Streak" },
//   { emoji: "🌳", label: "Tree Lover" },
//   { emoji: "🏆", label: "Top Gardener" },
// ];

// const FRIENDS = [
//   { id: "1", name: "Arjun" },
//   { id: "2", name: "Meera" },
//   { id: "3", name: "Karthik" },
// ];

// /* ---------------- Styles ---------------- */

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 24,
//   },

//   header: {
//     alignItems: "center",
//     paddingVertical: 32,
//   },

//   avatar: {
//     width: 96,
//     height: 96,
//     borderRadius: 48,
//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: "#A7F3D0",
//   },

//   name: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#EAF7EE",
//   },

//   bio: {
//     fontSize: 13,
//     color: "#B7E4C7",
//     marginTop: 4,
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 24,
//   },

//   stat: {
//     alignItems: "center",
//   },

//   statValue: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#A7F3D0",
//   },

//   statLabel: {
//     fontSize: 12,
//     color: "#B7E4C7",
//   },

//   card: {
//     backgroundColor: "#0F2F1C",
//     borderRadius: 18,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },

//   cardTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     marginBottom: 12,
//     color: "#EAF7EE",
//   },

//   badgeGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },

//   badge: {
//     width: "45%",
//     padding: 14,
//     borderRadius: 14,
//     backgroundColor: "#1B3A2A",
//     alignItems: "center",
//   },

//   badgeEmoji: {
//     fontSize: 26,
//   },

//   badgeText: {
//     marginTop: 6,
//     fontSize: 12,
//     color: "#D1FAE5",
//   },

//   friendRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 6,
//   },

//   friendName: {
//     fontSize: 14,
//     color: "#EAF7EE",
//   },

//   friendActions: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   iconBtn: {
//     padding: 8,
//     borderRadius: 10,
//     backgroundColor: "#163826",
//   },
// });
import React from "react";
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
          <Text style={styles.name}>username</Text>
          <Text style={styles.bio}>Planting habits. Growing futures 🌍</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Stat label="Plants" value="248" />
          <Stat label="Rank" value="#7" />
          <Stat label="Friends" value="12" />
        </View>

        {/* Contributions / Streak */}
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

            {/* TEMP dev button — remove when activity logging is automatic */}
            <TouchableOpacity
              onPress={logActivity}
              style={styles.logBtn}
            >
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

        {/* Badges */}
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

        {/* Friends */}
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

/* ---------------- Fake Static Data ---------------- */

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
