import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function CreateQuizEndScreen({ navigation }) {
  const startQuiz = () => {
    navigation.navigate('CreateQuizScreen'); // Navigate to the Quiz screen
  }

  return (
    <ImageBackground
      source={require('../images/background-image.png')}
      style={{height:'100%'}}
    >
                           <TouchableOpacity
                            style={styles.BackButton}
                            onPress={startQuiz}
                        >
                            <Image
                                source={require('../images/Back-Icon.png')}
                            />
                        </TouchableOpacity>
      <View style={styles.popup}>
      <SafeAreaView >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                        <MaskedView
                        maskElement={<Text style={styles.headerText}>Well Done!</Text>}
                    >
                        <LinearGradient
                            colors={['#C7554D', '#DFD07E', '#0C7DB6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.headerText, { opacity: 0 }]}>Well Done!</Text>
                        </LinearGradient>
                    </MaskedView>
                        </View>
                        <Text style={styles.textstyle}>
                        {'\n'}Want to review your quiz?{'\n'} Simply go back and make any {'\n'} adjustments.{'\n'}
                        </Text>
                        <Text style={styles.textstyle}>
                            If not, you're all set to explore {'\n'}new connections!{'\n'}
                        </Text>
                        <Text style={styles.textstyle}>
                            Both parties get to see the {'\n'} answers once your contact finish {'\n'} the quiz.{'\n\n'}
                        </Text>
                    </View>

                    <TouchableOpacity
                    >
                        <Text style={styles.title}>Launch Quiz!{'\n\n'}</Text>

                    </TouchableOpacity>

                </View>
            </SafeAreaView>
      </View>
    </ImageBackground>

  );

}


const styles = StyleSheet.create({

    popup: {
    marginHorizontal: 30,
    marginTop: 60,
  
      backgroundColor: 'white', 
     elevation: 3,
      borderRadius: 3
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    BackButton: {
        marginTop: 60,
        marginLeft: 24,
        width: 30,
        height: 30
    },
    header: {
      paddingTop: 50,
      paddingBottom: 30,
      alignItems: 'center',
  
    },
    headerText: {
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '400',
      textAlign: 'center',
      fontFamily: 'KaiseiDecol-Regular',
      backgroundColor: 'transparent',
    },
    content: {
      width: '80%', 
      textAlign: 'center',
      justifyContent: 'center'
    },
    textstyle: {
      color: '#727272',
      fontSize: 15,
      fontFamily: 'KaiseiDecol-Regular',
      fontWeight: '400',
      marginTop: 10,
      textAlign: 'center', 
      justifyContent: 'center'
    },
    textstylebold: {
      color: '#727272',
      fontSize: 16,
      fontFamily: 'KaiseiDecol-Regular',
      fontWeight: '700',
      marginTop: 5,
      textAlign: 'center', 
      justifyContent: 'center',
      lineHeight: 25
    },
    title: {
      color: '#0077B9',
      fontSize: 16,
      fontFamily: 'KaiseiDecol-Bold',
      fontWeight: '600',
      textAlign: 'center',
      paddingBottom: 30
    },
    subtitle: {
      fontSize: 16,
      margin: 10,
    }
  }
  
  
  
  
  );