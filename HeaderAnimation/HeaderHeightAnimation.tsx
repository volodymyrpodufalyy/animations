import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Cover, HEADER_HEIGHT} from './Cover';
import {Section} from './Section';
import {Header} from './Header';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const HeaderHeightAnimation = () => {
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
      <Cover animatedHeight={scrollY} />
      <Header animatedHeight={scrollY} />
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View style={styles.cover}>
          <View style={styles.artistContainer}>
            <Animated.Text style={[styles.artist, animatedTextStyles]}>
              Hello, Developers
            </Animated.Text>
          </View>
        </View>
        <Section title="Header animation">
          This animation is based on the scroll position of the ScrollView.
        </Section>
        <Section title="Stack:">
          It is using react native reanimated v2 and react native gesture
          handler
        </Section>
        <Section title="Step One">
          Edit <Text style={{fontWeight: '700'}}>App.tsx</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next
        </Section>
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: HEADER_HEIGHT,
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default HeaderHeightAnimation;
