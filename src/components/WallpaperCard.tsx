import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface WallpaperCardProps {
  id: string;
  imageUrl: string;
  quote: string;
  author: string;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ id, imageUrl, quote, author }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Generator', { wallpaperId: id })}>
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.author}>- {author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  quote: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});

export default WallpaperCard;
