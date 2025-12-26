import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";

export default function PlantMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [isProcessingPhoto, setProcessingPhoto] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isAnalyzing, setAnalyzing] = useState(false);
  
  const [pendingCoords, setPendingCoords] = useState<any>(null);
  const [bases, setBases] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a)) * 1000;
  };

  const createBase = () => {
    if (!location) return;
    if (bases.length >= 5) {
      Alert.alert("Limit Reached", "Max 5 bases allowed.");
      return;
    }

    const isOverlapping = bases.some(base => calculateDistance(base.latitude, base.longitude, location.coords.latitude, location.coords.longitude) <= base.radius);

    if (isOverlapping) {
      Alert.alert("Error", "You are already inside a base territory.");
      return;
    }

    setBases([...bases, {
      id: Date.now(),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      radius: 5,
      plantCount: 0
    }]);
  };

  const handleLongPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const targetBase = bases.find(base => calculateDistance(base.latitude, base.longitude, latitude, longitude) <= (base.radius + 2));

    if (!targetBase) {
      Alert.alert("Denied", "You must plant inside a base circle.");
      return;
    }

    setPendingCoords({ latitude, longitude, baseId: targetBase.id });
    
    if (!permission?.granted) {
      requestPermission();
    } else {
      setCameraVisible(true);
    }
  };

  const takePictureAndAnalyze = async () => {
    if (cameraRef.current && !isProcessingPhoto) {
      setProcessingPhoto(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ 
          quality: 0.7,
          base64: false 
        });
        
        setCameraVisible(false);
        setProcessingPhoto(false);
        setUploadSuccess(true);

        setTimeout(async () => {
          setUploadSuccess(false);
          setAnalyzing(true);

          try {
            const formData = new FormData();
            formData.append('image', {
              uri: photo.uri,
              name: 'plant_capture.jpg',
              type: 'image/jpeg',
            } as any);

            const response = await fetch('http://YOUR_LOCAL_IP:3000/analyze', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            const detectedName = data.suggestedName || "Unknown Plant";

            setAnalyzing(false);

            Alert.prompt("Verification Complete", `Identified: ${detectedName}. Save this plant?`, (finalName) => {
              if (finalName && pendingCoords) {
                setPlants([...plants, { id: Date.now(), name: finalName, ...pendingCoords }]);
                setBases(bases.map(b => b.id === pendingCoords.baseId ? { ...b, plantCount: b.plantCount + 1 } : b));
              }
              setPendingCoords(null);
            }, 'plain-text', detectedName);

          } catch (error) {
            setAnalyzing(false);
            Alert.alert(
              "Verification Failed",
              "Could not reach the analysis server.",
              [
                { text: "Cancel", style: "cancel", onPress: () => setPendingCoords(null) },
                { text: "Try Again", onPress: () => setCameraVisible(true) }
              ]
            );
          }
        }, 1500);

      } catch (e) {
        setProcessingPhoto(false);
        Alert.alert("Camera Error", "Failed to take photo");
      }
    }
  };

  if (isCameraVisible) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} />
        
        <View style={styles.cameraOverlay}>
          <TouchableOpacity 
            style={[styles.captureBtn, isProcessingPhoto && { opacity: 0 }]} 
            onPress={takePictureAndAnalyze}
            disabled={isProcessingPhoto}
          >
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>

        {isProcessingPhoto && (
          <View style={styles.centerLoadingOverlay}>
            <ActivityIndicator size="large" color="#A7F3D0" style={{ transform: [{ scale: 2 }] }} />
            <Text style={styles.processingText}>Processing...</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        
        {isUploadSuccess && (
          <View style={styles.overlay}>
            <Ionicons name="checkmark-circle" size={80} color="#4ADE80" />
            <Text style={styles.overlayText}>Upload Success!</Text>
            <Text style={styles.overlaySubText}>Verifying...</Text>
          </View>
        )}

        {isAnalyzing && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#A7F3D0" />
            <Text style={styles.overlayText}>Verifying Plant...</Text>
            <Text style={styles.overlaySubText}>Analyzing image data</Text>
          </View>
        )}
        
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            onLongPress={handleLongPress}
            showsUserLocation
          >
            {bases.map(base => (
              <Circle
                key={base.id}
                center={{ latitude: base.latitude, longitude: base.longitude }}
                radius={base.radius}
                fillColor="rgba(45, 90, 39, 0.3)"
                strokeColor="#2D5A27"
              />
            ))}
            {plants.map(plant => (
              <Marker key={plant.id} coordinate={{ latitude: plant.latitude, longitude: plant.longitude }}>
                <Text style={{ fontSize: 30 }}>🌱</Text>
              </Marker>
            ))}
          </MapView>
        )}

        <TouchableOpacity style={styles.fab} onPress={createBase}>
          <Ionicons name="add-circle" size={24} color="#0F2F1C" />
          <Text style={styles.fabText}>Base {bases.length}/5</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  
  fab: { 
    position: 'absolute', 
    bottom: 30, 
    right: 20, 
    backgroundColor: '#A7F3D0', 
    padding: 15, 
    borderRadius: 30, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  fabText: { color: '#0F2F1C', fontWeight: 'bold', marginLeft: 8 },

  cameraOverlay: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'transparent', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 20 
  },
  captureBtn: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 4, 
    borderColor: 'white' 
  },
  
  centerLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  processingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },

  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(15, 47, 28, 0.9)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 20 
  },
  overlayText: { 
    color: '#EAF7EE', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20 
  },
  overlaySubText: { 
    color: '#A7F3D0', 
    fontSize: 14, 
    marginTop: 8 
  },
});