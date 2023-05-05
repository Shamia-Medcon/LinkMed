import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import Toast from 'react-native-toast-message';

import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function SendingQuestionScreen(props) {
    const [loading, isLoading] = useState(false);
    const [submitLoading, isSubmitLoading] = useState(false);
    const [eventQuestion, setEventQuestion] = useState([]);
    const [question, setQuestion] = useState("");
    const [event, setEvent] = useState(null);
    const [alert, setAlert] = useState({});


    const init = async () => {
        isLoading(true);
        let data = {
            page: 1
        }
        const res = await GeneralApiData.EventQuestionByUser(data, event ? event.id : 0);
        isLoading(false);
        if (res && res.status_code == 200) {
            setEventQuestion(res.data);
        } else {
            setEventQuestion([]);
        }
    }
    const submit = async () => {
        setAlert({});
        if (question.trim() != "") {
            isSubmitLoading(true);
            let data = {
                event_id: event ? event.id : 0,
                question_content: question
            }
            const res = await GeneralApiData.PostEventQuestionByUser(data);
            isSubmitLoading(false);
            console.log(res)
            if (res && res.status_code == 200) {
                // setAlert("Your question has sent successfully");
                Toast.show({
                    type: "success",
                    text1: "Info",
                    text2: "Your question has been sent successfully"
                });
                setQuestion("");
                setEventQuestion(res.data);
            } else {

                Toast.show({
                    type: "error",
                    text1: "Warning!",
                    text2: "Error in request, please try again"
                });
            }
        } else {

            Toast.show({
                type: "error",
                text1: "Warning!",
                text2: "Please enter your question"
            });
        }
    }
    useEffect(() => {
        setEvent(props.route.params.event);
        init();
    }, [event]);
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
    return (
        <>
            <Layout back={true}
                onRefresh={init}
                refreshing={loading}>
                <View style={styles.center}>
                    <Text style={styles.questionTitle}>Sending Questions</Text>
                </View>
                <View style={styles.question}>
                    {alert.message ? <>
                        <View><Text style={{ ...styles.error, color: alert.color }}>{alert.message}</Text></View>
                    </> : <></>}
                    <View style={styles.textbox}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={8}

                            onChangeText={(text) => {
                                setQuestion(text)
                            }}
                            value={question}
                        />
                    </View>
                    <View style={{ ...styles.center }}>
                        {submitLoading ? (<>
                            <ActivityIndicator />
                        </>) : (<>
                            <TouchableOpacity style={{ ...styles.button, ...styles.center }} onPress={() => { submit() }} activeOpacity={.9}>
                                <Text style={styles.white}>Send</Text>
                            </TouchableOpacity>
                        </>)}

                    </View>
                </View>
                {loading ? (<>
                    <ActivityIndicator />
                </>) : <>
                    <View style={styles.previousQuestions}>
                        {eventQuestion && eventQuestion.length > 0 ? (<>

                            <Text style={styles.previousQuestionTitle}>Previous Questions</Text>

                            {eventQuestion && eventQuestion.map((item, key) => {
                                return <View style={styles.questionText} key={key}>


                                    <Text style={styles.text}>{item.question}</Text>
                                    <Text style={styles.date}>{item.created_at}</Text>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        marginTop: 5

                                    }}>
                                        <Text style={{
                                            padding: 5,
                                            // backgroundColor: item.status == 0 ? Colors.light_grey_color : Colors.main_color,
                                            fontSize: 12,
                                            color: item.status == 0 ? Colors.light_grey_color : Colors.main_color,
                                            borderColor: item.status == 0 ? Colors.light_grey_color : Colors.main_color,
                                            borderWidth: 1,
                                            borderRadius: 5,

                                        }}>{item.status_message}</Text>
                                    </View>
                                </View>
                            })}

                        </>) : (<></>)}

                    </View>
                </>}


            </Layout>
            <Toast />

        </>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    question: {
        flex: 1,
        width: Dimensions.get('screen').width,
    },
    questionTitle: {
        color: Colors.main_color,
        fontSize: 25,
        fontFamily: "OpenSans-Bold",
        textTransform: "uppercase",
        marginVertical: 10,
    },
    textbox: {
        margin: 20
    },

    input: {
        borderWidth: 2,
        borderColor: Colors.main_color,
        color: Colors.grey_color,
        height: 100
    },
    button: {
        backgroundColor: Colors.main_color,
        width: 200,
        height: 50,
        borderRadius: 20
    },
    white: {
        color: Colors.white,
        fontFamily: "OpenSans-Bold",
    },
    previousQuestions: {
        marginVertical: 10,
        width: Dimensions.get('screen').width,

    },
    previousQuestionTitle: {
        fontFamily: "OpenSans-Bold",
        color: Colors.main_color,
        fontSize: 20,
        marginHorizontal: 20

    },
    questionText: {
        fontFamily: "OpenSans-Bold",
        margin: 20

    },
    text: {
        alignItems: 'center',
        fontSize: 17,
        color: Colors.grey_color,

    },
    date: {
        justifyContent: 'flex-end',
        textAlign: 'right',
        alignItems: 'center',
        fontSize: 10,
        color: Colors.grey_color,
    },
    error: {
        fontSize: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    },
});