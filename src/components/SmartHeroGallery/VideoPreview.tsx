import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function VideoPreviewScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const { item } = route.params; // video item from GalleryBuilder

  const [useOriginalVideo, setUseOriginalVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const posterSources = item.cdn.poster
    ? [
        item.cdn.poster.preview,
        item.cdn.poster.processed,
        item.cdn.poster.original,
      ].filter(Boolean)
    : [];

  const [posterIndex, setPosterIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* Poster (always first) */}
      {!videoFailed && posterSources.length > 0 && (
        <Image
          source={{ uri: posterSources[posterIndex] }}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          onError={() => {
            if (posterIndex < posterSources.length - 1) {
              setPosterIndex(i => i + 1);
            }
          }}
        />
      )}

      {/* Video (visual only, no touch) */}
      {!videoFailed && (
        <Video
          source={{
            uri: useOriginalVideo
              ? item.cdn.originalUrl
              : item.cdn.processedUrl,
          }}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          paused={false}
          repeat
          muted={false}
          pointerEvents="none"
          onError={() => {
            if (!useOriginalVideo) {
              setUseOriginalVideo(true);
            } else {
              setVideoFailed(true);
            }
          }}
        />
      )}

      {/* Touchable interaction layer */}
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={() => {
          if (videoFailed) {
            setVideoFailed(false);
            setUseOriginalVideo(false);
          }
        }}
      >
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Retry overlay */}
        {videoFailed && (
          <View style={styles.retryOverlay}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  retryOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 22,
  },
});
