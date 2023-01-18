
import React, { useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dark } from '../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function ModalImage({ url, defaultStyle }) {
    const [modal, setModal] = useState(false);

    return (
        <>
            <View
                animationType="slide"
                transparent={true}
                style={styles.container}
                visible={modal}>
                <Image style={styles.image} resizeMode={"center"} source={{ uri: url }} />
                
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.placeHolder,
        position: 'relative',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: Dimensions.get('screen').height
    },
});