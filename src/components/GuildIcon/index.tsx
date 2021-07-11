import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles'
import DiscordSvg from '../../assets/discord.svg'

const { CDN_IMAGE } = process.env

type Props = {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId}: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  
  //"https://img.ibxk.com.br/2020/10/30/30110741964176.jpg?w=352&h=208&mode=crop&scale=both"

  return (
    <View style={styles.container}>
      { iconId ? 
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
        />
        :
        <DiscordSvg width={40} height={40} />
      }
    </View>
  )
}