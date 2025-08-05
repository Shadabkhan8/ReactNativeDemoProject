
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from '../DashboardScreen';
import ApiListScreen from '../../PostFlow/ApiListScreen';
import SettingScreen from '../SettingScreen'; // Assuming you have a SettingScreen component
import CardScrollScreen from '../CardScrollScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#009688',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ApiListScreen"
        component={ApiListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
          title: 'Posts', // This title will be used in the header when navigating to this screen
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CardScroll"
        component={CardScrollScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cards" color={color} size={size} />
          ),
          title: 'Cards',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
