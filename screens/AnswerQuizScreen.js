import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import questions from '../data/questions';

const AnswerQuizScreen = () => {
    const navigation = useNavigation();
    const { user_id } = useUser();
    const [quiz_data, setQuizData] = useState([]);
    //data to load multiple buttons for each quiz
    useEffect(() => {
        const final_quiz_object = []
        fetch(`http://localhost:9000/quiz/getquiz/${user_id}`)
            .then(res => {
                // console.log(res.status);
                // console.log(res.headers);
                return res.json();
            })
            .then(
                (result) => {
                    setQuizData(result);
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Unable to retrieve, please try again later.");
                }
            )
                
    }, [])



    const quizData = quiz_data;

    console.log(quizData)
    return (
        <SafeAreaView style={styles.container}>
            <View >
            {quizData.map((quizItem, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.customButton}
                        onPress={() => navigation.navigate("InitiateQuizScreen", {
                            quizItem: quizItem,
                        })}
                    >
                        <Text style={styles.buttonText}>{quizItem.quiz_title} - {quizItem.quiz_id}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

export default AnswerQuizScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    customButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        margin: 5,
        padding: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})
