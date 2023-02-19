import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HEADER_DELTA, MAX_HEADER_HEIGHT} from './Constants';

interface CoverProps {
  animatedHeight: SharedValue<number>;
}

export const HEADER_HEIGHT = 280;

export function Cover(props: CoverProps): JSX.Element {
  const scrollY = props.animatedHeight;

  console.log(MAX_HEADER_HEIGHT, 'MAX_HEADER_HEIGHT');

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-MAX_HEADER_HEIGHT, 0], [4, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      transform: [{scale: scale}],
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
      <Image
        style={[styles.image]}
        source={require('./assets/Aang_at_Jasmine_Dragon.webp')}
      />
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
    height: HEADER_HEIGHT,
    backgroundColor: '#be8ebf',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
