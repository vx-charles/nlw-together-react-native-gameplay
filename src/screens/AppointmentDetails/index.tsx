import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native' // coloca como imagem de fundo dentro da div
import * as Linking from 'expo-linking';

import BannerImg from '../../assets/banner.png';

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { AppointmentsProps } from '../../components/appointments';
import { Load } from '../../components/Load';

import { styles } from './styles'
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';

type Params = {
  guildSelected: AppointmentsProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)

  const route = useRoute() // é para recuperar as informações do segundo parâmetro do navigate.
  const { guildSelected } = route.params as Params

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data)
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Será que o widget está habilitado?')
    } finally {
      setLoading(false) // independente de dar certo ou não, seta o loading como false.
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
    ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && // se for dono do servidor, aparece o botão de compartilhar
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      
      {
        loading ? <Load /> :
        <>
          <ListHeader
          title="Jogadores"
          subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
            />
          </>
      }
      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    </Background>
  )
}