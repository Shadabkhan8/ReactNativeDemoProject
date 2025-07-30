
import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OnboardingGenderScreen = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { name, birthday } = route.params || {};

    const handleSubmit = () => {
    const userInfo = {
        name,
        birthday,
        gender: selectedGender,
    };    
    navigation.navigate('Dashboard', { user: userInfo });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Gender</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Image
                    source={require('/Users/iemac/ReactNative/SignUpDemo/assets/images/onboarding/gender.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>What's your gender?</Text>
                {['Male', 'Female', 'Other'].map(gender => (
                    <TouchableOpacity
                        key={gender}
                        style={[
                            styles.option,
                            selectedGender === gender && styles.selectedOption
                        ]}
                        onPress={() => setSelectedGender(gender)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedGender === gender && styles.selectedOptionText
                            ]}
                        >
                            {gender}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={!selectedGender}
                >
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default OnboardingGenderScreen;

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
    option: {
        borderWidth: 1,
        borderColor: '#009688',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10
    },
    selectedOption: {
        backgroundColor: '#009688',
        borderColor: '#009688'
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center'
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: 'bold'
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

    image: {
        width: 220,
        height: 160,
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

    content: {
        justifyContent: 'center',
        padding: 24,
        marginTop: 20,
    },
});
