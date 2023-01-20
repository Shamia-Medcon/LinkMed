import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Appearance, StyleSheet, Dimensions, Image } from 'react-native';
import OneSignal from 'react-native-onesignal';
import ListOfEvents from '../../components/events/list';
import { Color, Dark } from '../../config/global';
import LocalStorage from '../../storage/LocalStorage';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function HomeScreen(props) {
    const navigation = useNavigation();

    useEffect(() => {
        OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
            const { action, notification } = openedEvent;
            if (notification.additionalData != undefined) {
                let target = notification.additionalData;
                switch (target.type) {
                    case "event":
                        navigation.navigate("EventDetails", {
                            event: target.id
                        })
                        break;
                    default:
                        break;
                }
            }
        })

    }, [])
    return (<>
        <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />

        <View style={styles.container}>
            <ListOfEvents navigation={props.navigation} />

            
        </View>

    </>
    );

}
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,

    },

    logoCompany: {
        height: 30
    },

  
   
    title: {
        color: Colors.main_color,
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 20,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
    },


});