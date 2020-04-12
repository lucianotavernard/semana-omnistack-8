import React, { useState, useEffect } from 'react';
import { AsyncStorage, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import {
  Container,
  FormInput,
  FormButtonSubmit,
  FormButtonTextSubmit,
} from './styles';

export default function Login() {
  const navigation = useNavigation();

  const [user, setUser] = useState('');

  useEffect(() => {
    async function checkUser() {
      const userCheck = await AsyncStorage.getItem('user');

      if (userCheck) {
        navigation.navigate('Main', { user: userCheck });
      }
    }

    checkUser();
  }, []);

  async function handleSubmit() {
    const response = await api.post('devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    await navigation.navigate('Main', { user: _id });
  }

  return (
    <Container>
      <Image source={logo} />

      <FormInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Digite seu usuário no Github"
        onChangeText={setUser}
        value={user}
      />

      <FormButtonSubmit onPress={handleSubmit}>
        <FormButtonTextSubmit>Entrar</FormButtonTextSubmit>
      </FormButtonSubmit>
    </Container>
  );
}
