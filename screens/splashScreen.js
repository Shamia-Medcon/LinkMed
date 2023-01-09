import React, { Component } from 'react';
import { View, Text, Appearance, Image, StatusBar, Animated, StyleSheet, Dimensions } from 'react-native';
import DBConnect from '../storage/DBConnect';
import LocalStorage from '../storage/LocalStorage';
import { Color, Dark } from '../config/global';
import Orientation from 'react-native-orientation-locker';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
    }
    prepareDb = async () => {
        await DBConnect.createDB();
        await DBConnect.checkAuth();
        let user = await LocalStorage.getData('user');
        setTimeout(async () => {
            if (!user) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            } else {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            }
        }, 2000);
        // await DBConnect.insertData(1, "Ali", "Shamia", "shamiaali7@gmail.com", "token", true, "2022-02-21 10:20:22");
        // await DBConnect.getById(1);
        // await DBConnect.getByEmail('shamiaali7@gmail.com');
    }
    initApp = async () => {

    }
    handleAnimation = () => {
        this.state.opacity.setValue(0);
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bounce,
            useNativeDriver: false
        }).start();
    }

    componentDidMount = () => {
        let init = async () => {
            await this.prepareDb();
        }
        init();
        Orientation.lockToPortrait();
        if (colorScheme === 'dark') {
            Colors = Dark
        }
    }

    render() {
        return (
            <>
                <StatusBar translucent barStyle={"light-content"} backgroundColor={Colors.main_color} />
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/img/logo.png')}
                            resizeMode='contain'
                            style={{
                                ...styles.logo,
                            }}
                        />
                    </View>
                    <View style={styles.medconLogo}>
                        <View>
                            <Text style={styles.white}>Powered by</Text>
                        </View>
                        <Image
                            source={require('../assets/img/medcon_logo.png')}
                            resizeMode='contain'
                            style={{
                                ...styles.logoCompany,
                            }}
                        />
                    </View>

                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.main_color,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative'
    },
    logoContainer: {
        alignItems: 'center',
        flex: .5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    logo: {
        width: Dimensions.get('screen').width * .5,
        resizeMode: 'contain'
    },
    white: {
        color: Colors.white
    },
    logoCompany: {
        width: Dimensions.get('screen').width,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 25,
        marginTop: 8
    },
    medconLogo: {
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    },
});