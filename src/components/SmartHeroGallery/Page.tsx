import React from 'react';
import { View } from 'react-native';
import {
  PAGE_HEIGHT,
  Right_TILE_HEIGHT,
  Right_TILE_WIDTH,
} from '../../common/Constant';
import { useNavigation } from '@react-navigation/native';
import { styles } from './sttylesheet';
import { MediaTile } from './MediaTile';

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
  const navigation: any = useNavigation();

  return (
    <View style={styles.page} key={`page-${index}`}>
      {/* LEFT */}
      <MediaTile
        item={leftItem}
        width={Right_TILE_WIDTH}
        height={PAGE_HEIGHT}
        onPress={() => {
          console.log('leftItem', leftItem);
          if (leftItem.type === 'video') {
            navigation.navigate('VideoPreview', { item: leftItem });
          } else {
            navigation.navigate('ImagePreview', { item: leftItem });
          }
        }}
      />

      {/* RIGHT */}
      <View>
        <MediaTile
          item={rightTopItem}
          width={Right_TILE_WIDTH}
          height={Right_TILE_HEIGHT}
          onPress={() =>
            navigation.navigate('ImagePreview', { item: rightTopItem })
          }
        />
        <MediaTile
          item={rightBottomItem}
          width={Right_TILE_WIDTH}
          height={Right_TILE_HEIGHT}
          onPress={() =>
            navigation.navigate('ImagePreview', { item: rightBottomItem })
          }
        />
      </View>
    </View>
  );
}
