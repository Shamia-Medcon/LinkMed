import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import Layout from '../../components/common/layout';
import FacultyItem from '../../components/events/faculty/item';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

export default function FacultyScreen(props) {
    const [loading, isLoading] = useState(false);
    const [eventFaculty, setEventFaculty] = useState([]);
    const [event, setEvent] = useState(null);

    const init = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            if (event && event.id > 0) {

                const res = await GeneralApiData.EventSpeakerList(event ? event.id : 0);
                if (res && res.status_code == 200) {
                    setEventFaculty(res.data);
                } else {
                    setEventFaculty([]);
                }
                isLoading(false);
            } else {
                isLoading(false);

            }
        }, 2000);

    }
    useEffect(() => {
        setEvent(props.route.params.event);
        init();
    }, [event]);
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
    return (
        <>
            <Layout back={true} onRefresh={init} refreshing={loading}>
                <View style={styles.center}>
                    <Text style={styles.facultyTitle}>Faculty</Text>
                </View>
                {loading ? (<>
                    <ActivityIndicator />
                </>) : (<>
                    <View style={styles.faculty}>
                        {eventFaculty.map((item, key) => {
                            return <View key={key}>
                                <FacultyItem item={item} />
                            </View>
                        })}
                    </View>
                </>
                )}
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    faculty: {
        flex: 1,
        width: Dimensions.get('screen').width,
    },
    facultyTitle: {
        color: Colors.main_color,
        fontSize: aspectRatio > 1.6 ? 25 : 28,
        fontFamily: "OpenSans-Bold",
        textTransform: "uppercase",
        marginVertical: 10,


    }
});