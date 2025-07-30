
import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OnboardingBirthdayScreen = () => {
    const [birthday, setBirthday] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { name } = route.params || {};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Birthday</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Image
                    source={require('/Users/iemac/ReactNative/SignUpDemo/assets/images/onboarding/birthday.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>When's your birthday?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={birthday}
                    onChangeText={setBirthday}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OnboardingGender', { name, birthday })}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default OnboardingBirthdayScreen;

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