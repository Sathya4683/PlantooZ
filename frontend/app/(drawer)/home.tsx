import { Screen } from "@/components/Screen";
import { PostCard } from "@/components/postCard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Alice",
    content: "Planted my first tree today 🌱",
    image: require("@/assets/images/tree1.jpg"),
    likes: 1,
    liked: false,
    comments: ["That’s awesome!"],
  },
  {
    id: 2,
    author: "Bob",
    content: "Trees make cities cooler 🌳",
    image: require("@/assets/images/tree2.jpg"),
    likes: 3,
    liked: false,
    comments: [],
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [imagePreview, setImagePreview] = useState<any>(null);

  const [commentModal, setCommentModal] = useState<any>(null);
  const [commentText, setCommentText] = useState("");

  const [createModal, setCreateModal] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<any>(null);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const addComment = () => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === commentModal.id
          ? { ...p, comments: [...p.comments, commentText] }
          : p
      )
    );
    setCommentText("");
    setCommentModal(null);
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled) setNewPostImage({ uri: res.assets[0].uri });
  };

  const createPost = () => {
    setPosts((prev) => [
      {
        id: Date.now(),
        author: "You",
        content: newPostText,
        image: newPostImage,
        likes: 0,
        liked: false,
        comments: [],
      },
      ...prev,
    ]);
    setNewPostText("");
    setNewPostImage(null);
    setCreateModal(false);
  };

  return (
    <Screen>
      {/* Create Post Button */}
      <TouchableOpacity style={styles.createBtn} onPress={() => setCreateModal(true)}>
        <Ionicons name="add-circle" size={22} color="#A7F3D0" />
        <Text style={{ color: "#A7F3D0" }}>Create Post</Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => toggleLike(item.id)}
            onComment={() => setCommentModal(item)}
            onImagePress={() => setImagePreview(item.image)}
          />
        )}
      />

      {/* Image Preview */}
      <Modal visible={!!imagePreview} transparent>
        <TouchableOpacity style={styles.modalBg} onPress={() => setImagePreview(null)}>
          <Image source={imagePreview} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>

      {/* Comments Modal */}
      <Modal visible={!!commentModal} animationType="slide">
        <View style={styles.commentsBox}>
          <Text style={styles.commentsTitle}>Comments</Text>

          {commentModal?.comments.map((c: string, i: number) => (
            <Text key={i} style={styles.comment}>• {c}</Text>
          ))}

          <TextInput
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.input}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={addComment}>
            <Text style={{ color: "#fff" }}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Create Post Modal */}
      <Modal visible={createModal} animationType="slide">
        <View style={styles.commentsBox}>
          <Text style={styles.commentsTitle}>New Post</Text>

          <TextInput
            placeholder="What's growing today?"
            value={newPostText}
            onChangeText={setNewPostText}
            style={styles.input}
          />

          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "#A7F3D0", marginVertical: 8 }}>
              + Add Image (optional)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={createPost}>
            <Text style={{ color: "#fff" }}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  createBtn: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#163826",
    color: "#EAF7EE",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  closeBtn: {
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
