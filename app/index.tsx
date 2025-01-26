import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { MaterialIcons } from '@expo/vector-icons';
import 'expo-dev-client';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [responseText, setResponseText] = useState(''); // New state to hold the response

  // Initialize Voice Listener
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Callbacks for Voice Events
  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event) => {
    const spokenText = event.value[0];
    setInputText(spokenText);
  };

  // Start Recording
  const startRecording = async () => {
    try {
      await Voice.start('en-US'); // Specify the language
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  // Stop Recording
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  // Send request to Reqres
  const sendToReqres = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          job: 'Developer',
        }),
      });
      const data = await response.json();
      console.log('Response from Reqres:', data);
      setResponseText(`Message: ${data.text}, Job: ${data.job}`); // Display the response below the button
      alert('Data sent to Reqres successfully!');
    } catch (error) {
      console.error('Error sending data to Reqres:', error);
      alert('Failed to send data to Reqres.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AutoMate</Text>

      {/* TextBox and Voice Button */}
      <View style={styles.textBoxContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="What would you like to do today?"
          placeholderTextColor="#BCAAA4"
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Voice Button */}
        <TouchableOpacity style={styles.voiceButton} onPress={isListening ? stopRecording : startRecording}>
          <MaterialIcons
            name={isListening ? 'mic' : 'mic-none'}
            size={24}
            color={isListening ? '#FF5722' : '#4E4B46'} // Mic icon color changes when listening
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={sendToReqres}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Display Response below the Submit Button */}
      {responseText ? <Text style={styles.responseText}>{responseText}</Text> : null}
    </View>
  );
};

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
  textBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  textBox: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF8E1', // Soft Cream background for the TextBox
    borderRadius: 8,
    borderColor: '#4E4B46', // Dark border to match the accent
    borderWidth: 1,
    fontSize: 16,
  },
  voiceButton: {
    marginLeft: 10,
    backgroundColor: '#FFF8E1', // Same background as TextBox
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4E4B46', // Matches TextBox border
    borderWidth: 1,
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
  responseText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4E4B46', // Deep Charcoal text color
  },
});

export default App;
