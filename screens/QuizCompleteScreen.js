import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const QuizCompleteScreen = ({ navigation }) => {
    const navigationScreen = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            gestureEnabled: false,
        })
    }, [navigation]);
    return (
        <ImageBackground
            source={require('../images/background-image.png')}
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <Image 
                        source={require('../images/check-mark-icon.png')}
                    />
                    <Text style={styles.success}>Success!</Text>
                    <Text style={styles.successText}>You have completed your</Text>
                    <Text style={styles.successText}>Personality Quiz</Text>
                    <Text style={styles.thankYou}>Thank You!</Text>
                    <TouchableOpacity style={styles.goHome} onPress={() => navigationScreen.navigate("HomeScreen")}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Go Home</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default QuizCompleteScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        color: '#727272',
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.4,
    },
    success: {
        marginBottom:13.31,
        marginTop:19.63,
        color: '#727272',
        fontFamily: 'Inter-Regular',
        fontSize: 35,
        fontWeight: '500',
        lineHeight: 35,
        letterSpacing: -0.7,
    },
    thankYou: {
        color: '#727272',
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.4,
        margin: 10,
    },
    goHome: {
        backgroundColor: 'green',
        borderRadius: 10,
        margin: 5,
        padding: 10,
    }
})