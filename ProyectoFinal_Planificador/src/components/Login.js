import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Aquí debes implementar la lógica de autenticación real
    // utilizando AsyncStorage para almacenar la información de inicio de sesión.
    if (username === 'admin' && password === 'admin') {
      try {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        onLogin(); // Llama a la función de inicio de sesión exitoso
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Ingresar" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6', // Cambia el color de fondo
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Cambia el color del texto
  },
  input: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white', // Cambia el color de fondo de los campos de entrada
  },
});

export default Login;
