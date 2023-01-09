import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/layout';
import FacultyItem from '../../components/events/faculty/item';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function FacultyScreen(props) {
    const [loading, isLoading] = useState(false);
    const [eventFaculty, setEventFaculty] = useState([]);
    const [event, setEvent] = useState(null);

    init = async () => {
        isLoading(true);
        if (event && event.id > 0) {

            const res = await GeneralApiData.EventSpeakerList(event ? event.id : 0);
            if (res && res.status_code == 200) {
                setEventFaculty(res.data);
            } else {
                setEventFaculty([]);
            }
        }
        isLoading(false);

    }
    useEffect(() => {
        setEvent(props.route.params.event);
        init();
    }, [event]);
    return (
        <>
            <Layout back={true}>
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
        fontSize: 25,
        fontFamily: "OpenSans-Bold",
        textTransform: "uppercase",
        marginVertical: 10,


    }
});