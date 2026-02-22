import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Video, { ViewType } from 'react-native-video';
import { styles } from './sttylesheet';

export const MediaTile = ({
  item,
  width,
  height,
  onPress,
}: {
  item: any;
  width: number;
  height: number;
  onPress: () => void;
}) => {
  const isVideo = item.type === 'video';

  const imageSources = [
    item.cdn.previewUrl,
    item.cdn.processedUrl,
    item.cdn.originalUrl,
  ].filter(Boolean);

  const [imageIndex, setImageIndex] = useState(0);

  const posterSources = item.cdn.poster
    ? [
        item.cdn.poster.preview,
        item.cdn.poster.processed,
        item.cdn.poster.original,
      ].filter(Boolean)
    : [];

  const [posterIndex, setPosterIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [useOriginalVideo, setUseOriginalVideo] = useState(false);

  return (
    <TouchableOpacity
      style={{
        width,
        height,
        borderWidth: 2,
        borderColor: '#f6b4b4',
        zIndex: 999,
      }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {!isVideo && (
        <Image
          source={{ uri: imageSources[imageIndex] }}
          style={styles.image}
          resizeMode="cover"
          onError={() => {
            if (imageIndex < imageSources.length - 1) {
              setImageIndex(i => i + 1);
            }
          }}
        />
      )}

      {isVideo && (
        <View style={StyleSheet.absoluteFill}>
          {/* Poster always visible initially */}
          {!videoFailed && posterSources.length > 0 && (
            <Image
              source={{ uri: posterSources[posterIndex] }}
              style={styles.image}
              resizeMode="cover"
              onError={() => {
                if (posterIndex < posterSources.length - 1) {
                  setPosterIndex(i => i + 1);
                }
              }}
            />
          )}

          {!videoFailed && (
            <>
              <Video
                source={{
                  uri: useOriginalVideo
                    ? item.cdn.originalUrl
                    : item.cdn.processedUrl,
                }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                //   viewType={ViewType.TEXTURE}
                //   useTextureView={true}
                pointerEvents="none"
                repeat
                muted
                paused={false}
                onError={() => {
                  if (!useOriginalVideo) {
                    setUseOriginalVideo(true);
                  } else {
                    setVideoFailed(true);
                  }
                }}
              />
              {/* Touchable overlay (interaction layer) */}
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                activeOpacity={0.9}
                onPress={onPress}
              />
            </>
          )}

          {/* Playback failed, poster + retry */}
          {videoFailed && (
            <TouchableOpacity
              style={styles.retryOverlay}
              onPress={() => {
                setVideoFailed(false);
                setUseOriginalVideo(false);
              }}
            >
              <Text style={styles.retryText}>Tap to retry</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
