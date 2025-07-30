import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetailsScreen = () => {
  const route = useRoute();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(user).map(([key, value]) => (
          <View style={styles.card} key={key}>
            <View style={styles.row}>
              <Text style={styles.label}>{formatKey(key)}</Text>
               <Text style={styles.value}>{String(value)}</Text>
            </View>
           
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Format field names (e.g. 'userEmail' -> 'User Email')
const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export default UserDetailsScreen;

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
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginLeft: 28,
  },
});