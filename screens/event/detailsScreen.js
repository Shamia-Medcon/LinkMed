import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GalleryImage from '../../components/common/image';
import GeneralApiData from '../../Data/GeneralApiData';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient'
import Preview from '../../components/common/preview';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


export default function EventDetails(props) {
    const navigation = useNavigation();
    const [loading, isLoading] = useState(false);
    const [rsvp_loading, isRSVPLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [event_id, setEventID] = useState(null);
    const [items, setItems] = useState([]);
    const [rsvp, setRsvp] = useState(null);
    const [open, setOpen] = useState(true);
    const bottomRef = useRef();

    const init = async () => {
        isLoading(true);
        if (event_id) {
            let res = await GeneralApiData.EventDetails(event_id);
            if (res.status_code == 200) {
                setEvent(res.data);
                if (res.data.company) {
                    Colors = JSON.parse(res.data.company?.colors)
                }
                setRsvp(res.data.rsvp);
                if (res.data.rsvp == -1) {
                    bottomRef?.current?.show();
                }

                setItems([
                    [
                        {
                            key: 0,
                            title: "Faculty",
                            icon: require('../../assets/img/faculty.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_secondary_color,
                            route: "EventFacultyScreen",
                            available: true
                        },
                        {
                            key: 1,
                            title: "Program",
                            icon: require('../../assets/img/program.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_main_color,

                            route: "EventProgramScreen",
                            available: true

                        },
                    ], [
                        {
                            key: 2,
                            title: "Sending Questions",
                            icon: require('../../assets/img/question.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_main_color,
                            route: "EventSendingQuestionScreen",
                            available: res.data.isLive

                        },
                        {
                            key: 3,
                            title: "Polling Questions",
                            icon: require('../../assets/img/polling.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_secondary_color,

                            route: "EventPollingQuestionScreen",
                            available: res.data.isLive

                        },
                    ], [
                        {
                            key: 4,
                            title: "Evaluation Feedback",
                            icon: require('../../assets/img/evaluation.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_secondary_color,
                            route: "EventEvaluationFeedbackScreen",
                            available: res.data.isLive

                        },
                        {
                            key: 5,
                            title: "Gallery",
                            icon: require('../../assets/img/gallery.png'),
                            color: Colors.white,
                            backgroundColor: Colors.linear_main_color,
                            route: "EventGalleryScreen",
                            available: res.data.isLive

                        },
                    ]

                ]);
            }
            isLoading(false);
        }
    }
    const updateRSVP = async (status) => {
        setRsvp(status);
        let data = {
            rsvp_status: status
        };
        isRSVPLoading(true);

        let res = await GeneralApiData.UpdateRSVP(event_id, data);
        if (res && res.status_code == 200) {
            isRSVPLoading(false);
            bottomRef.current.close();
            Toast.show({
                type: "success",
                text1: "Info",
                text2: "Thank you for your confirmation."
            })

        } else {
            isRSVPLoading(false);
            Toast.show({
                type: "error",
                text1: "Warning",
                text2: "Something wrong, Please try again"
            })
        }


    }
    useEffect(() => {
        setEventID(props.route.params.event);
        init();

        return () => { }
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

        return () => {

        }
    }, [])



    return (
        <>
            {loading ? (<>
                <ActivityIndicator />
            </>) : (<>
                <Layout
                    back={true}
                    headerColor={Colors.main_color}
                    secondColor={Colors.main_color}
                    textColor={Colors.white}
                    onRefresh={init}
                    refreshing={loading}
                >
                    <BottomSheet hasDraggableIcon ref={bottomRef} height={200} >
                        <Text style={styles.bottomTitle}>Please confirm</Text>
                        {rsvp_loading ? (<>
                            <ActivityIndicator />
                        </>) : (<>


                            <View style={styles.actions}>
                                <TouchableOpacity style={rsvp != 1 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                                    updateRSVP(1);
                                }}>
                                    <Text style={rsvp != 1 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Attending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={rsvp != 0 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                                    updateRSVP(0);
                                }}>
                                    <Text style={rsvp != 0 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Not Attending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={rsvp != 2 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                                    updateRSVP(2);
                                }}>
                                    <Text style={rsvp != 2 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Not Sure</Text>
                                </TouchableOpacity>
                            </View>
                        </>)}
                    </BottomSheet>

                    <>

                        {event ? (<>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[Colors.linear_main_color,  Colors.white]}>
                                <View style={styles.center}>
                                    <Text style={{ ...styles.title, ...styles._margin, color: Colors.grey_color }}>
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
                                                    ...styles.smallIcon,
                                                    tintColor: Colors.main_color
                                                }} />
                                            <View style={{ ...styles.split, backgroundColor: Colors.main_color }}>
                                            </View>
                                            <Text style={{ ...styles.time }}>
                                                {event ? event.event_start : ""}
                                            </Text>

                                        </View>

                                        <View style={{ ...styles.rowItem }}>
                                            <Image source={require('../../assets/img/time.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.smallIcon,
                                                    tintColor: Colors.main_color

                                                }} />
                                            <View style={{ ...styles.split, backgroundColor: Colors.main_color }}>
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
                                                    tintColor: Colors.main_color

                                                }} />
                                            <View style={{ ...styles.split, backgroundColor: Colors.main_color }}>
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
                            </LinearGradient>

                            <Text style={styles.description}>
                                {event ? event.description : ""}
                            </Text>
                            <TouchableOpacity style={styles.flex} activeOpacity={.9} onPress={() => {
                                bottomRef.current.show()
                            }}>
                                <View>
                                    {rsvp == 1 ? (<>
                                        <Text style={styles.rsvp}>
                                            I will attend this event
                                        </Text>
                                    </>) : (rsvp == 0 ? (<>
                                        <Text style={styles.rsvp}>
                                            I will not attend this event
                                        </Text>
                                    </>) : (
                                        rsvp == 2 ? <>
                                            <Text style={styles.rsvp}>
                                                I am not sure
                                            </Text>
                                        </> : (<>
                                            <Text style={styles.rsvp}>

                                            </Text>
                                        </>)))}
                                </View>
                                {rsvp != -1 ?
                                    <Text style={{ ...styles.rsvpChange, color: Colors.main_color, borderColor: Colors.main_color }}>
                                        Change
                                    </Text>
                                    : <>

                                        <Text style={{ ...styles.rsvpChange, color: Colors.main_color, borderColor: Colors.main_color }}>
                                            RSVP
                                        </Text>

                                    </>
                                }
                            </TouchableOpacity>


                            {items && items.map((row, key) => {
                                return (<View key={key}>
                                    <View style={styles.row}>
                                        {row.map((item, key1) => {
                                            return <LinearGradient angleCenter={{ x: 0, y: 1 }} key={key1} colors={[Colors.white, item.backgroundColor, item.backgroundColor]}>

                                                <TouchableOpacity onPressIn={() => {

                                                }} key={key1} onPress={() => {
                                                    console.log(item.available)
                                                    if (item.available) {
                                                        navigation.navigate(item.route, {
                                                            event: event,
                                                            colors: Colors
                                                        })
                                                    } else {
                                                      
                                                        Toast.show({
                                                            type: "info",
                                                            text1: "Warning",
                                                            text2: (!event.hasEnded ? "The Event will be coming soon" : "The Event has ended")
                                                        })
                                                    }
                                                }} activeOpacity={1} style={{ ...styles.col, borderColor: Colors.transparent }}>
                                                    <Image source={item.icon}
                                                        resizeMode='contain'
                                                        style={{
                                                            ...styles.icon,
                                                            tintColor: Colors.dark_grey_color

                                                        }} />
                                                    <Text style={{ ...styles._margin, ...styles.text, color: Colors.dark_grey_color }}>{item.title}</Text>
                                                </TouchableOpacity>

                                            </LinearGradient>
                                        })}
                                    </View>
                                </View>)
                            })}
                            {event && event.promo ? (<>
                                <Preview url={event.promo} open={open} setOpen={setOpen} />
                            </>) : (<></>)}
                        </>) : (<>

                        </>)}

                    </>


                </Layout>
            </>)
            }
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
        fontFamily: "OpenSans-ExtraBoldItalic",
        color: Colors.main_color,
        textAlign: 'center'
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
        paddingRight: 30,
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

    },

    rsvp: {
        width: width * .7,
        paddingHorizontal: 15,
        marginVertical: 10,
        color: Colors.grey_color,
        fontFamily: "OpenSans-BoldItalic",
        textDecorationLine: 'underline',
        textTransform: 'uppercase',

    },
    rsvpChange: {
        width: width * .25,
        fontFamily: "OpenSans-BoldItalic",
        color: Colors.grey_color,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.main_color,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10,
        fontSize: 16,

    },


    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actions: {
        marginTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTitle: {
        marginTop: 20,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.grey_color,
        fontFamily: "OpenSans-BoldItalic",

    },

    option: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        color: Colors.main_color,
        borderWidth: 1,
        borderColor: Colors.main_color,
        fontFamily: "OpenSans-BoldItalic",
    },
    selected: {
        padding: 10,
        backgroundColor: Colors.main_color,
        marginHorizontal: 5,
        borderRadius: 20,
        color: Colors.white,
        borderWidth: 1,
        borderColor: Colors.main_color,
        fontFamily: "OpenSans-BoldItalic",
    },
    rsvpTitle: {
        color: Colors.main_color,
    },
    rsvpTitleColored: {
        color: Colors.white
    },

});
