import React, { useEffect } from 'react';
import { Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color, Dark } from '../../config/global';
import GalleryImage from '../common/image';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

export default function EventItem(props) {


    useEffect(() => {
        Colors = JSON.parse(props.event.company?.colors)
    }, [])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={.96} onPress={() => {
                    if (props.user && props.user.isScanner) {
                        props.navigation.navigate("Scanner", {
                            event: props.event.id
                        })
                    } else {
                        props.navigation.navigate("EventDetails", {
                            event: props.event.id
                        })
                    }

                }}>

                    <View style={{ ...styles.row, ...styles.item, backgroundColor: Colors.linear_main_color, borderColor: Colors.linear_main_color }}>
                        <LinearGradient style={{ ...styles.details, }} start={{ x: 1, y: 0 }} end={{ x: .5, y: 1 }} angleCenter={{ x: 0, y: 0 }} colors={[Colors.linear_main_color, Colors.linear_secondary_color, Colors.linear_secondary_color, Colors.white]}>

                            <View>

                                <View style={styles.col}>
                                    <View style={styles.rowFlex}>
                                        <View>
                                            <Text style={{ ...styles._font20, ...styles._center, color: Colors.textColor }}>{props.event.day}</Text>
                                            <Text style={{ ...styles._font50, ...styles._center, color: Colors.textColor }}>{props.event.day_numeric}</Text>
                                            <Text style={{ ...styles._font20, ...styles._center, color: Colors.textColor }}>{props.event.month}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowFlex}>
                                        <View style={styles.iconContent}>
                                            <Image source={require('../../assets/img/time.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.icon,
                                                    tintColor: Colors.textColor
                                                }} />
                                        </View>
                                        <View style={styles.textContent}>
                                            <Text style={{ ...styles._font10, ...styles._center, color: Colors.textColor }}>{props.event.time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowFlex}>
                                        <View style={styles.iconContent}>
                                            <Image source={require('../../assets/img/location.png')}
                                                resizeMode='contain'
                                                style={{
                                                    ...styles.icon,
                                                    tintColor: Colors.textColor

                                                }} />
                                        </View>
                                        <View style={styles.textContent}>
                                            <Text style={{ ...styles._font10, ...styles._center, color: Colors.textColor }}>{props.event.address}</Text>

                                        </View>
                                    </View>

                                </View>

                            </View>
                        </LinearGradient>
                        <View>

                            <GalleryImage defaultStyle={{
                                ...styles.thumb,
                            }} url={props.event.cover} size={"stretch"} />
                        </View>

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
        height: aspectRatio > 1.6 ? 200 : Dimensions.get('screen').height * .25,
        borderRadius: 2,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

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
        height: aspectRatio > 1.6 ? 200 : Dimensions.get('screen').height * .25,
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
        fontSize: aspectRatio > 1.6 ? 8 : 10,
        color: Colors.main_color,
        fontFamily: "OpenSans-Regular",
        textTransform: 'capitalize',
        lineHeight: aspectRatio > 1.6 ? 8 : 10,
        width: "100%",

    },
    _font10: {
        fontSize: aspectRatio > 1.6 ? 10 : 15,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        lineHeight: aspectRatio > 1.6 ? 10 : 15,
        width: "100%",

    },
    _font12: {
        fontSize: aspectRatio > 1.6 ? 12 : 14,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
        lineHeight: aspectRatio > 1.6 ? 12 : 14,
        width: "100%",

    },
    _font15: {
        fontSize: aspectRatio > 1.6 ? 15 : 17,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'capitalize',
        lineHeight: aspectRatio > 1.6 ? 15 : 17,
        width: "100%",
    },
    _font20: {
        fontSize: aspectRatio > 1.6 ? 20 : 25,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
        lineHeight: aspectRatio > 1.6 ? 20 : 25,
        width: "100%",

    },
    _font50: {
        fontSize: aspectRatio > 1.6 ? 50 : 52,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'capitalize',
        lineHeight: aspectRatio > 1.6 ? 50 : 52,
        width: "100%",

    },
});

