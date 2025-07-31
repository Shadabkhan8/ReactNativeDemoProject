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
import { getUsers, logoutUser, saveUser, deleteUser } from '../utils/storageHelpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data || []);
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

  const handleDelete = (emailToDelete) => {
  Alert.alert('Delete', 'Are you sure you want to delete this user?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        try {
          await deleteUser(emailToDelete); // delete from AsyncStorage and logout if needed
          const updatedUsers = await getUsers(); // fetch updated list
          setUsers(updatedUsers); // update local state
        } catch (error) {
          console.error('Failed to delete user:', error.message);
        }
      },
    },
  ]);
};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => handleUserPress(item)}
      >
        <Icon name="account" size={24} color="#009688" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </TouchableOpacity>

      {/* Delete button on right side */}
      <TouchableOpacity onPress={() => handleDelete(item.email)}>
        <Icon name="delete" size={24} color="#e53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Registered Users</Text>
      </View>
       <Text style={styles.title}></Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
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
    justifyContent: 'space-between',

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
    flex: 1,
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
