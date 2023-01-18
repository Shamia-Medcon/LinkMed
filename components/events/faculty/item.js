import React from 'react';
import { Appearance, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Color, Dark } from '../../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function FacultyItem({ item }) {
    return (
        <View style={styles.content}>
            <View style={styles.profileContent}>
                <Image resizeMode='contain' source={{ uri: item.profile }} style={styles.profile} />
            </View>
            <View style={styles.col}>
                <Text style={styles.name}>{item.first_name + " " + item.last_name}</Text>
                <Text style={styles.details}>{item.profession}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    content: {
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        alignItems: 'center'

    },
    profileContent: {
        width: Dimensions.get('screen').width * .3,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.dark_blue_color
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    col: {
        width: Dimensions.get('screen').width * .7,
        paddingEnd:10,
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        color: Colors.main_color
    },
    details: {
        fontSize: 12,
        color:Colors.grey_color,
    }

});