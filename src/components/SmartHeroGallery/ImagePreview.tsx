import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ImagePreview(props: any) {
  const item = props.route.params.item;
  const navigation: any = useNavigation();
  console.log('>>>item', item.cdn.originalUrl);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 20,
          position: 'absolute',
          top: 10,
          left: 16,
          paddingHorizontal: 10,
          zIndex: 999,
        }}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: '#fff',
          }}
        >{`<`}</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: item.cdn.originalUrl }}
        alt={item.alt}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
