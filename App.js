import 'react-native-gesture-handler';
import React, { Component } from 'react';
import StackNavigation from '../MedConnect/navigation/stackNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    );
  }
}


