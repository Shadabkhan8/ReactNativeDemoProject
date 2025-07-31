
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';

export const getUsers = async () => {
  const usersJSON = await AsyncStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : [];
};

export const saveUser = async (user) => {
  const users = await getUsers();
  const exists = users.find((u) => u.email === user.email);
  if (exists) {
    throw new Error('User already exists with this email');
  }
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (email, password) => {
  const users = await getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid email or password');
  }
};

export const getLoggedInUser = async () => {
  const userJSON = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
  return userJSON ? JSON.parse(userJSON) : null;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
};

// export const updateUserPassword = async (email, newPassword) => {
//   const users = await getUsers();
//   const index = users.findIndex((u) => u.email === email);
//   if (index !== -1) {
//     users[index].password = newPassword;
//     await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
//     return true;
//   }
//   return false;
// };

// export const findUserByEmail = async (email) => {
//   const users = await getUsers();
//   return users.find((u) => u.email === email);
// };

export const deleteUser = async (email) => {
  let users = await getUsers();
  const filteredUsers = users.filter((u) => u.email !== email);
  
  if (filteredUsers.length === users.length) {
    throw new Error('User not found');
  }

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));

  const loggedInUser = await getLoggedInUser();
  if (loggedInUser?.email === email) {
    await logoutUser(); // Also logout if deleted user is currently logged in
  }

  return true;
};

export const updateUser = async (email, updatedData) => {
  const users = await getUsers();
  const updatedUsers = users.map((u) =>
    u.email === email ? { ...u, ...updatedData } : u
  );
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const findUserByEmail = async (email) => {
  const usersString = await AsyncStorage.getItem('users');
  if (!usersString) return null;
  const users = JSON.parse(usersString);
  return users.find((user) => user.email === email);
};

export const updateUserPassword = async (email, newPassword) => {
  const usersString = await AsyncStorage.getItem('users');
  if (!usersString) return false;

  let users = JSON.parse(usersString);
  const index = users.findIndex((user) => user.email === email);
  if (index === -1) return false;

  users[index].password = newPassword;
  await AsyncStorage.setItem('users', JSON.stringify(users));
  return true;
};

export const storeOTP = async (email, otp) => {
  await AsyncStorage.setItem(`otp_${email}`, otp);
};

export const getStoredOTP = async (email) => {
  return await AsyncStorage.getItem(`otp_${email}`);
};

export const clearStoredOTP = async (email) => {
  await AsyncStorage.removeItem(`otp_${email}`);
};
