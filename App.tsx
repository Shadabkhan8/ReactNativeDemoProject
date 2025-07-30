/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WalkthroughScreen from './screens/walkthrough/WalkthroughScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPassword';
import EmailVarification from './screens/EmailVarification';
import ResetPassword from './screens/ResetPassword';
import OnboardingNameScreen from './screens/Onboarding/OnboardingNameScreen';
import OnboardingBirthdayScreen from './screens/Onboarding/OnboardingBirthdayScreen';
import OnboardingGenderScreen from './screens/Onboarding/OnboardingGenderScreen';
import DashboardScreen from './screens/Home/DashboardScreen'; // ➕ You must create this
import UserDetailsScreen from './screens/Onboarding/UserDetailsScreen'; // ➕ You must create this

import { getLoggedInUser } from './screens/utils/storageHelpers'; // Make sure this exists

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkAppState = async () => {
      const onboarded = await AsyncStorage.getItem('hasOnboarded');
      const user = await getLoggedInUser();
      setHasOnboarded(onboarded === 'true');
      setInitialRoute(user ? 'Dashboard' : onboarded === 'true' ? 'Login' : 'Walkthrough');
      setIsLoading(false);
    };
    checkAppState();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {!hasOnboarded && (
          <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        )}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVarification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OnboardingName" component={OnboardingNameScreen} />
        <Stack.Screen name="OnboardingBirthday" component={OnboardingBirthdayScreen} />
        <Stack.Screen name="OnboardingGender" component={OnboardingGenderScreen} />

        {/* Dashboard Screens */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
