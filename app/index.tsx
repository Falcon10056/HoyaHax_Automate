import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'; // Ensure correct import of Voice
import { MaterialIcons } from '@expo/vector-icons'; // Mic Icon Library

const App = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Initialize Voice Listener
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Cleanup listeners
    };
  }, []);

  // Callbacks for Voice Events
  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  // Fixing the type for event and updating text input with results
  const onSpeechResults = (event: SpeechResultsEvent) => {
    // event.value is an array, we take the first result
    const spokenText = event.value ? event.value[0] : '';
    if (spokenText) {
      setInputText(spokenText); // Update text box with speech result
    }
  };

  // Start Recording
  const startRecording = async () => {
    try {
      await Voice.start('en-US'); // Start recording with English language
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
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={isListening ? stopRecording : startRecording}
        >
          <MaterialIcons
            name={isListening ? 'mic' : 'mic-none'}
            size={24}
            color={isListening ? '#FF5722' : '#4E4B46'} // Mic icon color changes when listening
          />
        </TouchableOpacity>
      </View>

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
});

export default App;
