import React, { Component } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/main/homeScreen";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/account/loginScreen";
import RegisterScreen from "../screens/account/registerScreen";
import DBConnect from "../storage/DBConnect";
import LocalStorage from "../storage/LocalStorage";
import BottomNavigation from "./bottomNavigation";
import GalleryScreen from "../screens/event/galleryScreen";
import { CameraScreen } from "react-native-camera-kit";
import EventDetails from "../screens/event/detailsScreen";
import FacultyScreen from "../screens/event/facultyScreen";
import FeedBackScreen from "../screens/event/feedbackScreen";
import SendingQuestionScreen from "../screens/event/questionScreen";
import PollingScreen from "../screens/event/pollingScreen";
import ProgramScreen from "../screens/event/programScreen";

const Stack = createNativeStackNavigator();
export default class StackNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { user } = this.state;
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }} />

          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, gestureEnabled: false }} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="Home" component={BottomNavigation} options={{ headerShown: false, gestureEnabled: false }} />

            {/* Event Route */}
            <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventFacultyScreen" component={FacultyScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventProgramScreen" component={ProgramScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventSendingQuestionScreen" component={SendingQuestionScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventPollingQuestionScreen" component={PollingScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventEvaluationFeedbackScreen" component={FeedBackScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="EventGalleryScreen" component={GalleryScreen} options={{ headerShown: false, gestureEnabled: false }} />





            {/* Open Camera */}
            <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false, gestureEnabled: false }} />
          </Stack.Group>

        </Stack.Navigator>
      </>
    );
  }
}
