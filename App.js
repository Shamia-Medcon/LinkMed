import 'react-native-gesture-handler';
import React, { Component } from 'react';
import StackNavigation from '../MedConnect/navigation/stackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaProvider>

        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}


