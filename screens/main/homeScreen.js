import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, Appearance, StyleSheet, Dimensions, Image } from 'react-native';
import Header from '../../components/common/header';
import Layout from '../../components/common/layout';
import ListOfEvents from '../../components/events/list';
import { Color, Dark } from '../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function HomeScreen(props) {



    return (<>
        <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />

        <View style={styles.container}>

            <Layout contentContainerStyle={{ paddingBottom: 100 }} style={styles.scroll} >
                <Text style={styles.title}>My Events</Text>
                <View style={{ ...styles.center, ...styles.lists }}>
                    <ListOfEvents navigation={props.navigation} />
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

    logoCompany: {
        height: 30
    },

    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    lists: {
        marginTop: 20,

    },
    title: {
        color: Colors.main_color,
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 20,
        fontFamily: "OpenSans-Bold",
        textTransform:'uppercase',

    },


});