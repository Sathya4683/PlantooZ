import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Modal, TextInput, Pressable } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Screen } from "@/components/Screen";

export default function PlantMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [pendingCoords, setPendingCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location is needed to mark plants.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a)) * 1000;
  };

  const handleLongPress = (e: any) => {
    if (!location) return;

    const { latitude, longitude } = e.nativeEvent.coordinate;
    const distance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      latitude,
      longitude
    );

    if (distance > 5) {
      Alert.alert("Too Far!", "You must be within 5 meters of the plant.");
      return;
    }

    setPendingCoords({ latitude, longitude });
    setModalVisible(true);
  };

  const savePlant = () => {
    if (!plantName || !pendingCoords) return;

    setPlants(prev => [
      ...prev,
      {
        id: Date.now(),
        name: plantName,
        ...pendingCoords,
      },
    ]);

    setPlantName("");
    setPendingCoords(null);
    setModalVisible(false);
  };

  return (
    <Screen>
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            onLongPress={handleLongPress}
            showsUserLocation
          >
            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={5}
              fillColor="rgba(167, 243, 208, 0.3)"
              strokeColor="#A7F3D0"
            />

            {plants.map(plant => (
              <Marker
                key={plant.id}
                coordinate={{ latitude: plant.latitude, longitude: plant.longitude }}
                title={plant.name}
                pinColor="#2D5A27"
              />
            ))}
          </MapView>
        ) : (
          <Text style={styles.loading}>Loading Map...</Text>
        )}

        {/* Add Plant Modal */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>New Plant</Text>
              <TextInput
                placeholder="Plant name"
                value={plantName}
                onChangeText={setPlantName}
                style={styles.input}
              />
              <Pressable style={styles.button} onPress={savePlant}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loading: { color: "white", textAlign: "center", marginTop: 20 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2D5A27",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
