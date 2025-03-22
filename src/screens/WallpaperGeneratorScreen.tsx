import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

const WallpaperGeneratorScreen = () => {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1682685797275-9c3f07089e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  const [quote, setQuote] = useState<string>('The only way to do great work is to love what you do.');
  const [author, setAuthor] = useState<string>('Steve Jobs');
  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const imageRef = useRef<any>(null);

  const generateWallpaper = async () => {
    setIsGenerating(true);
    try {
      const imageResult = await ImageManipulator.manipulateAsync(
        imageUrl,
        [],
        { format: ImageManipulator.SaveFormat.PNG, compress: 1 }
      );

      const overlayedImage = await ImageManipulator.manipulateAsync(
        imageResult.uri,
        [
          { resize: { width: 1080 } },
          {
            overlay: {
              x: 0,
              y: 200,
              width: 1080,
              height: 800,
              overlay: {
                text: `${quote}\n- ${author}`,
                color: '#fff',
                fontSize: 60,
                fontStyle: 'italic',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            },
          },
        ],
        { format: ImageManipulator.SaveFormat.PNG, compress: 1 }
      );

      setGeneratedImageUri(overlayedImage.uri);
    } catch (error) {
      console.error('Error generating wallpaper:', error);
      Alert.alert('Error', 'Failed to generate wallpaper.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveWallpaper = async () => {
    if (!generatedImageUri) {
      Alert.alert('Error', 'No wallpaper to save.');
      return;
    }

    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(generatedImageUri);
        await MediaLibrary.createAlbumAsync('Motivational Wallpapers', asset, false);
        Alert.alert('Saved', 'Wallpaper saved to album!');
      } else {
        Alert.alert('Permission Denied', 'Please allow media library permissions to save the wallpaper.');
      }
    } catch (error) {
      console.error('Error saving wallpaper:', error);
      Alert.alert('Error', 'Failed to save wallpaper.');
    }
  };

  const shareWallpaper = async () => {
    if (!generatedImageUri) {
      Alert.alert('Error', 'No wallpaper to share.');
      return;
    }

    try {
      await Sharing.shareAsync(generatedImageUri);
    } catch (error) {
      console.error('Error sharing wallpaper:', error);
      Alert.alert('Error', 'Failed to share wallpaper.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <X color="#000" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Wallpaper Generator</Text>

      {generatedImageUri ? (
        <Image source={{ uri: generatedImageUri }} style={styles.image} ref={imageRef} />
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} ref={imageRef} />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Enter image URL"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quote</Text>
        <TextInput
          style={styles.input}
          value={quote}
          onChangeText={setQuote}
          placeholder="Enter quote"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Enter author"
        />
      </View>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={generateWallpaper}
        disabled={isGenerating}
      >
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>
            {isGenerating ? 'Generating...' : 'Generate Wallpaper'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {generatedImageUri && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveWallpaper}>
            <Text style={styles.buttonText}>Save Wallpaper</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={shareWallpaper}>
            <Text style={styles.buttonText}>Share Wallpaper</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  generateButton: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 5,
  },
  shareButton: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 5,
  },
});

export default WallpaperGeneratorScreen;
