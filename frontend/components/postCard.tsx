import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  post: {
    id: number;
    author: string;
    content: string;
    image?: any;
    likes: number;
    liked: boolean;
    comments: string[];
  };
  onLike: () => void;
  onComment: () => void;
  onImagePress?: () => void;
};

export function PostCard({ post, onLike, onComment, onImagePress }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>{post.author}</Text>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && (
        <TouchableOpacity onPress={onImagePress}>
          <Image source={post.image} style={styles.image} />
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.action} onPress={onLike}>
          <Ionicons
            name={post.liked ? "heart" : "heart-outline"}
            size={20}
            color={post.liked ? "#EF4444" : "#A7F3D0"}
          />
          <Text style={styles.count}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onComment}>
          <Ionicons name="chatbubble-outline" size={18} color="#A7F3D0" />
          <Text style={styles.count}>{post.comments.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F2F1C",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  author: {
    color: "#A7F3D0",
    fontWeight: "700",
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
    marginBottom: 10,
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
});
