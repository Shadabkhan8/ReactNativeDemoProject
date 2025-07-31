import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { saveUser } from './utils/storageHelpers';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    pin: '',
    gender: '',
    education: '',
    age: '',
    skill: '',
    password: '',
    confirmPassword: '',
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const sanitizedValue = field === 'email' ? value.toLowerCase() : value;
    setForm(prev => ({ ...prev, [field]: sanitizedValue }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
      valid = false;
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!form.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!form.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!/^\d{6}$/.test(form.pin)) {
      newErrors.pin = 'PIN must be exactly 6 digits';
      valid = false;
    }

    if (!form.gender.trim()) {
      newErrors.gender = 'Gender is required';
      valid = false;
    } else if (!['male', 'female', 'other'].includes(form.gender.toLowerCase())) {
      newErrors.gender = 'Gender must be Male, Female, or Other';
      valid = false;
    }

    if (!form.education.trim()) {
      newErrors.education = 'Education is required';
      valid = false;
    }

    if (!form.age.trim() || isNaN(form.age)) {
      newErrors.age = 'Age must be a number';
      valid = false;
    } else if (parseInt(form.age) < 10 || parseInt(form.age) > 100) {
      newErrors.age = 'Age must be between 10 and 100';
      valid = false;
    }

    if (!form.skill.trim()) {
      newErrors.skill = 'Skill is required';
      valid = false;
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else if (!/[0-9]/.test(form.password) || !/[!@#$%^&*]/.test(form.password)) {
      newErrors.password = 'Password must contain a number and special character';
      valid = false;
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const { confirmPassword, ...userData } = form;
        await saveUser(userData);
        Alert.alert('Success', 'User registered successfully', [
          { text: 'OK', onPress: () => navigation.replace('Dashboard') },
        ]);
      } catch (e) {
        Alert.alert('Registration Failed', e.message);
      }
    } else {
      Alert.alert('Error', 'Please fix the form errors before submitting');
    }
  };

  const renderInput = (label, field, icon, keyboardType = 'default', isPassword = false) => {
    const isSecure = isPassword && (field === 'password' ? hidePassword : hideConfirmPassword);

    return (
      <View style={styles.viewContent}>
        <View style={styles.inputContainer}>
          <Icon name={icon} size={20} color="#333" style={styles.icon} />
          <TextInput
            placeholder={label}
            value={form[field]}
            onChangeText={text => handleChange(field, text)}
            style={styles.input}
            keyboardType={keyboardType}
            secureTextEntry={isSecure}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() =>
                field === 'password'
                  ? setHidePassword(!hidePassword)
                  : setHideConfirmPassword(!hideConfirmPassword)
              }
            >
              <Icon
                name={
                  (field === 'password' ? hidePassword : hideConfirmPassword)
                    ? 'eye-off'
                    : 'eye'
                }
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          )}
        </View>
        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.loginText}>Sign Up</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.welcomeText}>Create account</Text>

        {renderInput('Full Name', 'name', 'account')}
        {renderInput('Email', 'email', 'email', 'email-address')}
        {renderInput('Phone Number', 'phone', 'phone', 'number-pad')}
        {renderInput('Address', 'address', 'home')}
        {renderInput('State', 'state', 'map')}
        {renderInput('City', 'city', 'city')}
        {renderInput('PIN Code', 'pin', 'form-textbox', 'number-pad')}
        {renderInput('Gender (Male/Female/Other)', 'gender', 'gender-male-female')}
        {renderInput('Education', 'education', 'school')}
        {renderInput('Age', 'age', 'calendar-account', 'numeric')}
        {renderInput('Skill', 'skill', 'star')}
        {renderInput('Password', 'password', 'lock', 'default', true)}
        {renderInput('Confirm Password', 'confirmPassword', 'lock-check', 'default', true)}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={{ color: '#333' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#009688',
    paddingVertical: 40,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 25,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#009688',
    marginVertical: 20,
    marginLeft: 25,
  },
  viewContent: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginTop: 20,
    marginHorizontal: 25,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  signupText: {
    color: '#009688',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 10,
    marginTop: -5,
    marginBottom: 5,
  },
});