import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  PAGE_HEIGHT,
  Right_TILE_HEIGHT,
  Right_TILE_WIDTH,
} from '../../common/Constant';

export default function Page({
  item,
  index,
}: {
  item: {
    leftItem: any;
    rightTopItem: any;
    rightBottomItem: any;
  };
  index: number;
}) {
  const { leftItem, rightTopItem, rightBottomItem } = item;

  return (
    <View
      style={{
        flexDirection: 'row',
        height: PAGE_HEIGHT,
      }}
      key={`page-${index}`}
    >
      {/* LEFT COLUMN (Hero Tile) */}
      <TouchableOpacity
        style={{
          width: Right_TILE_WIDTH,
          height: PAGE_HEIGHT,
          borderWidth: 1.5,
          borderColor: '#f9e5e5',
          borderRadius: 10,
        }}
        activeOpacity={0.9}
        key={`Item-${leftItem._id}`}
      >
        <Image
          source={{
            uri: leftItem.cdn.originalUrl,
          }}
          alt={leftItem.alt}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* RIGHT COLUMN */}
      <View>
        <TouchableOpacity
          style={{
            width: Right_TILE_WIDTH,
            height: Right_TILE_HEIGHT,
            borderWidth: 1.5,
            borderColor: '#f9e5e5',
            borderRadius: 10,
          }}
          activeOpacity={0.9}
          key={`Item-${rightTopItem._id}`}
        >
          <Image
            source={{ uri: rightTopItem.cdn.originalUrl }}
            alt={rightTopItem.alt}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: Right_TILE_WIDTH,
            height: Right_TILE_HEIGHT,
            borderWidth: 1.5,
            borderColor: '#f9e5e5',
            borderRadius: 10,
          }}
          activeOpacity={0.9}
          key={`Item-${rightBottomItem._id}`}
        >
          <Image
            source={{ uri: rightBottomItem.cdn.originalUrl }}
            alt={rightBottomItem.alt}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
