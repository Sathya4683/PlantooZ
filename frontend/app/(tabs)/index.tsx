import { View, Text } from 'react-native';

export default function GardenScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🌿 My Garden</Text>
    </View>
  );
}