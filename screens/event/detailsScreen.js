import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GalleryImage from '../../components/common/image';
import GeneralApiData from '../../Data/GeneralApiData';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-toast-message';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


export default function EventDetails(props) {
    const navigation = useNavigation();
    const [loading, isLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [event_id, setEventID] = useState(null);
    const [items, setItems] = useState([]);
    const init = async () => {
        isLoading(true);
        if (event_id) {
            let res = await GeneralApiData.EventDetails(event_id);
            if (res.status_code == 200) {
                setEvent(res.data);
                setItems([
                    [
                        {
                            key: 0,
                            title: "Faculty",
                            icon: require('../../assets/img/faculty.png'),
                            color: Colors.main_color,
                            route: "EventFacultyScreen",
                            available: true
                        },
                        {
                            key: 1,
                            title: "Program",
                            icon: require('../../assets/img/program.png'),
                            color: Colors.main_color,
                            route: "EventProgramScreen",
                            available: true

                        },
                    ], [
                        {
                            key: 2,
                            title: "Sending Questions",
                            icon: require('../../assets/img/question.png'),
                            color: Colors.main_color,
                            route: "EventSendingQuestionScreen",
                            available: res.data.isLive

                        },
                        {
                            key: 3,
                            title: "Polling Questions",
                            icon: require('../../assets/img/polling.png'),
                            color: Colors.main_color,
                            route: "EventPollingQuestionScreen",
                            available: res.data.isLive

                        },
                    ], [
                        {
                            key: 4,
                            title: "Evaluation Feedback",
                            icon: require('../../assets/img/evaluation.png'),
                            color: Colors.main_color,
                            route: "EventEvaluationFeedbackScreen",
                            available: res.data.isLive

                        },
                        {
                            key: 5,
                            title: "Gallery",
                            icon: require('../../assets/img/gallery.png'),
                            color: Colors.main_color,
                            route: "EventGalleryScreen",
                            available: res.data.isLive

                        },
                    ]
                ]);
            }
            isLoading(false);
        }
    }
    useEffect(() => {
        setEventID(props.route.params.event);
        init();
    }, [event_id]);
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

                {loading ? (<>
                    <ActivityIndicator />
                </>) : (<>
                    <>
                        {event ? (<>
                            <View>
                                <View style={styles.center}>
                                    <Text style={{ ...styles.title, ...styles._margin }}>
                                        {event.title}
                                    </Text>
                                </View>
                                <View style={styles.rowItem}>
                                    <View style={styles.colItem}>

                                        <GalleryImage defaultStyle={{
                                            ...styles.logo,
                                            ...styles.center,
                                        }} url={event.logo} size={"contain"} />
                                    </View>
                                    <View style={styles.colItem}>
                                        <View style={{ ...styles.rowItem }}>
                                            <Image source={require('../../assets/img/date.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.smallIcon
                                                }} />
                                            <View style={{ ...styles.split }}>
                                            </View>
                                            <Text style={{ ...styles.time }}>
                                                {event ? event.event_start : ""}
                                            </Text>

                                        </View>

                                        <View style={{ ...styles.rowItem }}>
                                            <Image source={require('../../assets/img/time.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.smallIcon
                                                }} />
                                            <View style={{ ...styles.split }}>
                                            </View>
                                            <Text style={{ ...styles.time }}>
                                                {event ? event.time : ""}
                                            </Text>
                                        </View>
                                        <View style={{ ...styles.rowItem }}>
                                            <Image source={require('../../assets/img/location.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.smallIcon,
                                                }} />
                                            <View style={{ ...styles.split }}>
                                            </View>
                                            <TouchableOpacity activeOpacity={.9} onPress={() => {
                                                Linking.openURL(event.location);

                                            }}>
                                                <Text style={{ ...styles.location }}>
                                                    {event ? event.address : ""}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.description}>
                                    {event ? event.description : ""}
                                </Text>
                            </View>

                            {items && items.map((row, key) => {
                                return (<View key={key}>
                                    <View style={styles.row}>
                                        {row.map((item, key1) => {
                                            return <View key={key1}>
                                                <TouchableOpacity key={key1} onPress={() => {
                                                    if (item.available) {
                                                        navigation.navigate(item.route, {
                                                            event: event
                                                        })
                                                    } else {

                                                        Toast.show({
                                                            type: "info",
                                                            text1: "Warning",
                                                            text2: event.title + (!item.hasEnded ? " will be coming soon" : " has ended")
                                                        })

                                                    }
                                                }} activeOpacity={1} style={styles.col}>
                                                    <Image source={item.icon}
                                                        resizeMode='contain'
                                                        style={{
                                                            ...styles.icon
                                                        }} />
                                                    <Text style={{ ...styles._margin, ...styles.text }}>{item.title}</Text>
                                                </TouchableOpacity>

                                            </View>
                                        })}
                                    </View>
                                </View>)
                            })}

                        </>) : (<>

                        </>)}

                    </>

                </>)
                }
            </Layout>
            <Toast />

        </>
    );
}
const styles = StyleSheet.create({

    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontSize: aspectRatio > 1.6 ? 14 : 18,
        marginHorizontal: 15,
        marginVertical: 10,
        fontFamily: "OpenSans-Regular",
        color: Colors.grey_color
    },
    title: {
        fontSize: aspectRatio > 1.6 ? 20 : 25,
        marginHorizontal: 15,
        fontFamily: "OpenSans-ExtraBold",
        color: Colors.main_color,
        textAlign:'center'
    },
    time: {
        fontSize: aspectRatio > 1.6 ? 12 : 16,
        paddingLeft: 5,
        paddingRight: 10,
        fontFamily: "OpenSans-BoldItalic",
        color: Colors.grey_color
    },
    location: {
        fontSize: aspectRatio > 1.6 ? 12 : 16,
        paddingLeft: 5,
        paddingRight: 10,
        fontFamily: "OpenSans-BoldItalic",
        color: Colors.grey_color,
    },
    row: {
        flexDirection: "row",
        borderColor: Colors.main_color,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    start: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center'
    },
    col: {
        flexDirection: 'column',
        width: Dimensions.get('screen').width * .48,
        height: Dimensions.get('screen').width * .48,
        borderWidth: 2,
        borderColor: Colors.main_color,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    smallIcon: {
        width: 30,
        height: 30,
    },
    icon: {
        height: 80,
    },
    logo: {
        height: 80,
        width: Dimensions.get('screen').width * .5,
    },
    Icons: {
        width: "25%",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    _margin: {
        marginVertical: 10,
        marginHorizontal: 15,

    },
    leftBorder: {
        borderLeftWidth: 2,
        borderLeftColor: Colors.main_color
    },
    split: {
        width: 2,
        height: "100%",
        marginHorizontal: 10,
        backgroundColor: Colors.main_color
    },
    text: {
        color: Colors.main_color,
        textTransform: 'uppercase',
        fontFamily: "OpenSans-ExtraBold",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: aspectRatio > 1.6 ? 16 : 20,

    },
    rowItem: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width * .41,
        alignContent: 'center',
        paddingVertical: 5,
        paddingEnd: 5
    },
    colItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    }
});
