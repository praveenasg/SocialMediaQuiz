import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [user_input] = useState();
    const { user_id, setUser_id } = useUser();

    const handleButtonClick = (text) => {
        setUser_id(text);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text"
                    id='user_input'
                    onChangeText={handleButtonClick}
                    value={user_input}
                />
            </View>
            <View >
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 30,
        width: 200,
        borderRadius: 5,
        textAlign: 'center'
    },
    customButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        margin: 5,
        padding: 10,
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})