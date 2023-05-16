import React, { useEffect, useRef, useState } from 'react';
import { Appearance, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/layout';
import RSVP from '../../components/common/rsvp';
import SearchBar from '../../components/common/searchbar';
import ComponentEvent from '../../components/events/component.event';
import EventItem from '../../components/events/item';
import { Color } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
import LocalStorage from '../../storage/LocalStorage';
import Toast from 'react-native-toast-message';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

function SearchScreen(props) {

    const [loading, isLoading] = useState(false);
    const [searchLoading, isSearchLoading] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [event, setEvent] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [user, setUser] = useState(null);
    const [rsvp, setRsvp] = useState(-1);
    const [rsvp_loading, isRSVPLoading] = useState(false);
    const bottomRef = useRef();

    useEffect(() => {
        setSearchPhrase(props.route.params.searchPhrase);

        init();


        return () => {

            isSearchLoading(false);
        };
    }, [searchPhrase]);

    const init = async () => {
        let user = await LocalStorage.getData('user');
        if (user) {
            setUser(user);
        }
        isSearchLoading(true);
        try {
            //EventByCode
            if (searchPhrase.trim() != "") {

                const res = await GeneralApiData.EventByCode(searchPhrase);
                isSearchLoading(false);
                if (res && res.status_code == 200) {
                    setEvent(res.data);
                    setRsvp(res.data?.rsvp)
                } else {
                    setEvent(null);
                }
            }
        } catch (e) {
            console.log(e)
            Toast.show({
                type: "error",
                text1: "Warning",
                text2: "Something wrong, Please try again"
            })

            isSearchLoading(false);
        }
    }

    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />
            <Layout back={true}
                onRefresh={init} refreshing={loading}>
                <View style={{
                    ...styles.center, ...styles.lists,
                }}>
                    <RSVP setRsvp={setRsvp} event={event} rsvp={rsvp} bottomRef={bottomRef} isRSVPLoading={isRSVPLoading} rsvp_loading={rsvp_loading} />

                    <Text style={styles.title}>My Events</Text>

                    <View style={styles.search}>
                        <SearchBar
                            searchPhrase={searchPhrase}
                            setSearchPhrase={setSearchPhrase}
                            clicked={clicked}
                            setClicked={setClicked}
                            search={init}
                            description={false}
                        />
                    </View>
                    <Text style={styles.title}>Welcome to</Text>
                    <View style={styles.divider}></View>
                    {event ? (<>
                        <ComponentEvent event={event} />
                        <View >
                            <Text style={styles.description}>
                                {event.description}
                            </Text>
                        </View>

                    </>) : (null)}
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
                    <TouchableOpacity style={styles.flex} activeOpacity={.9} onPress={() => {
                        bottomRef.current.show()
                    }}>

                        {rsvp != -1 ?
                            <View style={{ ...styles.rsvpChange, color: Colors.white, borderColor: Colors.white, backgroundColor: Colors.main_color }}>

                                <Text style={{ color: Colors.white }}>
                                    Change
                                </Text>
                            </View>
                            : <>

                                <View style={{ ...styles.rsvpChange, color: Colors.white, borderColor: Colors.white, backgroundColor: Colors.main_color }}>

                                    <Text style={{ color: Colors.white }}>
                                        RSVP
                                    </Text>
                                </View>

                            </>
                        }
                    </TouchableOpacity>

                </View>
            </Layout>
            <Toast />

        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.dark_blue_color,
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        fontSize: aspectRatio > 1.6 ? 24 : 30,
        fontFamily: "OpenSans-Bold",
        textTransform: 'capitalize',
    },
    center: {
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center'
    },
    search: {
        marginBottom: 20,
    },
    lists: {
        flex: 1,
        marginTop: 20,
    },
    divider: {
        marginVertical: 10,
        width: '80%',
        height: 2,
        backgroundColor: Colors.main_color
    },
    description: {
        marginVertical: 10,
        paddingHorizontal: 20,
        color: Colors.dark_blue_color
    },
    rsvpChange: {
        fontFamily: "OpenSans-BoldItalic",
        color: Colors.grey_color,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        backgroundColor: Colors.main_color,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 16,

    },
    rsvp: {
        paddingHorizontal: 15,
        marginVertical: 10,
        color: Colors.main_color,
        fontFamily: "OpenSans-BoldItalic",
        textDecorationLine: 'underline',
        textTransform: 'uppercase',

    },

});

export default SearchScreen;