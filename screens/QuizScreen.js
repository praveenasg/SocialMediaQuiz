import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const QuizScreen = ({ route, navigationGuestures }) => {
    const { quizItem } = route.params;

    console.log(quizItem);
    const data = quizItem
    const { user_id } = useUser();
    const navigation = useNavigation();

    const emojis = [
        require('../images/one.png'),
        require('../images/two.png'),
        require('../images/three.png'),
        require('../images/four.png'),
        require('../images/five.png'),
        require('../images/six.png'),
    ];

    // prevent from going back
    React.useLayoutEffect(() => {
        navigation.setOptions({
            gestureEnabled: false,
        })
    }, [navigationGuestures]);

    // for open ended questions 
    const [open_ended_answer, setOpen_ended_answer] = useState();

    //points for ranking
    const [points, setPoints] = useState(0);

    //total questions variable 
    const totalQuestions = data.questions.length;

    //index for looping through questions
    const [index, setIndex] = useState(0);

    const currentQueston = data.questions[index];

    //option is clicked or not?
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    //progressPercentage
    const progressPercentage = Math.floor((index / totalQuestions) * 100);

    //increase the points for every question answered
    useEffect(() => {
        if (selectedAnswerIndex !== null) {
            setPoints((prevPoints) => prevPoints + currentQueston?.options[selectedAnswerIndex].option_weight);
            setIndex(index + 1);
        }
    }, [selectedAnswerIndex])

    // reset the values after every question
    useEffect(() => {
        setSelectedAnswerIndex(null);
    }, [currentQueston])

    //handle the end of questions
    useEffect(() => {
        if (index + 1 > data.questions.length) {
            const saveData = {
                points: points,
                user_id: user_id,
                quiz_id: data.quiz_id,
            }
            const jsonString = JSON.stringify(saveData);
            console.log(jsonString);
            navigation.navigate("QuizCompleteScreen");
        }
    }, [currentQueston])

    // console.log(currentQueston);

    return (
        <ImageBackground
            source={require('../images/background-image.png')}
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.questionsAndAnswerView}>
                        <View style={styles.questionbox}>
                            <Text style={styles.questionText}>{currentQueston?.question_text}</Text>
                        </View>
                        {
                            (index + 1 <= data.questions.length) && (
                                <>
                                    {
                                        currentQueston.question_type == "Multiple-Choice" && (
                                            <View>
                                                {currentQueston?.options.map((item, index) => (
                                                    <TouchableOpacity key={index} style={styles.optionButton} onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}>
                                                        <Text style={styles.optionText}>{item.option_text}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )
                                    }

                                    {
                                        currentQueston.question_type == "Open-Ended" && (
                                            <View>
                                                {currentQueston?.options.map((item, index) => (
                                                    <TouchableOpacity key={index} style={styles.optionButton} onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}>
                                                        <Text style={styles.optionText}>{item.option_text}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )
                                    }

                                    {
                                        currentQueston.question_type == "Likert-Scale" && (

                                            <View style={styles.Emoji_Container}>
                                                {emojis.map((emoji, emoji_index) => (
                                                    <TouchableOpacity
                                                        key={emoji_index.toString()}
                                                        onPress={() => {
                                                            setPoints((prevPoints) => prevPoints + emoji_index + 1);
                                                            setIndex(index + 1);
                                                        }}
                                                    >
                                                        <Image
                                                            source={emoji}
                                                            style={styles.Emoji_Image}
                                                        />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )
                                    }
                                </>
                            )
                        }


                    </View>
                    <View style={styles.progressBarView}>
                        <View style={styles.progressBar}>
                            <View style={{
                                backgroundColor: 'green',
                                height: 10,
                                borderRadius: 10,
                                position: 'absolute',
                                left: 0,
                                width: `${progressPercentage}%`,
                            }}></View>
                        </View>
                    </View>
                    {/* <View style={styles.progressBarImage}>
                            <Image
                                source={require('../images/Progress-Bar.png')}
                            />
                        </View> */}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    questionsAndAnswerView: {
        height: '85%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionbox: {
        margin: 40,
        width: 312
    },
    questionText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#C66E39',
        fontFamily: 'Inter-Regular',
        fontSize: 24,
        fontWeight: '400',
        letterSpacing: -0.48,
    },
    optionButton: {
        backgroundColor: 'white',
        margin: 5,
        height: 60,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    optionText: {
        width: 294,
        height: 'auto',
        color: '#727272',
        textAlign: 'center',
        fontFamily: 'Inter-Italic',
        fontWeight: '400',
        letterSpacing: -0.32,
    },
    // progressBarImage:{
    //     justifyContent:'center',
    //     height:'27%',
    //     alignItems:'center'
    // },
    progressBarView: {
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressBar: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 350,
        flexDirection: 'row',
        alignItems: 'center',
        height: 10,
        justifyContent: 'center',
    },
    Emoji_Container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 44,
        marginLeft: 36
    },
    Emoji_Image: {
        height: 66,
        width: 50,
    },
    Next_Button: {
        marginRight: 37,
        marginTop: 90,
        alignSelf: 'flex-end',
    },
    Next_Button_Text: {
        color: '#0077B9',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'KaiseiDecol-Regular',
    },
})