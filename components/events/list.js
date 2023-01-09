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

    init = async () => {
        isLoading(true);
        let data = {
            page: page
        }
        const res = await GeneralApiData.EventList(data);
        isLoading(false);
        if (res && res.status_code == 200) {
            setEvents(res.data);
        } else {
            setEvents([]);
        }
    }
    useEffect(() => {

        init();
    }, []);
    return (
        <>

            {loading ? (<>
                <ActivityIndicator />
            </>) : (<>
                {events.map((item, key) => {
                    return (<View key={key}>
                        <EventItem event={item} navigation={props.navigation} />
                    </View>
                    )
                })}

            </>)}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    marginItem: {
        marginBottom: 10
    }
});