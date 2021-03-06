import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler' // indicado para botões que não tem texto e nem background, só tem o ícone somente.
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';

type Props = {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: Props) {
  const { secondary100, secondary40, heading } = theme.colors

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack() // voltar para a tela anterior
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action // botão de compartilhar
        ?
          <View>
            {action}
          </View>
        :
          <View style={{ width: 24 }} /> // Para centralizar o texto na Header quando não tem o botão de compartilhar.
      }
    </LinearGradient>
  )
}