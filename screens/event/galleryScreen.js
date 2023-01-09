import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appearance, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { Color, Dark } from '../../config/global';
import { FloatingAction } from "react-native-floating-action";

const colorScheme = Appearance.getColorScheme();
let Colors = Color;

const actions = [
    {
        text: "Camera",
        icon: require("../../assets/img/camera.png"),
        name: "camera",
        position: 2
    },
    {
        text: "Gallery",
        icon: require("../../assets/img/open_gallery.png"),
        name: "gallery",
        position: 1
    },
];
export default function GalleryScreen(props) {
    const navigation = useNavigation();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        setEvent(props.route.params.event);
    }, []);
    const openCamera = async () => {
        navigation.navigate("Camera", {
            event: event
        })
    }
    return (
        <>
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>

                <View style={{ ...styles.header, ...styles.shadowProp }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/back.png')}
                            resizeMode='contain'
                            style={{
                                ...styles.backIcon
                            }} />
                    </TouchableOpacity>
                    <Text style={styles.header_title}>{event ? event.title : ""}</Text>
                </View>

                <View style={styles.container}>

                    <GridImageView data={[
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
                        'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
                        'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
                        'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',

                    ]} />

                </View>


                <FloatingAction
                    actions={actions}
                    color={Colors.main_color}
                    dismissKeyboardOnPress={true}
                    onPressItem={name => {
                        if (name == "camera") {
                            openCamera();
                        } else {
                            console.log(`selected button: ${name}`);
                        }
                    }}
                />

            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        backgroundColor: Colors.main_color,
        height: Dimensions.get('screen').height * .1,
        width: Dimensions.get('screen').width,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        position: 'relative',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',


    },
    header_title: {
        color: Color.white,
        width: Dimensions.get('screen').width * .8,
        fontSize: 20,
        fontFamily: "OpenSans-Bold",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    },
    backIcon: {
        width: 30,
        height: 30,
    },
});

