import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, PermissionsAndroid, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dark } from '../../config/global';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GeneralApiData from '../../Data/GeneralApiData';
import Layout from '../../components/common/layout';
import GalleryImage from '../../components/common/image';
import GridImageView from 'react-native-grid-image-viewer';
import Header from '../../components/common/header';
import ModalImage from '../../components/common/modal';

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
    const [loading, isLoading] = useState(true);
    const [uploadLoading, isUploadLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setEvent(props.route.params.event);
        let time = setTimeout(async () => {
            clearTimeout(time);
            loadGallery();
        }, 2000);
        return () => {
            setGallery([]); // This worked for me
        };
    }, [event]);

    const loadGallery = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            if (event && event.id > 0) {
                let data = {
                    page: page,
                };
                let res = await GeneralApiData.EventLoadGallery(event.id, data)
                // setPage(page + 1);
                if (res && res.status_code == 200) {

                    setGallery(res.data);

                }
                isLoading(false);

            }
        }, 1000);
    }
    const asyncLaunchCamera = async () => {
        const result = await launchCamera({
            mediaType: "photo",
            durationLimit: 20,
            saveToPhotos: true,
            cameraType: "back",
            includeExtra: true,
        });
        if (result && result.assets) {
            let form = new FormData();
            let files = [];
            result.assets.forEach(photo => {
                form.append('images[]', {
                    name: photo.fileName,
                    type: photo.type,
                    uri:
                        Platform.OS === 'android'
                            ? photo.uri
                            : photo.uri.replace('file://', ''),
                });

            });
            form.append('images[]', (files))
            //show loading
            isLoading(true);
            let res = await GeneralApiData.EventUploadLiveGallery(event.id, form);
            if (res && (res.status_code == 200 || res.status == 200)) {
                loadGallery();
            }
            //hide loading
            isLoading(false);
        }
    }
    const openCamera = async () => {


        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await asyncLaunchCamera();

            } else {
                // if get here, the user did NOT accepted the permissions
            }
        } else {
            await asyncLaunchCamera();
        }


    }
    const asyncLaunchImageLibrary = async () => {
        try {

            const result = await launchImageLibrary({
                mediaType: "photo",
                durationLimit: 20,
                selectionLimit: 5,

            });
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else if (result.customButton) {
                console.log('User tapped custom button: ', result.customButton);
            } else {
                //show loading
                isLoading(true);
                let form = new FormData();
                result.assets.forEach(photo => {
                    let uri = Platform.OS === 'android'
                        ? photo.uri
                        : photo.uri.replace('file://', '')
                    form.append('images[]', {
                        name: photo.fileName,
                        type: photo.type,
                        uri: uri,
                    });

                });
                let res = await GeneralApiData.EventUploadLiveGallery(event.id, form);
                if (res && (res.status_code == 200 || res.status == 200)) {
                    loadGallery();
                }
                isLoading(false);

                //hide loading


            }
        } catch (e) {
            isLoading(false);

        }
    }
    const openGallery = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await asyncLaunchImageLibrary();
            }
        } else {
            await asyncLaunchImageLibrary();
        }
    }

    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />

            <View style={styles.scroll}>
                <Header back={true} />
                <View style={styles.container}>
                    {loading ? (<>
                        <ActivityIndicator />
                    </>) : (<>
                        <GridImageView heightOfGridImage={100} data={gallery}
                            renderModalImage={(item, defaultStyle) =>
                                (<ModalImage defaultStyle={defaultStyle} url={item.url} />)
                            }
                            renderGridImage={(item, defaultStyle) =>
                                (<GalleryImage defaultStyle={defaultStyle} url={item.url} />)
                            } />
                    </>)}
                </View>
            </View>
            <FloatingAction
                buttonSize={80}
                iconHeight={50}
                iconWidth={50}
                actions={actions}
                color={Colors.main_color}
                dismissKeyboardOnPress={true}
                style={styles.flatbtn}
                onPressItem={name => {
                    if (name == "camera") {
                        openCamera();
                    } else {
                        openGallery()
                    }
                }}
            />
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,

    },
    scroll: {
        flex: 1,
        flexDirection: 'column',
    },


    images: {
        flex: 4, // the number of columns you want to devide the screen into
        width: 400,

    },
    flatbtn: {
        position: 'absolute',
        bottom: 0
    },
    gridView: {
        marginTop: 10,
        flex: 1,
        borderWidth: 1
    },

});

