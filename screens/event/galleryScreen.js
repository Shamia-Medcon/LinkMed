import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, PermissionsAndroid, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dark } from '../../config/global';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GeneralApiData from '../../Data/GeneralApiData';
import GalleryImage from '../../components/common/image';
import GridImageView from 'react-native-grid-image-viewer';
import Header from '../../components/common/header';
import ModalImage from '../../components/common/modal';
import Toast from 'react-native-toast-message';
import AwesomeAlert from 'react-native-awesome-alerts';
import OneSignal from 'react-native-onesignal';

const colorScheme = Appearance.getColorScheme();
let Colors = Color;

const actions = [
    {
        text: "Camera",
        icon: require("../../assets/img/camera.png"),
        color: Colors.main_color,
        name: "camera",
        buttonSize: 45,
        position: 2
    },
    {
        text: "Gallery",
        icon: require("../../assets/img/file.png"),
        name: "gallery",
        color: Colors.main_color,
        buttonSize: 45,
        position: 1
    },
];
export default function GalleryScreen(props) {
    const [loading, isLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const [refreshing,setRefreshing]=useState(false);
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
        setShow(false);

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

    }
    const asyncLaunchCamera = async () => {
        const result = await launchCamera({
            mediaType: "photo",
            durationLimit: 20,
            saveToPhotos: true,
            cameraType: "back",
            includeExtra: true,
            maxHeight: 1920,
            maxWidth: 1080,
        });
        if (result && result.assets) {
            let form = new FormData();
            let files = [];
            result.assets.forEach(photo => {
                let uri = photo.uri;
                if (Platform.OS === 'ios') {
                    uri = uri.replace('file://', '');
                }
                form.append('images[]', {
                    name: photo.fileName,
                    type: photo.type,
                    uri: uri,
                });

            });
            form.append('images[]', (files))
            //show loading
            isLoading(true);
            let res = await GeneralApiData.EventUploadLiveGallery(event.id, form);
            if (res && (res.status_code == 200 || res.status == 200)) {
                setShow(true);
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Something wrong, Please try again"
                });
                setShow(false);
            }
            //hide loading
            isLoading(false);
        }
    }
    useEffect(() => {
        OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
            const { action, notification } = openedEvent;
            if (notification.additionalData != undefined) {
                let target = notification.additionalData;
                switch (target.type) {
                    case "event":
                        navigation.navigate("EventDetails", {
                            event: target.id
                        })
                        break;
                    default:
                        break;
                }
            }
        })

    }, [])
    const openCamera = async () => {


        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await asyncLaunchCamera();

            } else {
                // if get here, the user did NOT accepted the permissions
                Toast.show({
                    type: "warning",
                    text1: "Warning!",
                    text2: "Something wrong, Access Denied"
                });
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
                maxHeight: 1920,
                maxWidth: 1080,
                includeExtra: true,
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
                    setShow(true);

                } else {
                    Toast.show({
                        type: "error",
                        text1: "Error!",
                        text2: "Something wrong, Please try again"
                    });
                    setShow(false);
                }
                isLoading(false);

                //hide loading


            }
        } catch (e) {
            isLoading(false);

            console.log('User tapped custom button: ', e);
        }
    }
    const openGallery = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    await asyncLaunchImageLibrary();
                }
            } else {
                await asyncLaunchImageLibrary();
            }
        } catch (e) {
            isLoading(false);

            console.log('User tapped custom button: ', e);
        }
    }

    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main_color} />

            <View style={styles.scroll}>
                <Header back={true} />
                <View style={styles.container}>
                    {loading ? (<>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <ActivityIndicator />
                        </View>
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
                buttonSize={70}
                iconHeight={30}
                iconWidth={30}
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
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={"Successfully"}
                message={"Your photo has been submitted, it will be available after review"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                confirmText={"Done"}
                confirmButtonColor={Colors.main_color}
                onDismiss={() => {
                    setShow(false);
                }}
                onConfirmPressed={() => {
                    loadGallery()
                }}

            />
            <Toast />

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



    flatbtn: {
        position: 'absolute',
        bottom: 0,
    },
    gridView: {
        marginTop: 10,
        flex: 1,
        borderWidth: 1
    },

});

