import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HEADER_DELTA, HEADER_HEIGHT} from '../constants';

interface CoverProps {
  image: ImageSourcePropType;
  animatedHeight: SharedValue<number>;
}

export function Cover(props: CoverProps) {
  const scrollY = props.animatedHeight;

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-HEADER_HEIGHT, 0], [4, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: scale}],
      height,
    };
  });

  const animatedWrapperStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [-64, 0, HEADER_DELTA],
      [0, 0.1, 1],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Image style={[styles.image]} source={props.image} />
      <Animated.View
        style={[
          {...StyleSheet.absoluteFillObject, backgroundColor: '#272732'},
          animatedWrapperStyles,
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
