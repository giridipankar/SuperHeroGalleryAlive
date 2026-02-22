import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SuperHeroGallery from './src/components/SmartHeroGallery/SuperHeroGallery';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePreview from './src/components/SmartHeroGallery/ImagePreview';
import VideoPreviewScreen from './src/components/SmartHeroGallery/VideoPreview';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: SuperHeroGallery,
    ImagePreview: ImagePreview,
    VideoPreview: VideoPreviewScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
