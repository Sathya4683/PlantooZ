import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watering Schedule</Text>
      <View style={styles.infoBox}>
        <Text>Next watering session: Today at 6:00 PM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  infoBox: { marginTop: 20, padding: 20, backgroundColor: '#E1F5FE', borderRadius: 10 },
});