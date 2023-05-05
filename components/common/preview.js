import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import VideoPlayer from 'react-native-video-player'
import { Color } from '../../config/global';
const { width, height } = Dimensions.get('screen')
let Colors = Color;

export default function Preview({ url, open, setOpen }) {
    const ref = useRef();
    const [loading, setLoading] = useState(true);
    return (
        <Modal animationType='fade'
            transparent={true}
            visible={open}
            onRequestClose={() => {
                setOpen(false)
            }} >
            <VideoPlayer
                ref={ref}
                video={{ uri: url }}
                videoHeight={height}
                resizeMode={'stretch'}
                videoWidth={width}
                controls={false}
                pauseOnPress={false}
                disableFullscreen={true}
                controlsTimeout={0}
                preventsDisplaySleepDuringVideoPlayback={true}
                autoplay={true}
                fullscreen={false}
                loop={false}
                disableSeek={true}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoad={() => {
                   setLoading(false);
                }}
                onEnd={() => {
                    console.log("Ended")
                    setOpen(false)
                }}
            />
            {loading ? (<>
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>

            </>) : (null)}

            <TouchableOpacity style={styles.close} onPress={() => {
                setOpen(false)
                ref.current.stop()
            }}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
        </Modal>
    )
}
const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        top: 40,
        right: 20,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: Colors.white,

    },
    closeText: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    loading: {
        position: 'absolute',
        width: width,
        height: height,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.white,

    }
})