import React, { useState, useEffect, useMemo } from 'react';
import { AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import io from 'socket.io-client';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import itsamatch from '../../assets/itsamatch.png';

import {
  Container,
  Logo,
  Empty,
  CardsContainer,
  Card,
  Avatar,
  Footer,
  Name,
  Bio,
  ButtonsContainer,
  Button,
  MatchContainer,
  MatchImage,
  MatchAvatar,
  MatchName,
  MatchBio,
  CloseMatch,
} from './styles';

export default function Main() {
  const route = useRoute();
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  const id = useMemo(() => route.params && route.params.user, [route.params]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('devs', {
        headers: { user: id },
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [id]);

  useEffect(() => {
    const socket = io('http://192.168.1.103:3333', {
      query: { user: id },
    });

    socket.on('match', (dev) => {
      setMatchDev(dev);
    });
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`devs/${user._id}/likes`, null, {
      headers: {
        user: id,
      },
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`devs/${user._id}/dislikes`, null, {
      headers: {
        user: id,
      },
    });

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleLogout}>
        <Logo source={logo} />
      </TouchableOpacity>

      <CardsContainer>
        {users.length === 0 ? (
          <Empty>Acabou :(</Empty>
        ) : (
          users.map((user, index) => (
            <Card key={user._id} zIndex={users.length - index}>
              <Avatar source={{ uri: user.avatar }} />

              <Footer>
                <Name>{user.name}</Name>
                <Bio numberOfLines={3}>{user.bio}</Bio>
              </Footer>
            </Card>
          ))
        )}
      </CardsContainer>

      {users.length > 0 && (
        <ButtonsContainer>
          <Button onPress={handleDislike}>
            <Image source={dislike} />
          </Button>

          <Button onPress={handleLike}>
            <Image source={like} />
          </Button>
        </ButtonsContainer>
      )}

      {matchDev && (
        <MatchContainer>
          <MatchImage source={itsamatch} />
          <MatchAvatar source={{ uri: matchDev.avatar }} />

          <MatchName>{matchDev.name}</MatchName>
          <MatchBio numberOfLines={3}>{matchDev.bio}</MatchBio>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <CloseMatch>Fechar</CloseMatch>
          </TouchableOpacity>
        </MatchContainer>
      )}
    </Container>
  );
}
