/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Cover, HEADER_HEIGHT} from './Cover';
import {Header} from './Header';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: Colors.white}]}>{title}</Text>
      <Text style={[styles.sectionDescription, {color: Colors.light}]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
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
    <View style={{flex: 1, backgroundColor: '#272732'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.darker} />
      <Cover animatedHeight={scrollY} />
      <Header animatedHeight={scrollY} />
      <Animated.ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={scrollHandler}>
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
          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
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
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#272732',
  },
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
  sectionContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#272732',
    borderColor: '#fff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
