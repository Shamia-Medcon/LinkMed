import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appearance, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dark } from '../../config/global';
import LocalStorage from '../../storage/LocalStorage';
import DBConnect from '../../storage/DBConnect';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function Header({ back }) {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const loadAuth = async () => {
        await DBConnect.checkAuth();
        const time = setTimeout(async () => {
            let user = await LocalStorage.getData('user');
            if (user) {
                setName(user.first_name);
                setLoading(true);
            }
        }, 2000);
    }
    useEffect(() => {
        loadAuth();
    }, []);
    return (
        <>
            <View style={{ ...styles.header}}>
                {back ? (<>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/img/back.png')}
                                resizeMode='contain'
                                style={{
                                    ...styles.backIcon
                                }} />
                        </TouchableOpacity>
                    </View>
                </>) : (<></>)}
                <View style={styles.name}>
                    {loading ? <>
                        <Text style={styles.title}>Hi {name}!</Text></>
                        : <></>
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.main_color,
        height:100,
        width: Dimensions.get('screen').width,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',

        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop:30,


    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 5,

    },
    icon: {
        flex: 1,
        alignItems: 'flex-start'
    },
    name: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    title: {
        color: Color.white,
        marginVertical: 15,
        fontSize: 20,
        fontFamily: "OpenSans-Bold",
        justifyContent: 'flex-end'
    },
    backIcon: {
        width: 30,
        height: 30,
    },
})