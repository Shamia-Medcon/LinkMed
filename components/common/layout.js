import React from 'react';
import { Appearance, Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Header from './header';
import { Color, Dark } from '../../config/global';
import { useNavigation } from '@react-navigation/native';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function Layout(props) {
    const navigation = useNavigation();

    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>
                <Header back={props.back} />
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={styles.scroll} >
                    <View style={styles.container}>
                        {props.children}
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
        backgroundColor: Color.white,
        flexDirection: 'column',
        width: Dimensions.get('screen').width,
        marginTop: 10,
        backgroundColor: Colors.white
    },
});
