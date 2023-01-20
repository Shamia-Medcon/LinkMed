import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Appearance, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
import ProgressBarLoading from '../common/ProgressBar';
import Layout from '../../components/common/layout';
import EventItem from './item';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function ListOfEvents(props) {
    const [loading, isLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [events, setEvents] = useState([]);
    useEffect(() => {

        init();
    }, []);
    const init = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            let data = {
                page: page
            }
            const res = await GeneralApiData.EventList(data);
            isLoading(false);
            if (res && res.status_code == 200) {
                setEvents(res.data);
                setPage(page + 1);
            } else {
                setEvents([]);
            }
        }, 2000);
    }

    return (
        <>
            <Layout onRefresh={init} refreshing={loading}>
                <View style={{ ...styles.center, ...styles.lists }}>
                    <Text style={styles.title}>My Events</Text>

                    {loading ? (<>
                        <ActivityIndicator />
                    </>) : (<>
                        {events && events.length > 0 ? (<>
                            {events.length > 0 && events.map((item, key) => {
                                return (<View key={key} style={styles.item}>
                                    <EventItem event={item} navigation={props.navigation} />
                                </View>
                                )
                            })}
                        </>) : (<>
                            <View style={styles.content}>
                                <Text style={styles.noItems}>Coming soon</Text>
                            </View>
                        </>)}


                    </>)}
                </View>
            </Layout>
        </>

    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        height: Dimensions.get('screen').height,

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
    content: {
        flex: 1,
        height: Dimensions.get('screen').height * .8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItems: {
        color: Colors.grey_color,
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 14,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',

    },

    marginItem: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: Color.white,


    },

});