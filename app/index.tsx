import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>AutoMate</Text>

      {/* TextBox */}
      <TextInput
        style={styles.textBox}
        placeholder="What would you like to do today?"
        placeholderTextColor="#BCAAA4" // Light Mocha placeholder text
      />

      {/* Button with Shadow */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Pastel Beige background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4E4B46', // Deep Charcoal accent for header
    marginBottom: 40,
  },
  textBox: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFF8E1', // Soft Cream background for the TextBox
    borderRadius: 8,
    borderColor: '#4E4B46', // Dark border to match the accent
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4E4B46', // Darker accent for the button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow blur radius for iOS
  },
  buttonText: {
    color: '#FFF', // White text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;

