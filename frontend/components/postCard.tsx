import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  post: {
    id: number;
    author: string;
    content: string;
    image?: any;
    likes: number;
    comments: number;
  };
};

export function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [imageOpen, setImageOpen] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <View style={styles.card}>
      {/* Author */}
      <Text style={styles.author}>{post.author}</Text>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Image */}
      {post.image && (
        <>
          <TouchableOpacity onPress={() => setImageOpen(true)}>
            <Image source={post.image} style={styles.image} />
          </TouchableOpacity>

          {/* Full screen image modal */}
          <Modal visible={imageOpen} transparent animationType="fade">
            <Pressable
              style={styles.modalContainer}
              onPress={() => setImageOpen(false)}
            >
              <Image source={post.image} style={styles.fullImage} />
            </Pressable>
          </Modal>
        </>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.action} onPress={toggleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "#EF4444" : "#A7F3D0"}
          />
          <Text style={styles.count}>{likes}</Text>
        </TouchableOpacity>

        <View style={styles.action}>
          <Ionicons
            name="chatbubble-outline"
            size={18}
            color="#A7F3D0"
          />
          <Text style={styles.count}>{post.comments}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F2F1C",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  author: {
    color: "#A7F3D0",
    fontWeight: "600",
    marginBottom: 6,
  },
  content: {
    color: "#EAF7EE",
    fontSize: 15,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    gap: 24,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  count: {
    color: "#EAF7EE",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
});