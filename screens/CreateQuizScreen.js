import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView,TouchableWithoutFeedback, ViewBase } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dropdown } from 'react-native-element-dropdown';
import InfoPopupModal from './InfoPopupModal';
import DropdownModalScreen from './DropdownModalScreen';


const emojis = [
    require('../images/one.png'),
    require('../images/two.png'),
    require('../images/three.png'),
    require('../images/four.png'),
    require('../images/five.png'),
    require('../images/six.png'),
]


export default function CreateQuizScreen({ navigation, route }) {
   const quiz_item = route.params;




    const [isModalVisible, setModalVisible] = useState(false);
    const [isDropdownModalScreen, setDropdownModalScreenOpen] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



    const { user_id } = useUser();
    const Dropdown_data = [
        { label: 'Multiple Choice', questionType: 'Multiple-Choice' },
        { label: 'Open Ended', questionType: 'Open-Ended' },
        { label: 'Likert Scale', questionType: 'Likert-Scale' },
    ];
      
   
    const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(1);
    const [questionType, setquestionType] = useState('Multiple-Choice');
    const [isFocus, setIsFocus] = useState(false);
    const [quiz_id, setQuizId] = useState(generateRandomQuizId());
    const [quiz_title, setQuiztitle] = useState('');
    const initialFormState = {
        question_type: 'Multiple-Choice',
        question_id: '',
        question_text: '',
        question_weight: '',
        options: [
            {
                option_id: 1,
                option_text: "",
                option_weight: "",
            },
            {
                option_id: 2,
                option_text: "",
                option_weight: "",
            },
            {
                option_id: 3,
                option_text: "",
                option_weight: "",
            },
            {
                option_id: 4,
                option_text: "",
                option_weight: "",
            },
        ],
    }

    const [form, setFormData] = useState(initialFormState);

    
   
    
    function generateRandomQuizId() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    const [final_quiz_data, setFinal_Quiz_Data] = useState({
        user_id: user_id,
        quiz_id: quiz_id,
        quiz_title: quiz_title,
        assigned_to_user_id: '',
        questions: []
    })

    const updatedFinalQuizData = { ...final_quiz_data };

   
      
//    console.log(updatedFinalQuizData.questions, 'quizdata');
//    console.log(updatedFinalQuizData.questions.question_id, 'question id')
  
   const questonindex = currentQuestionIndex;

//    console.log(questonindex);
   const isQuestionIdPresent = updatedFinalQuizData.questions.some(
    (question) => question.question_id === questonindex
  );
  
  if (isQuestionIdPresent) {
    console.log('There is a question with question_id equal to 1.');
  } else {
    console.log('No question with question_id equal to 1 found.');
  }

   
    useEffect(() => {
        
        if (!isQuestionIdPresent && quiz_item?.quizItem?.quiz_title  ) {
            const { quizItem } = quiz_item;
            const data = quizItem;
           
          
            const QuizTitle = data.quiz_title
    
            setQuiztitle(QuizTitle);
            setQuizId(quiz_item.quizItem.quiz_id)

            const currentQuestion = data.questions[currentQuestionIndex - 1];

            

            // Set the form with the current question data
            setFormData({
              question_type: currentQuestion.question_type,
              question_id: currentQuestion.question_id,
              question_text: currentQuestion.question_text,
              question_weight: currentQuestion.question_weight,
              options: currentQuestion.options.map((option, index) => ({
                option_id: option.option_id,
                option_text: option.option_text,
                option_weight: option.option_weight,
              })),
            });

            setquestionType(currentQuestion.question_type);

            setFinal_Quiz_Data({
                ...final_quiz_data,
                quiz_id: quiz_item.quizItem.quiz_id,
                quiz_title: QuizTitle,
            });

        }  else {
            const randomQuizId = generateRandomQuizId();
            setQuizId(randomQuizId);
    
           
            setFinal_Quiz_Data({
                ...final_quiz_data,
                quiz_id: randomQuizId,
                
            });
        }
    }, [quiz_item?.quizItem?.quiz_title, quiz_item?.quizItem?.questions, quiz_item?.quizItem?.quiz_id, currentQuestionIndex]);
      

   


    function clearFormData() {
        setFormData(initialFormState);
    }

  
    function handlechange(label, value) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [label]: value,
        }))
    }

    function validateform() {
        //validation
        //check if there is a title 
        if (quiz_title.trim() === '') {
            Alert.alert('Please enter a title for quiz');
            return false;
        }
        else {
            // check if there is a question
            if (form.question_text.trim() === '') {
                Alert.alert('Please enter a question');
                return false;
            }
            else {

                if (form.question_type === 'Likert-Scale') {
                    return true;
                }
                // check if cumulative scores is equal to 10
                var totalScore = 0
                var throw_option_error = false
                form.options.forEach((item) => {
                    totalScore = totalScore + parseInt(item.option_weight, 10);

                    // check if all the options are entered
                    if (item.option_text.trim() === '') {
                        throw_option_error = true;
                    }
                })

                // throw an alert if any one of the option is not filled 
                if (throw_option_error) {
                    Alert.alert('Please fill all the options');
                    return false;
                }

            }
        }
        return true;
    }

    function handleNextQuestion() {
        // push current question to questions array in final_quiz_data object, change current index to index+1
        const validationStatus = validateform();
        if (validationStatus) {
            const prevQuestionData = final_quiz_data.questions[currentQuestionIndex ]
            const updatedFinalQuizData = { ...final_quiz_data };
            const questionToAdd = { ...form };
            questionToAdd.question_id = currentQuestionIndex;
            const existingQuestion = updatedFinalQuizData.questions.find(
                (question) => question.question_id === questionToAdd.question_id
              );
              
              if (existingQuestion) {
              
                const indexToUpdate = updatedFinalQuizData.questions.indexOf(existingQuestion);
                updatedFinalQuizData.questions[indexToUpdate] = questionToAdd;
              } else {
                // If no existing question is found, push the new question
                updatedFinalQuizData.questions.push(questionToAdd);
              }
            
            setFinal_Quiz_Data(updatedFinalQuizData);
            setCurrentQuestionsIndex(currentQuestionIndex + 1);
          
            if (prevQuestionData) {
                setquestionType(prevQuestionData ? prevQuestionData.question_type : 'Multiple-Choice');
                setFormData({ ...prevQuestionData }); 
              } else {
                clearFormData();
                handlechange('question_type', 'Multiple-Choice');
              }
            
           
        }
    }
    function handleBackButton() {
        const prevIndex = currentQuestionIndex - 2; // -2 because currentQuestionIndex Starts with 1
        clearFormData();
        const prevQuestionData = final_quiz_data.questions[prevIndex]
        const updatedFinalQuizData = { ...final_quiz_data };
        const questionToAdd = { ...form };
            questionToAdd.question_id = currentQuestionIndex;
            const existingQuestion = updatedFinalQuizData.questions.find(
                (question) => question.question_id === questionToAdd.question_id
              );
              
              if (existingQuestion) {
              
                const indexToUpdate = updatedFinalQuizData.questions.indexOf(existingQuestion);
                updatedFinalQuizData.questions[indexToUpdate] = questionToAdd;
              } else {

                updatedFinalQuizData.questions.push(questionToAdd);
              }
        setFinal_Quiz_Data(updatedFinalQuizData);
        setCurrentQuestionsIndex(currentQuestionIndex - 1);
        setquestionType(prevQuestionData.question_type);
        setFormData(prevQuestionData);
    }

    function navigateToEndScreen() {
        // push last question to final_quiz_data object, convert object to json, navigate to quiz end screen.
        const validationStatus = validateform();
        if (validationStatus) {
            const updatedFinalQuizData = { ...final_quiz_data };
            const questionToAdd = { ...form };
            questionToAdd.question_id = currentQuestionIndex;
            const existingQuestion = updatedFinalQuizData.questions.find(
                (question) => question.question_id === questionToAdd.question_id
              );
              
              if (existingQuestion) {
              
                const indexToUpdate = updatedFinalQuizData.questions.indexOf(existingQuestion);
                updatedFinalQuizData.questions[indexToUpdate] = questionToAdd;
              } else {
                // If no existing question is found, push the new question
                updatedFinalQuizData.questions.push(questionToAdd);
              }
            setFinal_Quiz_Data(updatedFinalQuizData);
            var jsonData = []
            jsonData.push(final_quiz_data)
            console.log("Json Data = ",jsonData);
            const jsonString = JSON.stringify(jsonData);
            console.log("this is the json string -",jsonString);

            // push the data to DB
            fetch("http://localhost:9000/quiz/addquiz",{
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: jsonString
            })
            .then(res => {
                // console.log(res.status);
                // console.log(res.headers);
                return res.json();
            })
            .then(
                (result)=> {
                    console.log("this is the result -",result);
                },
                (error) => {
                    console.log("this is the error -",error);
                    Alert.alert("Unable to save the quiz, please try again later.");
                    return;
                }
            )
            navigation.navigate('CreateQuizEndScreen');
        }
    }

    function handleCloseButton() {
        navigation.navigate('HomeScreen');
    }

  

  

    const handleScoreSelection = (index) => {
        setSelectedOptionIndex(index);
        setDropdownModalScreenOpen(true);
      };

      const handleImageSelection = (selectedImageValue) => {
        const updatedForm = { ...form };
        updatedForm.options[selectedOptionIndex].option_weight = selectedImageValue;
        setFormData(updatedForm);
        setDropdownModalScreenOpen(false);
      };

    return (
        <ImageBackground
            source={require('../images/background-image.png')}
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.TopButtons}>
                   
                        <TouchableOpacity
                          
                            style={styles.BackButton}
                            onPress={handleCloseButton}
                        >
                            <Image
                                source={require('../images/Close-Button.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity   style={styles.InfoButton}
                        onPress={toggleModal}>
                        <Image
                                source={require('../images/Information.png')}
                            />
      </TouchableOpacity>

      <InfoPopupModal isVisible={isModalVisible} onClose={toggleModal} />

                        </View>

                   
                    <MaskedView
                        maskElement={<Text style={styles.Heading}>Create Your Own Quiz</Text>}
                    >
                        <LinearGradient
                            colors={['#C7554D', '#DFD07E', '#0C7DB6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.Heading, { opacity: 0 }]}>Create Your Own Quiz</Text>
                        </LinearGradient>
                    </MaskedView>

                  
                    <TextInput
                        placeholder='Type Quiz title'
                        style={styles.QuizTitle}
                        onChangeText={(title) => {
                            setQuiztitle(title)
                            const updatedFinalQuizData = { ...final_quiz_data };
                            updatedFinalQuizData.quiz_title = title;
                            setFinal_Quiz_Data(updatedFinalQuizData);
                        }}
                        value={quiz_title}
                    >
                    </TextInput>

                    <Text style={styles.Question_Text}>Question {currentQuestionIndex}</Text>

                    <View style={styles.DropDownContainer}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={Dropdown_data}
                            maxHeight={150}
                            labelField="label"
                            valueField="questionType"
                            value={questionType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setquestionType(item.questionType);
                                setIsFocus(false);
                                clearFormData();
                                handlechange('question_type', item.questionType);
                            }}
                        />
                    </View>

                    <TextInput
                        placeholder='Type your question'
                        style={[styles.QuizTitle, { marginTop: 24 }]}
                        multiline
                        onChangeText={(q_text) => handlechange('question_text', q_text)}
                        value={form.question_text}
                    >
                    </TextInput>


                     {/* Options for Multiple ChoiceStart Here*/}
                     {
                        questionType === "Multiple-Choice" && (
                            <>
                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type answer'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[0].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[0].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(0)}>
                                    <Image
                                        source={form.options[0].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[0].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[0].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type answer'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[1].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[1].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(1)}>
                                    <Image
                                        source={form.options[1].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[1].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[1].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type answer'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[2].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[2].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(2)}>
                                    <Image
                                        source={form.options[2].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[2].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[2].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type answer'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[3].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[3].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(3)}>
                                    <Image
                                        source={form.options[3].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[3].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[3].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.TextmessageContainer}>
                        <Text style={styles.Textmessage}>Answer to your own question by selecting an emoji. 
                        Remember, this will help connect with like-minded individuals</Text>
                        </View>
                            </>
                        )
                    }

                    {/* Options for Open Ended Start Here*/}

                    {
                        questionType === "Open-Ended" && (
                            <>
                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type keyword'
                                        style={[styles.AnswerBox]}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[0].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[0].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(0)}>
                                    <Image
                                        source={form.options[0].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[0].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[0].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type keyword'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[1].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[1].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(1)}>
                                    <Image
                                        source={form.options[1].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[1].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[1].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type keyword'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[2].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[2].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(2)}>
                                    <Image
                                        source={form.options[2].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[2].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[2].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.Answer_And_Score_Container}>
                                    <TextInput
                                    multiline
                                        placeholder='Type keyword'
                                        style={styles.AnswerBox}
                                        onChangeText={(answer) => {
                                            const updatedForm = { ...form };
                                            updatedForm.options[3].option_text = answer;
                                            setFormData(updatedForm);
                                        }}
                                        value={form.options[3].option_text}
                                    >
                                    </TextInput>
                                    <TouchableWithoutFeedback onPress={() => handleScoreSelection(3)}>
                                    <Image
                                        source={form.options[3].option_weight === 1 ? require('../images/emoji1.png') :
                                                form.options[3].option_weight === 2 ? require('../images/emoji2.png') :
                                                form.options[3].option_weight === 3 ? require('../images/emoji3.png') :
                                                require('../images/emoji4.png')}
                                        style={styles.ScoreBox}
                                        />
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.TextmessageContainer}>
                        <Text style={styles.Textmessage}>Answer to your own question by selecting an emoji. 
                        Remember, this will help connect with like-minded individuals</Text>
                        </View>
                            </>
                        )
                    }

                    {/* Options for Likert Scale Start Here*/}

                    {questionType === 'Likert-Scale' && (
                        <>
                        <View style={styles.Emoji_Container}>
                            {emojis.map((emoji, index) => (
                                <TouchableOpacity
                                    key={index.toString()}
                              
                                >
                                    <Image
                                        source={emoji}
                                        style={styles.Emoji_Image}
                                    />
                                </TouchableOpacity>
                            ))}
                     </View>
                        <View style={styles.TextmessageContainer}>
                        <Text style={styles.Textmessage}>Answer to your own question by selecting an emoji. 
                        Remember, this will help connect with like-minded individuals</Text>
                        </View>
                        </>
                                            
                    )}
        
        <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={{ flex: 1 }}
    >
                   
                    {currentQuestionIndex != 1 &&
                        <TouchableOpacity
                        style={styles.Previous_Button}
                        disabled={currentQuestionIndex === 1}
                        onPress={handleBackButton} >   
                               <Image style={styles.Arrow} source={require('../images/Left-Arrow.png')}  />                 
                               <Text style={styles.Previous_Button_Text}>Previous</Text>
                        </TouchableOpacity>}

                    {/* if its not a last question then next button will appear if not submit will appear*/}

                    {currentQuestionIndex < 3 && (
                        <TouchableOpacity
                            style={styles.Next_Button}
                            onPress={handleNextQuestion}
                        >
                           <Text style={styles.Previous_Button_Text}>Next</Text>
                           <Image source={require('../images/Right-Arrow.png')}  />  
                          
                        </TouchableOpacity>
                    )}
                

                    {currentQuestionIndex === 3 && (
                        <TouchableOpacity
                            style={styles.Submit_Button}
                            onPress={navigateToEndScreen}
                        >
                            <Text style={styles.Previous_Button_Text}>Submit</Text>

                        </TouchableOpacity>
                    )}

</KeyboardAvoidingView>
                    
                    <DropdownModalScreen
                            isVisible={isDropdownModalScreen}
                            onClose={() => setDropdownModalScreenOpen(false)}
                            onSelectImage={handleImageSelection}
                        />

                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
    },

    TopButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    BackButton: {
        marginTop: 29,
        marginLeft: 24,
        width: 30,
        height: 30
    },
    InfoButton: {
        marginTop: 29,
        marginRight: 24,
        width: 30,
        height: 30,
       
    },
    Heading: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'KaiseiDecol-Regular',
        backgroundColor: 'transparent',
        marginTop: 17,
        lineHeight: 24,
    },
    QuizTitle: {
        fontFamily: 'KaiseiDecol-Bold',
        color: '#3D5A80',
        fontWeight: '600',
        fontSize: 13,
        width: 318,
        height: 40,
        borderRadius: 24,
        borderColor: '#CAB8B8',
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 40,
    },
    Question_Text: {
        color: '#C7554D',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginTop: 42,
        marginLeft: 40,
    },
    DropDownContainer: {
        width: 147,
        height: 35,
        borderRadius: 24,
        borderColor: 'solid #CAB8B8',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        paddingLeft: 15,
        marginLeft: 40,
        marginTop: 17
    },
    OptionDropDownContainer: {
        width: 150,
        height: 35,
        borderBottomWidth: 1,
        borderRadius: 24,
        borderColor: 'solid #CAB8B8',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        marginTop: 19,
        marginLeft: 10,
    },
    selectedTextStyle: {
        color: '#727272',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
    },
    Answer_And_Score_Container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AnswerBox: {
        color: '#3D5A80',
        width: 244,
        borderBottomColor: '#727272',
        borderBottomWidth: 1,
        marginTop: 19,
       marginBottom: 5
    },
    ScoreBox: {
        width: 40,
        height: 40,
        borderBottomWidth: 1,
        marginTop: 15,
        marginLeft: 10,
    },
    Previous_Button: {
        position: 'absolute',
        bottom: 15, 
        left: 20,
        display: 'flex',
        flexDirection: 'row'
        
    },
    Previous_Button_Text: {
        color: '#0077B9',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'KaiseiDecol-Bold'
    },
    Arrow: {
     bottom: 3
    },
    Next_Button: {
        display: 'flex',
        flexDirection: 'row',
    position: 'absolute',
    bottom: 15, 
    right: 20,
    },
    Submit_Button: {
        display: 'flex',
        flexDirection: 'row',
    position: 'absolute',
    bottom: 20, 
    right: 20,
    },
    Next_Button_Text: {
        color: '#0077B9',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'KaiseiDecol-Bold',
    
        
    },
    Emoji_Container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Emoji_Image: {
        height: 66,
        width: 50,
    },
    TextmessageContainer: {
    
        justifyContent: 'center',
        width: '80%'
    },
    Textmessage: {
        marginTop: 20,
        color: '#727272',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 12,
        marginLeft: 70,
        textAlign: 'center'
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginLeft: 100, 
        marginTop: 20, 
      },
      Progress_Bar: {
        width: 20,
        height: 20,
        marginRight: 8, 
      },
      Progress_Bar_Fill_Container: {
        flexDirection: 'row',
        position: 'absolute'
      },
      Progress_Bar_Fill: {
        width: 20,
        height: 20,
        marginRight: 8,
        zIndex: 1,  
      },
});