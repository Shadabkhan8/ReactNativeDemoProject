

import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const EmailVerification = () => {
    const [otp, setOtp] = useState('');
    const inputRef = useRef();
    const navigation = useNavigation();

    const handleInputChange = (text) => {
        if (text.length <= 4) {
            setOtp(text);
        }
    };

    const handleBoxPress = () => {
        inputRef.current?.focus();
    };

    const handleContinue = () => {
        console.log('OTP Entered:', otp);
        // Add validation or API call here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {Platform.OS === 'ios' && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="chevron-left" size={40} color="#fff" />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerText}>OTP</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.emailHeaderText}>Email verification</Text>

                    <Text style={styles.instruction}>
                        Enter the verification code we sent you on: <Text style={styles.email}>Alberts******@gmail.com</Text>
                    </Text>

                    {/* Single hidden input */}
                    <TextInput
                        ref={inputRef}
                        style={styles.hiddenInput}
                        keyboardType="number-pad"
                        maxLength={4}
                        value={otp}
                        onChangeText={handleInputChange}
                        autoFocus={true}
                        cursorColor={'black'}
                        returnKeyType="done"
                    />

                    {/* Touchable boxes */}
                    <TouchableWithoutFeedback onPress={handleBoxPress}>
                        <View style={styles.otpContainer}>
                            {[0, 1, 2, 3].map((i) => (
                                <View key={i} style={styles.otpBox}>
                                    <Text style={styles.otpText}>{otp[i] || ''}</Text>
                                </View>
                            ))}
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResetPassword', { email: 'shadab@gmail.com'})}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 60 : 40,
        zIndex: 1,
    },
    header: {
        backgroundColor: '#009688',
        paddingVertical: 40,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 25,
    },
    emailHeaderText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    scrollContainer: {
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    image: {
        width: 220,
        height: 120,
        alignSelf: 'center',
        marginVertical: 20,
    },
    instruction: {
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 20,
        color: '#333',
    },
    email: {
        fontWeight: 'bold',
        color: '#000',
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpBox: {
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 10,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpText: {
        fontSize: 24,
        color: '#000',
    },
    button: {
        backgroundColor: '#009688',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        // Android shadow
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EmailVerification;
