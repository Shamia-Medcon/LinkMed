import React from 'react';
import { Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dark } from '../../config/global';
import GalleryImage from '../common/image';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function EventItem(props) {

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={.96} onPress={() => {
                    props.navigation.navigate("EventDetails", {
                        event: props.event
                    })
                }}>
                    <View style={{ ...styles.row, ...styles.item }}>

                        <View style={styles.details}>
                            <View style={styles.col}>
                                <Text style={{ ...styles._font20, ...styles._center }}>{props.event.day}</Text>
                                <Text style={{ ...styles._font50, ...styles._center }}>{props.event.day_numeric}</Text>
                                <Text style={{ ...styles._font20, ...styles._center }}>{props.event.month}</Text>
                                <View style={styles.rowFlex}>
                                    <View style={styles.iconContent}>
                                        <Image source={require('../../assets/img/time.png')}
                                            resizeMode='contain'
                                            style={{
                                                ...styles.icon
                                            }} />
                                    </View>
                                    <View style={styles.textContent}>
                                        <Text style={{ ...styles._font10, ...styles._center }}>{props.event.time}</Text>
                                    </View>
                                </View>
                                <View style={styles.rowFlex}>
                                    <View style={styles.iconContent}>
                                        <Image source={require('../../assets/img/location.png')}
                                            resizeMode='contain'
                                            style={{
                                                ...styles.icon
                                            }} />
                                    </View>
                                    <View style={styles.textContent}>
                                        <Text style={{ ...styles._font10, ...styles._center }}>{props.event.address}</Text>
                                        {/* <Text style={styles._font8}>is simply dummy text of
                                        the printing and typesetting
                                        industry.</Text> */}
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View>

                            <GalleryImage defaultStyle={{
                                ...styles.thumb,
                            }} url={props.event.cover} size={"stretch"} />
                        </View>
                        {/* <Image source={{ uri: props.event.cover }}
                            resizeMode="stretch"
                            borderTopRightRadius={20}
                            borderBottomRightRadius={20}
                            style={styles.thumb}
                        /> */}

                    </View>
                </TouchableOpacity>

            </View>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width * .95,
        flex: 1,
        position: 'relative',
    },
    item: {
        backgroundColor: Colors.white
    },
    row: {
        width: Dimensions.get('screen').width * .95,
        borderWidth: 2,
        borderColor: Colors.main_color,
        borderRadius: 20,
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 2
    },
    rowFlex: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        width: Dimensions.get('screen').width * .35,
        height: 200,
        borderRadius: 2,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000000",
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: Colors.white,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    iconContent: {
        width: "25%",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
    },
    textContent: {
        width: "75%",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    _center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    thumb: {
        height: 200,
        width: Dimensions.get('screen').width * .59,
        backgroundColor: Colors.white,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,

    },
    _margin5: {
        marginVertical: 5
    },
    _margin10: {
        marginVertical: 10
    },
    _margin15: {
        marginVertical: 15
    },
    _font8: {
        fontSize: 8,
        color: Colors.main_color,
        fontFamily: "OpenSans-Regular",
        textTransform: 'capitalize',
        lineHeight: 8,
        width: "100%",

    },
    _font10: {
        fontSize: 10,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        lineHeight: 10,
        width: "100%",

    },
    _font12: {
        fontSize: 12,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
        lineHeight: 12,
        width: "100%",

    },
    _font15: {
        fontSize: 15,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'capitalize',
        lineHeight: 15,
        width: "100%",
    },
    _font20: {
        fontSize: 20,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
        lineHeight: 20,
        width: "100%",

    },
    _font50: {
        fontSize: 50,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'capitalize',
        lineHeight: 52,
        width: "100%",

    },
});

