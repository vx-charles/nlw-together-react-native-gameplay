import React from 'react';
import { StatusBar, LogBox } from 'react-native'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import { Routes } from './src/routes';
import { Background } from './src/components/Background'

import { AuthProvider } from './src/hooks/auth'

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']) // usado para ignorar as mensagens de alerta e essa foi a mensagem selecionada para ignorar.

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if(!fontsLoaded) { // se as fonts não carregarem
    return <AppLoading /> // fica na tela do splash
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content" // barra de status branco
        backgroundColor="transparent" // fundo transparente
        translucent // faz com que o conteúdo fica colado no topo e fica por cima. está em short sintaxe.
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>

    </Background>
  );
}
