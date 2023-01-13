import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Color, Dark } from '../../config/global';
import DBConnect from '../../storage/DBConnect';
import LocalStorage from '../../storage/LocalStorage';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function ProfileScreen(props) {
    const navigation = useNavigation();
    const [loading, isLoading] = useState(true);
    const [info, setInfo] = useState(null);


    const init = async () => {
        DBConnect.checkAuth();
        let user = await LocalStorage.getData('user');
        let timer = setTimeout(async () => {
            clearTimeout(timer);
            setInfo(user);
            isLoading(false);
        }, 2000);
    }
    const signout = async () => {
        DBConnect.deleteData();
        await LocalStorage.trancateData('user');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    }
    const edit = async () => {
        navigation.navigate("EditProfile", {})
    }
    useFocusEffect(() => {
        init();
        const willFoucsSubsription = navigation.addListener('foucs', () => {
            init();
        })
        return willFoucsSubsription;
    });
    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40, flex: 1 }} style={styles.scroll}>
                    <View style={styles.header}>
                        <Text style={styles.title}>My Profile</Text>
                    </View>
                    {loading || !info ? (<>
                        <ActivityIndicator color={Colors.white} size={"large"} style={{ ...styles.center, flex: 1 }} />
                    </>) : (<>
                        <View style={styles.header}>
                            <QRCode
                                quietZone={12}
                                color={Colors.black}
                                backgroundColor={Colors.white}
                                size={150}
                                value={info ? info.email : ""} />
                        </View>
                        <View style={styles.details}>

                            <Text style={styles.headerTitle}>Personal Details</Text>
                            <View style={styles.item}>
                                <Text style={styles.itemTitle}>First Name:</Text>
                                <Text style={styles.itemValue}>{info ? info.first_name : "--"}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemTitle}>Last Name:</Text>
                                <Text style={styles.itemValue}>{info ? info.last_name : "--"}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemTitle}>Email Address:</Text>
                                <Text style={styles.itemValue}>{info ? info.email : "--"}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemTitle}>Country:</Text>
                                <Text style={styles.itemValue}>{info ? info.country : "--"}</Text>
                            </View>
                            <Text style={styles.headerTitle}>Professional Details</Text>
                            <View style={styles.item}>
                                <Text style={styles.itemTitle}>Speciality:</Text>
                                <Text style={styles.itemValue}>{info ? info.speciality : "--"}</Text>
                            </View>
                            <Text style={styles.headerTitle}>My CME Certificates</Text>
                        </View>
                        <View style={{ ...styles.actions, ...styles.center }}>
                            <TouchableOpacity style={styles.button}
                                activeOpacity={.8}
                                onPress={edit}>
                                <Text style={{ ...styles.center, ...styles.buttonText }}>
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                activeOpacity={.8}
                                onPress={signout}>
                                <Text style={{ ...styles.center, ...styles.buttonText }}>
                                    SIGN Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    )}

                </ScrollView>
            </View>

        </>
    );
}
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: .98,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: Colors.main_color,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        paddingTop: 50

    },
    header: {
        alignItems: 'center',

    },
    details: {
        margin: 20
    },
    title: {
        fontSize: 30,
        color: Colors.white,
        textTransform: "uppercase",
        fontFamily: "OpenSans-Bold",
        marginVertical: 10,
    },
    headerTitle: {
        color: Colors.white,
        fontFamily: "OpenSans-SemiBold",
        fontSize: 22,
    },
    item: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    itemTitle: {
        color: Colors.white,
        fontFamily: "OpenSans-SemiBold",
        fontSize: 18,
    },
    itemValue: {
        color: Colors.white,
        fontFamily: "OpenSans-Regular",
        fontSize: 18,
        marginStart: 10,
        marginEnd: 20,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderColor: Colors.white,
        borderWidth: 2,
        borderRadius: 50,
        padding: 10,
        height: 45,
        backgroundColor: Colors.white,
        width: Dimensions.get('screen').width * .8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase'
    },
});