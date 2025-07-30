
import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingNameScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Name</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Image
                    source={require('/Users/iemac/ReactNative/SignUpDemo/assets/images/onboarding/name.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* <View style={styles.content}> */}

                <Text style={styles.title}>What's your name?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OnboardingBirthday', { name })}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                {/* </View> */}
            </ScrollView>
        </View>
    );
};

export default OnboardingNameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: '600',
        color: '#333'
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

    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#009688',
        padding: 15,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        // Android shadow
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    content: {
        justifyContent: 'center',
        padding: 24,
        marginTop: 20,
    },

    image: {
        width: 220,
        height: 160,
        alignSelf: 'center',
        marginVertical: 20,
    },

});
