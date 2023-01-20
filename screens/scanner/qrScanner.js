import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Appearance, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color, Dark } from '../../config/global';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Camera } from 'react-native-vision-camera';
import GeneralApiData from '../../Data/GeneralApiData';
import validation from '../../config/validation';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;
export default function QrScannerScreen(props) {
    const [hasPermission, setHasPermission] = useState(false);
    const [data, setData] = useState("");
    const [loading, isLoading] = useState(false);
    const [active, setActive] = useState(true);

    let scanner = useRef();



    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);
    const submit = async (value) => {
        isLoading(true);
        setActive(false);
        let timer = setTimeout(async () => {
            clearTimeout(timer);
            if (validation.valid(value.data)) {
                let data = {
                    email: value.data
                };
                let res = await GeneralApiData.EventAttended(1, data);
                if (res && res.status_code == 200) {
                    alert("Success");
                } else {
                    alert("Error!,Please try again");

                }
            }
            setActive(true);
            isLoading(false)
            //  scanner.reactivate();
        }, 1000);
    }

    return (
        <>
            {
                loading ? (<>
                    <ActivityIndicator size={"large"} />
                </>) : (
                    hasPermission && (<>

                        <QRCodeScanner
                            ref={(node) => { scanner = node }}
                            onRead={(e) => {
                                submit(e)
                            }}
                            reactivate={true}
                            reactivateTimeout={5000}

                            showMarker={true}
                            checkAndroid6Permissions={true}

                            topContent={
                                <View style={styles.center}>
                                    <Image style={styles.logo} resizeMode="contain" source={require('../../assets/img/logo_dark.png')} />
                                </View>
                            }
                            bottomContent={
                                <View style={styles.center}>
                                    <Image style={styles.logo} resizeMode="contain" source={require('../../assets/img/medcon_dark.png')} />
                                </View>
                            }

                        />
                    </>)
                )}
        </>
    )
}
const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: .2,
    },
    centerText: {
        fontSize: 18,
        padding: 32,
        color: '#777',

    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    logo: {
        width: 150
    }

});