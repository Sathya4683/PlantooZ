import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        screenOptions={{ 
          headerTintColor: '#2D5A27', // Green theme for Plantooz
          drawerActiveTintColor: '#2D5A27',
        }} 
      >
        {/* This "name" must match your folder name (tabs) */}
        <Drawer.Screen
          name="(tabs)" 
          options={{
            drawerLabel: 'Home Garden',
            title: 'test-plantooz',
          }}
        />
        <Drawer.Screen
          name="settings" 
          options={{
            drawerLabel: 'Settings',
            title: 'App Settings',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}