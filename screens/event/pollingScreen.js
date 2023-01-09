import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function PollingScreen(props) {
    const [loading, isLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [eventPolling, setEventPolling] = useState(null);


    const init = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            if (event && event.id != 0) {
                const res = await GeneralApiData.EventPolling(event ? event.id : 0);
                isLoading(false);
                console.log(res);
                if (res && res.status_code == 200) {
                    console.log(res.data);
                    setEventPolling(res.data);
                } else {
                    setEventPolling(null);
                }
            }
        }, 2000);
    }
    useEffect(() => {
        setEvent(props.route.params.event);
        init();
    }, [event]);
    return (
        <Layout back={true}>
            {loading ? (<>
                <ActivityIndicator />
            </>) : (<>
                {eventPolling ? (<>
                    <WebView
                        source={{ uri: eventPolling.url }}
                        style={styles.frame}
                    />
                </>) : (<></>)}

            </>)}
        </Layout>
    );
}

const styles = StyleSheet.create({
    frame: {
        marginTop: -50, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height
    }
});