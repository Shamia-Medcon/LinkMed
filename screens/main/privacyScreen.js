import React from 'react';
import { View, Text, StatusBar, Appearance, StyleSheet } from 'react-native';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function PrivacyScreen(props) {
    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />
            <View style={styles.container}>
                <Layout contentContainerStyle={{ paddingBottom: 100 }} style={styles.scroll} >
                    <Text style={styles.title}>MEDLINK</Text>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Image style={styles.icon} source={require("../../assets/img/mission.png")} />
                            <Text style={styles.subtitle}>Mission</Text>
                        </View>
                        <View style={{ ...styles.col, ...styles.bordered }}>
                            <Image style={styles.icon} source={require("../../assets/img/vission.png")} />
                            <Text style={styles.subtitle}>Vission</Text>


                        </View>
                    </View>
                </Layout>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    title: {
        color: Colors.main_color,
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 20,
        fontFamily: "OpenSans-Bold",
        textTransform: 'uppercase',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    icon: {
        width: 60,
        height: 60
    },
    bordered: {
        borderLeftWidth: 2,
        borderLeftColor:Colors.main_color,


    },
});