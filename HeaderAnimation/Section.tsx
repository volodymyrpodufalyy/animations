import {PropsWithChildren} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, Text, StyleSheet} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: Colors.white}]}>{title}</Text>
      <Text style={[styles.sectionDescription, {color: Colors.light}]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
