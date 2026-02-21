import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SmartHeroGallery from './src/components/SmartHeroGallery/SmartHeroGallery';

export default function App() {
  return (
    <View style={styles.container}>
      <SmartHeroGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
