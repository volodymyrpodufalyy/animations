import React, {PropsWithChildren} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Cover} from './components/Cover';
import {ImageSourcePropType, ScrollView, StyleSheet, View} from 'react-native';
import {Header} from './components/Header';
import {HEADER_HEIGHT} from './constants';

interface ParallaxAnimationProps {
  image: ImageSourcePropType;
  coverContent: React.ReactNode | string;
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const ParallaxAnimation = (
  props: PropsWithChildren<ParallaxAnimationProps>,
) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT / 2],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <View style={{flex: 1}}>
      <Cover image={props.image} animatedHeight={scrollY} />
      <Header animatedHeight={scrollY} />
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View style={styles.cover}>
          <View style={styles.coverContainer}>
            <Animated.Text style={[styles.coverText, animatedTextStyles]}>
              {props.coverContent}
            </Animated.Text>
          </View>
        </View>
        {props.children}
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: HEADER_HEIGHT,
  },
  coverContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
