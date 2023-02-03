import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import VideoPlayer from 'react-native-video-player'
import { Color } from '../../config/global';
const { width, height } = Dimensions.get('screen')
let Colors = Color;

export default function Preview({ url, open, setOpen }) {
    const ref = useRef();
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
                onEnd={() => {
                    console.log("Ended")
                    setOpen(false)
                }}
            />
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

    }
})