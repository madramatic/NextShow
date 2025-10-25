import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import theme from '../../../../core/theme';

type Props = {
  title: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  width?: number;
  height?: number;
};

const GenreCard: React.FC<Props> = ({ title, image, onPress, width = 160, height = 100 }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.container, { width, height, opacity: pressed ? 0.8 : 1 }]}
    accessibilityRole="button"
    accessibilityLabel={`Open ${title}`}
  >
    <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
      <View style={styles.overlay} />
      <View style={styles.labelWrap}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
    </ImageBackground>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: theme.colors.lightGray,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  labelWrap: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
});

export default GenreCard;
