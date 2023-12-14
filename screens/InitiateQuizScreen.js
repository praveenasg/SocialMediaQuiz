import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const InitiateQuizScreen = ({ route }) => {
    const navigation = useNavigation();
    const { quizItem } = route.params;
    return (
        <ImageBackground
            source={require('../images/background-image.png')}
        >
            <SafeAreaView >
                <View style={styles.container}>
                    <View style={styles.commonMargin}>

                        <MaskedView
                            maskElement={<Text style={styles.Heading}>User- {quizItem.user_id}'s</Text>}
                        >
                            <LinearGradient
                                colors={['#C7554D', '#DFD07E', '#0C7DB6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={[styles.Heading, { opacity: 0 }]}>User- {quizItem.user_id}'s</Text>
                            </LinearGradient>

                        </MaskedView>

                        <MaskedView
                            maskElement={<Text style={styles.Heading}>Personality Quiz</Text>}
                        >
                            <LinearGradient
                                colors={['#C7554D', '#DFD07E', '#0C7DB6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={[styles.Heading, { opacity: 0 }]}>Personality Quiz</Text>
                            </LinearGradient>
                        </MaskedView>

                        <View style={styles.middleParagraph}>
                            <Text style={styles.centerAlignedText}>Uncover your unique personality traits and find ideal matches in minutes with
                                our intuitive personality quiz.
                            </Text>

                            <Text style={styles.centerAlignedText}>
                                Join now to unlock a world of meaningful connecions based on your true self
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Quiz", {
                            quizItem: quizItem,
                        })}>
                            <Text style={styles.startQuizButton}>Let's go!</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default InitiateQuizScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '70%',
        margin: '30%',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    commonMargin: {
        marginLeft: 42,
        marginRight: 42
    },
    Heading: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'KaiseiDecol-Regular',
        backgroundColor: 'transparent',
    },
    middleParagraph: {
        paddingTop: 49,
        paddingBottom: 53
    },
    centerAlignedText: {
        textAlign: 'center',
        color: '#727272',
        fontFamily: 'KaiseiDecol-Regular',
        fontSize: 15,
        fontWeight: '400',
        padding: 20
    },
    startQuizButton: {
        color: '#0077B9',
        textAlign: 'center',
        fontFamily: 'KaiseiDecol-Regular',
        fontWeight: '700',
    }
})