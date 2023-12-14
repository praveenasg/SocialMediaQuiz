import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function CreateQuizStartScreen({ navigation }) {
  const startQuiz = () => {
    navigation.navigate('CreateQuizScreen'); // Navigate to the Quiz screen
  }

 
  function handleCloseButton() {
    navigation.navigate('HomeScreen');
}


  return (
    <ImageBackground
      source={require('../images/background-image.png')}
      style={{height:'100%'}}
    >
 <TouchableOpacity
                          
                          style={styles.BackButton}
                          onPress={handleCloseButton}
                      >
                          <Image
                              source={require('../images/Close-Button.png')}
                          />
        </TouchableOpacity>
      <View style={styles.popup}>
      <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
          <MaskedView
                        maskElement={<Text style={styles.headerText}>Create Your Own Quiz</Text>}
                    >
                        <LinearGradient
                            colors={['#C7554D', '#DFD07E', '#0C7DB6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.headerText, { opacity: 0 }]}>Create Your Own Quiz</Text>
                        </LinearGradient>
                    </MaskedView>
          </View>
          <Text style={styles.textstyle}>
            Prepare to mingle and connect!{'\n'}{'\n'}You have the opportunity to create your choice of 8 captivating questions that will help you get to know your kindred spirits better. Cook up some{'\n'}
          </Text>
         
          <Text style={styles.textstyle}>
            Multiple Choice Questions, stir in some Likert Scale Questions, and add a dash of Open-Ended Questions.{'\n\n'}
            Let your creativity run wild, 
          </Text>
          <View>
          <Text style={styles.textstylebold}>
          and don't forget to select your  {'\n'} 
             own answers for a fun
          </Text></View>
          <Text style={styles.lasttextstyle}>
            comparison with other users!{'\n'}
          </Text>
      
           <TouchableOpacity
            onPress={()=> navigation.navigate("CreateQuizScreen")}
                    >
                        <Text style={styles.GoButton}>Let's Go!{'\n\n'}</Text>

                    </TouchableOpacity>


        </View>

        

      </View>
      </SafeAreaView>
      </View>
    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  popup: {
  marginHorizontal: 30,
  marginTop: 40,

    backgroundColor: 'white', 
   elevation: 3,
    borderRadius: 3
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 40,
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
    lineHeight: 24
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
  lasttextstyle: {
    color: '#727272',
    fontSize: 15,
    fontFamily: 'KaiseiDecol-Regular',
    fontWeight: '400',
    textAlign: 'center', 
    justifyContent: 'center'
  },
  textstylebold: {
    color: '#727272',
    fontSize: 16,
    fontFamily: 'KaiseiDecol-Bold',
    fontWeight: '600',
    textAlign: 'center', 
    justifyContent: 'center',
    lineHeight: 25
  },
  title: {
    color: '#0077B9',
    fontSize: 16,
    fontFamily: 'KaiseiDecol-Regular',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 30,
    paddingTop: 30
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
  },
  BackButton: {
    marginTop: 39,
    marginBottom: 20,
    marginLeft: 29,
    width: 70,
    height: 17
},


GoButton: {
  marginTop: 10,
  color: '#0077B9',
  fontSize: 16,
  fontFamily: 'KaiseiDecol-Bold',
  fontWeight: '600',
  textAlign: 'center',
}
}




);