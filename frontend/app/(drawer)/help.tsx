import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

/* Enable layout animation on Android */
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ---------------- Carousel Content ---------------- */

const slides = [
  {
    title: "🌱 What is Plantooz?",
    text:
      "Plantooz is a planting app where you build positive habits, grow plants, and spread green vibes with like-minded people.",
  },
  {
    title: "🤝 Communities & Social",
    text:
      "Form communities, post your planting journey, motivate others, and create a positive eco-friendly social space.",
  },
  {
    title: "🗺️ Territories & Protection",
    text:
      "Create territories on the map, protect Plantooz species, and contribute to preserving green zones around you.",
  },
  {
    title: "📷 Camera + AI Vision",
    text:
      "Use camera and computer vision to analyze plants and flowers, identify species, and learn more about nature instantly.",
  },
];

/* ---------------- FAQ Content ---------------- */

const faqs = [
  {
    q: "Is Plantooz free to use?",
    a: "Yes. Plantooz is free and focused on building a positive, sustainable ecosystem.",
  },
  {
    q: "Do I need real plants to use the app?",
    a: "No. You can start virtually, learn, and later move into real planting at your own pace.",
  },
  {
    q: "How accurate is the plant analysis?",
    a: "The AI provides helpful insights for learning, but it’s not meant for medical or agricultural diagnosis.",
  },
  {
    q: "Can I create private communities?",
    a: "Yes. You can create invite-only communities for friends, schools, or local groups.",
  },
];

/* ---------------- Screen ---------------- */

export default function HelpScreen() {
  const flatRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Screen>
      {/* ---------- Carousel ---------- */}
      <FlatList
        ref={flatRef}
        data={slides}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideText}>{item.text}</Text>
          </View>
        )}
      />

      {/* ---------- Carousel Controls ---------- */}
      <View style={styles.carouselControls}>
        {/* Left Arrow */}
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() =>
            flatRef.current?.scrollToIndex({
              index: currentIndex - 1,
              animated: true,
            })
          }
          style={[
            styles.arrowBtn,
            currentIndex === 0 && styles.arrowDisabled,
          ]}
        >
          <Ionicons name="chevron-back" size={24} color="#A7F3D0" />
        </TouchableOpacity>

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Right Arrow */}
        <TouchableOpacity
          disabled={currentIndex === slides.length - 1}
          onPress={() =>
            flatRef.current?.scrollToIndex({
              index: currentIndex + 1,
              animated: true,
            })
          }
          style={[
            styles.arrowBtn,
            currentIndex === slides.length - 1 &&
              styles.arrowDisabled,
          ]}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#A7F3D0"
          />
        </TouchableOpacity>
      </View>

      {/* ---------- FAQ Section ---------- */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleFAQ(index)}
                style={styles.faqHeader}
              >
                <Text style={styles.faqQuestion}>{item.q}</Text>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#A7F3D0"
                />
              </TouchableOpacity>

              {isOpen && (
                <Text style={styles.faqAnswer}>{item.a}</Text>
              )}
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  slide: {
    width,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingTop: 32,
  },

  slideTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#EAF7EE",
    marginBottom: 12,
  },

  slideText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#B7E4C7",
  },

  carouselControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 16,
  },

  arrowBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#1B3A2A",
  },

  arrowDisabled: {
    opacity: 0.3,
  },

  dots: {
    flexDirection: "row",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2D5A27",
  },

  dotActive: {
    width: 8,
    height: 8,
    backgroundColor: "#A7F3D0",
  },

  faqContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
  },

  faqTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#EAF7EE",
    marginBottom: 16,
  },

  faqItem: {
    backgroundColor: "#0F2F1C",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D1FAE5",
    flex: 1,
    paddingRight: 12,
  },

  faqAnswer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: "#B7E4C7",
  },
});
