import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const HomeScreen = (navigationGuestures) => {
    const navigation = useNavigation();

    // prevent from going back
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            gestureEnabled : false,
        })
    },[navigationGuestures]);

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={()=> navigation.navigate("CreateQuizStartScreen")}
                >
                    <Text style={styles.buttonText}>Create Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={()=> navigation.navigate("ViewQuizScreen")}
                >
                    <Text style={styles.buttonText}>View Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={()=> navigation.navigate("AnswerQuizScreen")}
                >
                    <Text style={styles.buttonText}>Answer Quiz</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen

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
        fontWeight: 'bold',
        textAlign:'center'
    }
})