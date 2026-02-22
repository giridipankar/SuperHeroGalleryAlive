import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  PAGE_HEIGHT,
  Right_TILE_HEIGHT,
  Right_TILE_WIDTH,
} from '../../common/Constant';
import { useNavigation } from '@react-navigation/native';
import { styles } from './sttylesheet';
import { MediaTile } from './MediaTile';

function Page({
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

  const onLeftItemPress = useCallback(() => {
    if (leftItem.type === 'video') {
      navigation.navigate('VideoPreview', { item: leftItem });
    } else {
      navigation.navigate('ImagePreview', { item: leftItem });
    }
  }, [leftItem, navigation]);

  const onRightTopItemPress = useCallback(() => {
    navigation.navigate('ImagePreview', { item: rightTopItem });
  }, [navigation, rightTopItem]);

  const onRightBottomItemPress = useCallback(() => {
    navigation.navigate('ImagePreview', { item: rightBottomItem });
  }, [navigation, rightBottomItem]);

  return (
    <View style={styles.page} key={`page-${index}`}>
      {/* LEFT */}
      <MediaTile
        item={leftItem}
        width={Right_TILE_WIDTH}
        height={PAGE_HEIGHT}
        onPress={onLeftItemPress}
      />

      {/* RIGHT */}
      <View>
        <MediaTile
          item={rightTopItem}
          width={Right_TILE_WIDTH}
          height={Right_TILE_HEIGHT}
          onPress={onRightTopItemPress}
        />
        <MediaTile
          item={rightBottomItem}
          width={Right_TILE_WIDTH}
          height={Right_TILE_HEIGHT}
          onPress={onRightBottomItemPress}
        />
      </View>
    </View>
  );
}
export default React.memo(Page);
