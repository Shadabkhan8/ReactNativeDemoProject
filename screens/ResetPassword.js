
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Platform,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import { updateUserPassword } from './utils/storageHelpers';

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [hideNewPassword, setHideNewPassword] = useState(true);
//   const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

//   const confirmInputRef = useRef(null);
//   const navigation = useNavigation();
//   // ✅ Clear values when screen mounts
//   useEffect(() => {
//     setNewPassword('');
//     setConfirmPassword('');
//   }, []);

//   // ✅ Optimized submit handler
//  const handleVerify = async () => {
//   if (!newPassword || !confirmPassword) {
//     Alert.alert('Missing Info', 'Please fill in all fields');
//     return;
//   }
//   if (newPassword !== confirmPassword) {
//     Alert.alert('Mismatch', 'Passwords do not match');
//     return;
//   }

//   const success = await updateUserPassword(route.params?.email, newPassword);
//   if (success) {
//     Alert.alert('Success', 'Password updated successfully', [
//       { text: 'OK', onPress: () => navigation.popToTop() },
//     ]);
//   } else {
//     Alert.alert('Error', 'Something went wrong');
//   }
// };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         {Platform.OS === 'ios' && (
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon name="chevron-left" size={40} color="#fff" />
//           </TouchableOpacity>
//         )}
//         <Text style={styles.headerText}>Reset Password</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.welcomeText}>
//           Your new password must be different from the previously used password.
//         </Text>

//         {/* Inputs */}
//         <View style={styles.viewContent}>
//           {/* New Password */}
//           <View style={styles.inputContainer}>
//             <Icon name="lock" size={20} color="#333" style={styles.icon} />
//             <TextInput
//               placeholder="New Password"
//               style={styles.input}
//               secureTextEntry={hideNewPassword}
//               value={newPassword}
//               onChangeText={setNewPassword}
//               returnKeyType="next"
//               onSubmitEditing={() => confirmInputRef.current?.focus()}
//             />
//             <TouchableOpacity
//               onPress={() => setHideNewPassword(!hideNewPassword)}
//             >
//               <Icon
//                 name={hideNewPassword ? 'eye-off' : 'eye'}
//                 size={20}
//                 color="#333"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Confirm Password */}
//           <View style={styles.inputContainer}>
//             <Icon
//               name="lock-check"
//               size={20}
//               color="#333"
//               style={styles.icon}
//             />
//             <TextInput
//               ref={confirmInputRef}
//               placeholder="Confirm Password"
//               style={styles.input}
//               secureTextEntry={hideConfirmPassword}
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               returnKeyType="done"
//             />
//             <TouchableOpacity
//               onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
//             >
//               <Icon
//                 name={hideConfirmPassword ? 'eye-off' : 'eye'}
//                 size={20}
//                 color="#333"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.loginButton} onPress={handleVerify}>
//             <Text style={styles.loginButtonText}>Verify Account</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default ResetPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     left: 20,
//     top: Platform.OS === 'ios' ? 60 : 40,
//     zIndex: 1,
//   },
//   header: {
//     backgroundColor: '#009688',
//     paddingVertical: 40,
//     alignItems: 'center',
//     paddingTop: Platform.OS === 'ios' ? 60 : 40,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   scrollContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: 25,
//   },
//   welcomeText: {
//     fontSize: 15,
//     marginBottom: 25,
//     color: '#333',
//     textAlign: 'center',
//   },
//   viewContent: {
//     marginTop: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#009688',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#009688',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,

//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,

//     // Android shadow
//     elevation: 6,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });



import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { updateUserPassword } from './utils/storageHelpers';

import { useRoute } from '@react-navigation/native';


const ResetPassword = () => {
  const route = useRoute();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const confirmInputRef = useRef(null);
  const navigation = useNavigation();
  // ✅ Clear values when screen mounts
  useEffect(() => {
    setNewPassword('');
    setConfirmPassword('');
  }, []);

  // ✅ Optimized submit handler
 const handleVerify = async () => {
  if (!newPassword || !confirmPassword) {
    Alert.alert('Missing Info', 'Please fill in all fields');
    return;
  }
  if (newPassword !== confirmPassword) {
    Alert.alert('Mismatch', 'Passwords do not match');
    return;
  }

  const success = await updateUserPassword(route.params?.email, newPassword);
  if (success) {
    Alert.alert('Success', 'Password updated successfully', [
      { text: 'OK', onPress: () => navigation.popToTop() },
    ]);
  } else {
    Alert.alert('Error', 'Something went wrong');
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>Reset Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.welcomeText}>
          Your new password must be different from the previously used password.
        </Text>

        {/* Inputs */}
        <View style={styles.viewContent}>
          {/* New Password */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#333" style={styles.icon} />
            <TextInput
              placeholder="New Password"
              style={styles.input}
              secureTextEntry={hideNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              returnKeyType="next"
              onSubmitEditing={() => confirmInputRef.current?.focus()}
            />
            <TouchableOpacity
              onPress={() => setHideNewPassword(!hideNewPassword)}
            >
              <Icon
                name={hideNewPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Icon
              name="lock-check"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <TextInput
              ref={confirmInputRef}
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry={hideConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
            >
              <Icon
                name={hideConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleVerify}>
            <Text style={styles.loginButtonText}>Verify Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 60 : 40,
    zIndex: 1,
  },
  header: {
    backgroundColor: '#009688',
    paddingVertical: 40,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  welcomeText: {
    fontSize: 15,
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },
  viewContent: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});