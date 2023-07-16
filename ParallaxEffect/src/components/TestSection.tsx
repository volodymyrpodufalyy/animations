import React from 'react';
import {PropsWithChildren} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderColor: '#545757',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#545757',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#545757',
  },
});
