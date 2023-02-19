import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HEADER_HEIGHT} from './Cover';

interface HeaderProps {
  animatedHeight: SharedValue<number>;
}

export function Header(props: HeaderProps): JSX.Element {
  const scrollY = props.animatedHeight;

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, HEADER_HEIGHT - 60],
      ['transparent', 'white'],
    );
    return {backgroundColor};
  });

  return (
    <>
      <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Home</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Profile</Text>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingTop: 40,
    height: 100,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    zIndex: 5,
  },
  text: {
    fontSize: 12,
  },
  textContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
