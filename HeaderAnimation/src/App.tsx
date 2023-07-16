import React from 'react';
import {Text} from 'react-native';
import {
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Section} from './components/TestSection';
import {ParallaxAnimation} from './ParallaxEffectAnimation';

const App = () => {
  return (
    <ParallaxAnimation
      image={require('../assets/Aang_at_Jasmine_Dragon.webp')}
      coverContent="Hello, developers👋">
      <Section title="Header animation">
        This animation is based on the scroll position of the ScrollView.
      </Section>
      <Section title="Stack:">
        It is using react native reanimated v2 and react native gesture handler
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
    </ParallaxAnimation>
  );
};

export default App;
