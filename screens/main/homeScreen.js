import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, Appearance, StyleSheet, Dimensions, Image } from 'react-native';
import Header from '../../components/common/header';
import ListOfEvents from '../../components/events/list';
import { Color, Dark } from '../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function HomeScreen(props) {
    const [loading, isLoading] = useState(false);
    const [fetched, isFetched] = useState(false);



    return (<>
        <StatusBar  barStyle={"light-content"} backgroundColor={Colors.main_color} />

        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scroll} >
                <Header />
                <View style={{ ...styles.center, ...styles.lists }}>
                    <ListOfEvents navigation={props.navigation} />
                </View>
            </ScrollView>
        </View>

    </>
    );

}
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
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
        marginTop: 20
    }


});