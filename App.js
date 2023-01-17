import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import StackNavigation from '../MedConnect/navigation/stackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';

const App = () => {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId("f3444cff-1fc4-40d1-9dad-9e440dc25895");
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
    })
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log(notification)
    })

  })
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );

}


export default App;