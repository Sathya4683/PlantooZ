import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false, // HIDE this header so you only see the Drawer's header
        tabBarActiveTintColor: '#2D5A27',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Garden',
          tabBarIcon: ({ color }) => <Ionicons name="leaf" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Watering',
          tabBarIcon: ({ color }) => <Ionicons name="water" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}