import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { findUserByEmail, storeOTP } from '../../utils/storageHelpers';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        const user = await findUserByEmail(email);
        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            await storeOTP(email, otp);
            Alert.alert('OTP Sent', `Your OTP is: ${otp}`);
            navigation.navigate('EmailVerification', { email });
        } else {
            Alert.alert('User Not Found', 'No account found with this email');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {Platform.OS === 'ios' ? (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="chevron-left" size={40} color="#fff" />
                    </TouchableOpacity>
                ) : null}
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image
                        source={require('/Users/iemac/ReactNative/SignUpDemo/assets/images/Eating_together_bro.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <Text style={styles.instruction}>
                        Enter your email address and we’ll send you a confirmation code to reset your password.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Icon name="email" size={20} color="#333" style={styles.icon} />
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleReset}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ForgotPasswordScreen;

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

    image: {
        width: 220,
        height: 120,
        alignSelf: 'center',
        marginVertical: 20,
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
    scrollContainer: {
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    instruction: {
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#009688',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,

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