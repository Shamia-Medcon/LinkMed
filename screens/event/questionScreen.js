import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function SendingQuestionScreenOld(props) {
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
                event: event ? event.id : 0,
                question_content: question
            }
            const res = await GeneralApiData.PostEventQuestionByUser(data);
            isSubmitLoading(false);
            if (res && res.status_code == 200) {
                // setAlert("Your question has sent successfully");
                setEventQuestion(res.data);
            } else {
                setAlert({
                    "message": "Please try again",
                    "color": Colors.red,
                });
            }
        } else {
            setAlert({
                "message": "Please enter your question",
                "color": Colors.red,
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
        <Layout back={true}>
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
                    <Text style={styles.previousQuestionTitle}>Previous Questions</Text>
                    {eventQuestion && eventQuestion.map((item, key) => {
                        return <View style={styles.questionText} key={key}>
                            <Text style={styles.text}>{item.question}</Text>
                            <Text style={styles.date}>{item.created_at}</Text>
                        </View>
                    })}
                </View>
            </>}


        </Layout>
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
        color:Colors.grey_color
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
        marginHorizontal:20

    },
    questionText: {
        fontFamily: "OpenSans-Bold",
        margin:20

    },
    text: {
        alignItems: 'center',
        fontSize: 17,
        color:Colors.grey_color,

    },
    date: {
        justifyContent: 'flex-end',
        textAlign: 'right',
        alignItems: 'center',
        fontSize: 15,
        color:Colors.grey_color,


    },
    error: {
        fontSize: 15,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        textAlign:'center'

    },
});