import React from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
    {
        title: 'Account Settings',
        data: [
            { label: 'Profile', icon: 'account-circle' },
            { label: 'Change Password', icon: 'lock-reset' },
            { label: 'Privacy Settings', icon: 'shield-account' },
        ],
    },
    {
        title: 'Notifications',
        data: [
            { label: 'Push Notifications', icon: 'bell-ring' },
            { label: 'Email Alerts', icon: 'email' },
        ],
    },
    {
        title: 'App Preferences',
        data: [
            { label: 'Language', icon: 'translate' },
            { label: 'Theme', icon: 'theme-light-dark' },
            { label: 'About App', icon: 'information' },
        ],
    },
];

const SettingScreen = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <Icon name={item.icon} size={22} color="#009688" style={styles.itemIcon} />
            <Text style={styles.itemText}>{item.label}</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.label + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        backgroundColor: '#009688',
        paddingVertical: 40,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20,
    },

    sectionHeader: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555',
        backgroundColor: '#f0f0f0',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 6,

        // Shadow like your inputs
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemIcon: {
        marginRight: 15,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },

});