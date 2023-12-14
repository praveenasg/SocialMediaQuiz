import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AnswerQuizScreen from './screens/AnswerQuizScreen';
import QuizScreen from './screens/QuizScreen';
import LoginScreen from './screens/LoginScreen';
import InitiateQuizScreen from './screens/InitiateQuizScreen';
import QuizCompleteScreen from './screens/QuizCompleteScreen';
import CreateQuizStartScreen from './screens/CreateQuizStartScreen';
import CreateQuizScreen from './screens/CreateQuizScreen';
import CreateQuizEndScreen from './screens/CreateQuizEndScreen';
import ViewQuizScreen from './screens/ViewQuizScreen';

const StackNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateQuizStartScreen" component={CreateQuizStartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateQuizEndScreen" component={CreateQuizEndScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AnswerQuizScreen" component={AnswerQuizScreen} options={{ headerShown: false }} />
                <Stack.Screen name="InitiateQuizScreen" component={InitiateQuizScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }} />
                <Stack.Screen name="QuizCompleteScreen" component={QuizCompleteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ViewQuizScreen" component={ViewQuizScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})