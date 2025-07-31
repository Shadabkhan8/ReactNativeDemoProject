import React, { useState, useLayoutEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateUser } from '../utils/storageHelpers'; // adjust path

const UserDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;

  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const nameInputRef = useRef(null);

  const handleEdit = () => {
    setEditMode(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  const handleChange = (key, value) => {
    setEditableUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(user.email, editableUser); // your update logic
      Alert.alert('Success', 'User updated successfully');
      setEditMode(false);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User Details</Text>
      </View>

      {/* Edit and Save Buttons */}
      <View style={styles.buttonRow}>
        {!editMode ? (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Icon name="pencil" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="content-save" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>


      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(editableUser).map(([key, value], index) => (
          <View style={styles.card} key={key}>
            <View style={styles.row}>
              <Text style={styles.label}>{formatKey(key)}</Text>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={String(value)}
                  onChangeText={(text) => handleChange(key, text)}
                  ref={index === 0 ? nameInputRef : null}
                />
              ) : (
                <Text style={styles.value}>{String(value)}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  editButton: {
     backgroundColor: '#009688',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#333', width: 100 },
  value: { fontSize: 16, color: '#555', flex: 1 },
  input: {
    fontSize: 16,
    flex: 1,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#333',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  saveButton: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

});
