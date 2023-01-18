import React, { useEffect, useState } from 'react';
import { View, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import OneSignal from 'react-native-onesignal';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function ProgramScreen(props) {
    const [loading, isLoading] = useState(false);
    const [days, setDays] = useState([]);
    const [time, setTime] = useState([]);
    const [eventAgenda, setEventAgenda] = useState([]);
    const [event, setEvent] = useState(null);

    init = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            if (props.route.params.event && props.route.params.event.id > 0) {
                const res = await GeneralApiData.EventAgendaList({}, props.route.params.event ? props.route.params.event.id : 0);
                if (res && res.status_code == 200) {
                    setDays(res.data.days);
                    setEventAgenda(res.data.agenda);
                    setTime(res.data.time)
                } else {
                    setEventAgenda([]);
                }
            }
            isLoading(false);
        }, 2000);


    }
    useEffect(() => {
        setEvent(props.route.params.event);
        init();
    }, []);
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
        <Layout back={true}>

            <View style={styles.center}>
                <Text style={styles.programTitle}>Program</Text>
            </View>
            {loading ? (<>
                <ActivityIndicator />
            </>) : (<>
                <View style={styles.program}>
                    {days.map((item, key) => {
                        return <View style={styles.split} key={key} >
                            <View style={{ ...styles.inline, }}>

                                <View style={{ ...styles.time, ...styles.center }}>
                                    <Text style={styles.timeTitle}>Day {key + 1}</Text>
                                </View>
                                <View style={{ ...styles.inline, ...styles.details }}>
                                    <Text style={styles.prefix}>{item.prefix}</Text>
                                    <Text style={styles.top}>{item.top}</Text>
                                    <Text style={styles.postfix}>{item.postfix}</Text>
                                </View>
                            </View>
                            {eventAgenda[key] && eventAgenda[key].map((agenda, key1) => {
                                return <View key={key1}>
                                    <View style={{ ...styles.inline, ...styles.item }}>

                                        <View style={{ ...styles.time, ...styles.center }}>
                                            <Text style={styles.agendaTimeTitle}>{time[key] && time[key][key1] ? time[key][key1] : ""}</Text>
                                        </View>
                                        <View style={{ ...styles.details, }}>
                                            {agenda && agenda.map((item, key2) => {
                                                return <View style={{ ...styles.verticalBorder }} key={key2}>
                                                    <Text style={styles.title}>{item.title}</Text>
                                                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                                                </View>
                                            })}
                                        </View>
                                    </View>
                                </View>
                            })}
                        </View>
                    })}
                </View>
            </>)}
        </Layout>
    );
}


const styles = StyleSheet.create({
    program: {
        flex: 1,
        flexDirection: 'column',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    programTitle: {
        color: Colors.main_color,
        fontSize: 30,
        fontFamily: "OpenSans-Bold",
        textTransform: "uppercase",
        marginVertical: 15,

    },
    split: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.main_color,
        marginVertical: 10
    },
    verticalBorder: {
        borderLeftWidth: 2,
        borderLeftColor: Colors.main_color,
        paddingLeft: 10,

    },
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    inline: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width,
    },
    top: {
        fontSize: 12,
        lineHeight: 20,
        color: Colors.grey_color,
        fontFamily: "OpenSans-Bold",
    },
    prefix: {
        fontSize: 15,
        lineHeight: 30,
        color: Colors.grey_color,
        fontFamily: "OpenSans-ExtraBold",

    },
    postfix: {
        fontSize: 15,
        lineHeight: 30,
        color: Colors.grey_color,
        fontFamily: "OpenSans-ExtraBold",
        marginHorizontal: 5
    },
    details: {
        width: Dimensions.get('screen').width * .65,

    },
    time: {
        width: Dimensions.get('screen').width * .35,
    },
    timeTitle: {
        fontSize: 15,
        color: Colors.grey_color,
        fontFamily: "OpenSans-Bold",
    },
    agendaTimeTitle: {
        fontSize: 11,
        color: Colors.grey_color,
        fontFamily: "OpenSans-Bold",
        paddingHorizontal: 2
    },
    title: {
        fontSize: 14,
        fontFamily: "OpenSans-Bold",
        color:Color.grey_color,
    },
    item: {
        paddingVertical: 10,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "OpenSans-Bold",
        color: Colors.main_color,
        marginBottom:10

    },
});