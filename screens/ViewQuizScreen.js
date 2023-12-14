import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import questions from '../data/questions';




const ViewQuizScreen = ({ navigation }) => {


    const { user_id } = useUser();
    const [quiz_data, setQuizData] = useState([]);

    //data to load multiple buttons for each quiz
    useEffect(() => {
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


    return (
        <SafeAreaView style={styles.container}>
            <View >

                {quizData.map((quizItem, index) => (
                    <View style={styles.buttonContainer} key={index}>
                        <TouchableOpacity
                            style={styles.customButton}
                            onPress={() => navigation.navigate("CreateQuizScreen", {
                                quizItem: quizItem
                            })}
                        >
                            <Text style={styles.buttonText}>Quiz {quizItem.quiz_id}</Text>
                        </TouchableOpacity>

                    </View>
                ))}



            </View>

        </SafeAreaView>
    );
}

export default ViewQuizScreen

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    scoreText: {
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
        margin: 5,
        padding: 10,
        fontWeight: 'bold',
        marginLeft: 80
    }
})