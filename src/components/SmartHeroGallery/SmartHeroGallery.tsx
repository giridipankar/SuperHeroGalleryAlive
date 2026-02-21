import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import Page from './Page';
import { fetchExpeienceGallery } from '../../api/Services';
import { DUMMY_DATA, PAGE_HEIGHT } from '../../common/Constant';
import { GalleryBuilder } from '../../utils/GalleryBuilder';

export default function SmartHeroGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [showNudge, setShownudge] = useState(true);

  useEffect(() => {
    // getGalleryData();
    let newData = GalleryBuilder(DUMMY_DATA, 10);
    console.log('>>>newData', newData);
    setGalleryData(newData);
  }, []);

  // const getGalleryData = async () => {
  //   try {
  //     let data: any = await fetchExpeienceGallery();
  //     console.log('>>>data', data?.data?.gallery);
  //     setGalleryData(data?.data?.gallery);
  //   } catch (err) {
  //     console.log('>>>err01', err);
  //   }
  // };

  // const getGalleryDummyData = async () => {

  // };

  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 24,
          color: '#ec6d82',
        }}
      >
        {`SmartHeroGallery`}
      </Text>
      <View
        style={{
          height: PAGE_HEIGHT,
        }}
      >
        <FlatList
          data={galleryData}
          keyExtractor={(item: any, index) => index}
          renderItem={({ item, index }) => {
            return <Page item={item} index={index} />;
          }}
          initialNumToRender={10}
          onScrollBeginDrag={() => {
            setShownudge(false);
          }}
          // onScroll={(item, index) => {}}
          onStartReached={() => {
            setShownudge(true);
          }}
          onStartReachedThreshold={0.5}
          // getItem={()}
          // pagingEnabled
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
            backgroundColor: '#fff',
          }}
        />
        {/* {showNudge && (
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
        >
          <Text style={{ fontSize: 24, color: '#ec6d82' }}>{`>`}</Text>
        </TouchableOpacity>
      )} */}
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
