import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsers, logoutUser } from '../utils/storageHelpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace('Login');
  };

  const handleUserPress = (user) => {
    navigation.navigate('UserDetails', { user });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Registered Users</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}></Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleUserPress(item)}
          >
            <View style={styles.cardContent}>
              <Icon name="account" size={24} color="#009688" style={styles.icon} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users registered yet.</Text>
        }
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#009688',
    marginVertical: 5,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android Shadow
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android Shadow
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});