import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { use, useEffect, useRef, useState } from 'react';
import Page from './Page';
import { fetchExpeienceGallery } from '../../api/Services';
import { DUMMY_DATA, PAGE_HEIGHT, PAGE_WIDTH } from '../../common/Constant';
import { GalleryBuilder } from '../../utils/GalleryBuilder';

export default function SuperHeroGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [showNudge, setShownudge] = useState(true);
  const PageRef: any = useRef(null);

  useEffect(() => {
    getGalleryData();
  }, []);

  const getGalleryData = async () => {
    try {
      let data: any = await fetchExpeienceGallery();
      console.log('>>>data', data?.data?.gallery);
      let newData = GalleryBuilder(data?.data?.gallery, 10);
      console.log('>>>newData', newData);
      setGalleryData(newData);
    } catch (err) {
      console.log('>>>err01', err);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: '#f6b4b4', justifyContent: 'center' }}
    >
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 24,
          color: '#ec6d82',
        }}
      >
        {`SuperHeroGallery`}
      </Text>
      <View
        style={{
          height: PAGE_HEIGHT,
        }}
      >
        <FlatList
          data={galleryData}
          keyExtractor={(_, index) => index}
          renderItem={({ item, index }) => {
            return <Page item={item} index={index} />;
          }}
          ref={PageRef}
          initialNumToRender={10}
          onScrollBeginDrag={() => {
            setShownudge(false);
          }}
          onStartReached={() => {
            setShownudge(true);
          }}
          onStartReachedThreshold={0.5}
          pagingEnabled
          horizontal={true}
          style={{
            alignSelf: 'center',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#f6b4b4',
          }}
        />
        {showNudge && (
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#fff',
              borderRadius: 20,
              position: 'absolute',
              top: PAGE_HEIGHT / 2 - 16,
              right: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              alignItems: 'center',
            }}
            onPress={() => {
              PageRef.current?.scrollToOffset({
                offset: PAGE_WIDTH * 1,
                animated: true,
              });
              setShownudge(false);
            }}
          >
            <Text style={{ fontSize: 24, color: '#ec6d82' }}>{`>`}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: '700',
          color: '#ec6d82',
          marginTop: 24,
        }}
      >
        {`<<<Swipe Horizontally>>>`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
