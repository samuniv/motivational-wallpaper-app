import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WallpaperCard from '../components/WallpaperCard';

const HomeScreen = () => {
  const wallpapers = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1682685797275-9c3f07089e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      quote: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1682687220202-af94a544c439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      quote: 'Believe you can and you’re halfway there.',
      author: 'Theodore Roosevelt',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1715241199933-26c946999c11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quote: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Motivational Wallpapers</Text>
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          id={wallpaper.id}
          imageUrl={wallpaper.imageUrl}
          quote={wallpaper.quote}
          author={wallpaper.author}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default HomeScreen;
