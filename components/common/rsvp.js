import React from 'react';
import { ActivityIndicator, Appearance, Dimensions, StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../config/global';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


function RSVP({ bottomRef, updateRSVP, rsvp, rsvp_loading }) {
    return (
        <>
            <BottomSheet hasDraggableIcon ref={bottomRef} height={200} >
                <Text style={styles.bottomTitle}>Please confirm</Text>
                {rsvp_loading ? (<>
                    <ActivityIndicator />
                </>) : (<>
                    <View style={styles.actions}>
                        <TouchableOpacity style={rsvp != 1 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                            updateRSVP(1);
                        }}>
                            <Text style={rsvp != 1 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Attending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={rsvp != 0 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                            updateRSVP(0);
                        }}>
                            <Text style={rsvp != 0 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Not Attending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={rsvp != 2 ? { ...styles.option, borderColor: Colors.main_color } : { ...styles.selected, backgroundColor: Colors.main_color, borderColor: Colors.main_color }} onPress={() => {
                            updateRSVP(2);
                        }}>
                            <Text style={rsvp != 2 ? { ...styles.rsvpTitle, color: Colors.main_color } : styles.rsvpTitleColored}>Not Sure</Text>
                        </TouchableOpacity>
                    </View>
                </>)}
            </BottomSheet>

        </>
    );
}
const styles = StyleSheet.create({
    actions: {
        marginTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomTitle: {
        marginTop: 20,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.grey_color,
        fontFamily: "OpenSans-BoldItalic",
    },
    selected: {
        padding: 10,
        backgroundColor: Colors.main_color,
        marginHorizontal: 5,
        borderRadius: 20,
        color: Colors.white,
        borderWidth: 1,
        borderColor: Colors.main_color,
        fontFamily: "OpenSans-BoldItalic",
    },
    rsvpTitle: {
        color: Colors.main_color,
    },
    rsvpTitleColored: {
        color: Colors.white
    },
    option: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        color: Colors.main_color,
        borderWidth: 1,
        borderColor: Colors.main_color,
        fontFamily: "OpenSans-BoldItalic",
    },
});
export default RSVP;