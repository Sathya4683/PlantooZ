import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


const DUMMY_POSTS = [
  {
    id: 1,
    author: "Alice",
    content: "Planted my first tree today ",
    image: require("@/assets/images/tree1.jpg"),
    likes: 1,
    liked: false,
    comments: ["That’s awesome!", "Great initiative "],
  },
  {
    id: 2,
    author: "Bob",
    content: "Trees make cities cooler ",
    image: require("@/assets/images/tree2.jpg"),
    likes: 3,
    liked: false,
    comments: ["Absolutely true!", "More trees please"],
  },

  {
    id: 3,
    author: "Raj",
    content: "Planted a new guava tree today!",
    image: require("@/assets/images/tree3.jpg"),
    likes: 20,
    liked: false,
    comments: ["Nicee!", "Great Job!"],
  },
];


export default function HomeScreen() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [openComments, setOpenComments] = useState<string[] | null>(null);

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };


  return (
    <Screen>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Author */}
            <Text style={styles.author}>{item.author}</Text>

            {/* Content */}
            <Text style={styles.text}>{item.content}</Text>

            {/* Image */}
            <TouchableOpacity onPress={() => setImagePreview(item.image)}>
              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => toggleLike(item.id)}
              >
                <Ionicons
                  name={item.liked ? "heart" : "heart-outline"}
                  size={20}
                  color={item.liked ? "red" : "#A7F3D0"}
                />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.action}
                onPress={() => setOpenComments(item.comments)}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color="#A7F3D0"
                />
                <Text style={styles.actionText}>
                  {item.comments.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={!!imagePreview} transparent>
        <TouchableOpacity
          style={styles.modalBg}
          onPress={() => setImagePreview(null)}
        >
          <Image source={imagePreview} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>

      <Modal visible={!!openComments} animationType="slide">
        <View style={styles.commentsBox}>
          <Text style={styles.commentsTitle}>Comments</Text>

          {openComments?.map((c, i) => (
            <Text key={i} style={styles.comment}>
              • {c}
            </Text>
          ))}

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setOpenComments(null)}
          >
            <Text style={{ color: "#fff" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Screen>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F2F1C",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  author: {
    color: "#A7F3D0",
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: "#EAF7EE",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#EAF7EE",
  },

  /* Modal styles */
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

  commentsBox: {
    flex: 1,
    backgroundColor: "#0F2F1C",
    padding: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A7F3D0",
    marginBottom: 12,
  },
  comment: {
    color: "#EAF7EE",
    marginBottom: 8,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});