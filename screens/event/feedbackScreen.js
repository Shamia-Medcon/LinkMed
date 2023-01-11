import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/layout';
import { Color, Dark } from '../../config/global';
import GeneralApiData from '../../Data/GeneralApiData';
const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function FeedBackScreen(props) {
    const [loading, isLoading] = useState(false);
    const [submitLoading, isSubmitLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [eventFeedback, setEventFeedback] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [alert, setAlert] = useState({});

    init = async () => {
        isLoading(true);
        let time = setTimeout(async () => {
            clearTimeout(time);
            if (event && event.id > 0) {
                const res = await GeneralApiData.EventFeedbackEvaluation(event ? event.id : 0);
                if (res && res.status_code == 200) {
                    setEventFeedback(res.data);
                    let data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        let answersList = data[i].answers;
                        for (var j = 0; j < answersList.length; j++) {
                            if (answersList[j].selected) {
                                answers.push({
                                    'id': data[i].id,
                                    'answer_id': answersList[j].id
                                });
                            }
                        }
                    }
                } else {
                    setEventFeedback([]);
                }
            }
            isLoading(false);
        }, 2000);
    }
    useEffect(() => {
        setEvent(props.route.params.event);
    }, [event]);
    useEffect(() => {
        init();
    }, []);
    const selectAnswers = (id, answer_id) => {
        let exists = false;
        let newAnswers = answers.map((item) => {

            if (item.id === id) {
                exists = true;
                return { ...item, answer_id: answer_id };
            }
            return item;
        });
        if (!exists) {
            answers.push({
                id: id,
                answer_id: answer_id
            });

        } else {
            setAnswers(newAnswers);
        }
        setClicked(!clicked);

    }
    const checkSelected = (id, answer_id) => {
        let exist = false;
        answers.map((item) => {

            if (item.id === id && item.answer_id === answer_id) {
                exist = true
            }
            return item;
        });
        return exist
    }
    const submit = async () => {
        setAlert({});
        isSubmitLoading(true);
        if (eventFeedback.length == answers.length) {
            console.log(answers);
            let data = {
                'answers': answers,
                'event_id': event ? event.id : 0
            };
            const res = await GeneralApiData.EventFeedbackEvaluationUserAnswer(data);
            if (res && res.status_code == 200) {
                setAlert({
                    "message": "Thank you for your feedback",
                    "color": Colors.dark_blue_color,
                });
            } else {
                setAlert({
                    "message": "Please try again",
                    "color": Colors.red,
                });

            }

        } else {
            setAlert({
                "message": "Please answer all questions",
                "color": Colors.red,
            });
        }
        isSubmitLoading(false);

    }
    return (
        <Layout back={true}>
            <View style={styles.center}>
                <Text style={styles.feedbackTitle}>EVALUATION FEEDBACK</Text>
            </View>
            {loading ? (<>
                <ActivityIndicator />
            </>) : (<>
                <View style={styles.feedback}>
                    <Text style={styles.feedbackSubTitle}>Please rate the effectiveness of the speakers:</Text>

                    {eventFeedback.map((item, key) => {

                        return <View style={styles.questionContent} key={key}>
                            <Text style={styles.question}>{item.title}</Text>
                            <View style={styles.inline}>
                                {item.answers && item.answers.map((answer, key1) => {
                                    return <TouchableOpacity activeOpacity={.9} onPress={() => {
                                        selectAnswers(item.id, answer.id);
                                    }} style={styles.col} key={key1}>
                                        <View style={{
                                            ...styles.item,
                                            backgroundColor: (checkSelected(item.id, answer.id)) ? Colors.main_color : Colors.white,

                                        }}>
                                            <Text style={{ ...styles.answer, color: (checkSelected(item.id, answer.id)) ? Colors.white : Colors.main_color }}>{answer.title}</Text>
                                        </View>
                                        <Text style={styles.hint}>{answer.hint}</Text>
                                    </TouchableOpacity>

                                })}
                            </View>
                        </View>
                    })}
                    {alert.message ? <>
                        <View><Text style={{ ...styles.error, color: alert.color }}>{alert.message}</Text></View>
                    </> : <></>}
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
            </>
            )}
        </Layout>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    feedback: {
        flex: 1,
        width: Dimensions.get('screen').width,
        paddingHorizontal: 20
    },
    feedbackTitle: {
        color: Colors.main_color,
        fontSize: 25,
        fontFamily: "OpenSans-Bold",
        textTransform: "uppercase",
        marginVertical: 7,
    },
    feedbackSubTitle: {
        color: Colors.main_color,
        fontSize: 13,
        fontFamily: "OpenSans-Bold",
        textTransform: "capitalize",
        marginVertical: 10,
    },
    questionContent: {
        marginVertical: 10,

    },
    question: {
        fontSize: 15,
        fontFamily: "OpenSans-ExtraBold",
        color:Colors.grey_color

    },
    inline: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 10,

    },
    item: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: Colors.main_color,
        borderWidth: 4,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    answer: {
        fontSize: 16,
        color: Colors.main_color,
        fontFamily: "OpenSans-Bold",

    },
    hint: {
        fontSize: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "OpenSans-Bold",
        color: Colors.main_color,

    },
    button: {
        backgroundColor: Colors.main_color,
        width: 200,
        height: 50,
        borderRadius: 20,
        marginTop: 20
    },
    white: {
        color: Colors.white,
        fontFamily: "OpenSans-Bold",
    },
    error: {
        fontSize: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "OpenSans-Bold",


    },
});