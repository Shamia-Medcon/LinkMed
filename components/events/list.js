import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Appearance, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
import ProgressBarLoading from '../common/ProgressBar';
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
                    <Text style={styles.noItems}>Coming soon</Text>
                </>)}


            </>)}
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        height: Dimensions.get('screen').height,

    },

    marginItem: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: Color.white,


    },

});