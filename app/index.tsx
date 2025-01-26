import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';  // Import Expo Permissions
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'; // Ensure Voice is imported correctly

const App = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Register the event listener for speech recognition results
    Voice.onSpeechResults = onSpeechResults;

    // Request microphone permission on mount
    requestPermissions();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Request microphone and speech recognition permissions
  const requestPermissions = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant microphone access to use voice features.');
      }
    } catch (error) {
      console.error('Permission request failed', error);
    }
  };

  // Handle speech recognition results
  const onSpeechResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value[0]) {
      setInputText(event.value[0]); // Update the textbox with speech result
    }
  };

  // Start voice listening
  const startListening = () => {
    setIsListening(true);
    Voice.start('en-US');  // Start listening in English
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
  };

  // Speak the current text in the text box
  const startSpeaking = () => {
    Speech.speak(inputText, {
      language: 'en',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AutoMate</Text>

      {/* TextBox */}
      <TextInput
        style={styles.textBox}
        placeholder="What would you like to do today?"
        placeholderTextColor="#BCAAA4"
        value={inputText}
        onChangeText={setInputText}
      />

      {/* Voice Button */}
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
      </TouchableOpacity>

      {/* Speak Button */}
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={startSpeaking}
      >
        <Text style={styles.buttonText}>Speak Text</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4E4B46',
    marginBottom: 40,
  },
  textBox: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    borderColor: '#4E4B46',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 20,
  },
  voiceButton: {
    backgroundColor: '#4E4B46',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4E4B46',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default App;
