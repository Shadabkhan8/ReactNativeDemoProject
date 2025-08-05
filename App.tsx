import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WalkthroughScreen from './screens/walkthrough/WalkthroughScreen';
import LoginScreen from './screens/SignUpFlow/LoginScreen';
import SignUpScreen from './screens/SignUpFlow/SignUpScreen';
import ForgotPasswordScreen from './screens/SignUpFlow/ForgotPasswordFlow/ForgotPassword';
import EmailVarification from './screens/SignUpFlow/ForgotPasswordFlow/EmailVarification';
import ResetPassword from './screens/SignUpFlow/ForgotPasswordFlow/ResetPassword';
import OnboardingNameScreen from './screens/Onboarding/OnboardingNameScreen';
import OnboardingBirthdayScreen from './screens/Onboarding/OnboardingBirthdayScreen';
import OnboardingGenderScreen from './screens/Onboarding/OnboardingGenderScreen';
import DashboardScreen from './screens/Home/DashboardScreen';
import UserDetailsScreen from './screens/Onboarding/UserDetailsScreen';
import MainTabs from './screens/Home/BottomTab/MainTabs';
import CommentScreen from './screens/PostFlow/CommentScreen';
import { getLoggedInUser } from './screens/utils/storageHelpers';

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
      setInitialRoute(user ? 'MainTabs' : onboarded === 'true' ? 'Login' : 'Walkthrough');
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
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVarification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OnboardingName" component={OnboardingNameScreen} />
        <Stack.Screen name="OnboardingBirthday" component={OnboardingBirthdayScreen} />
        <Stack.Screen name="OnboardingGender" component={OnboardingGenderScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen name='CommentScreen' component={CommentScreen} options={{ title: 'Comments' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
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