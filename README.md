<h1 align="center">
  <img src="./git images/gameplay-logo.jpg" alt="Gameplay logo" />
  <p align="center">
    GamePlay em React Native
  </p>
</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/count/vx-charles/nlw-together-react-native-gameplay" />
  <img src="https://img.shields.io/github/repo-size/vx-charles/nlw-together-react-native-gameplay" />
  <img src="https://img.shields.io/github/last-commit/vx-charles/nlw-together-react-native-gameplay" />
</p>

<img src="./git images/gameplay-cover.jpg" alt="Gameplay" />

## 💻 Projeto
Aplicativo para lhe ajudar a conectar-se e organiza o momento de diversão e jogar com os amigos. Crie grupos para jogar seus games favoritos com seus amigos com esse App que possui autenticação com Discord. App foi criado usando [Expo](https://expo.dev)


## :hammer_and_wrench: Features 

- Autenticação Social OAuth2 com servidor do Discord.
- Obtém perfil do usuário cadastro no Discord (username e avatar);
- Lista os servidores do Discord que o usuário faz parte;
- Permite realizar o agendamento de partidas;
- Permite filtrar as partidas por categoria;
- Exibe se a partida foi agendada em um servidor próprio (anfitrião) ou em servidores de outros (convidado);
- Compartilha o convite para ingressar no servidor do usuário;
- Permite redirecionar o usuário para o seu próprio servidor;
- Disponibiliza a função de Logout.


## ✨ Tecnologias

- React Native
- Typescript
- Expo
- Context API
- Async Storage
- Vector Icons
- React Native Svg e Svg Transform
- Axios
- Gradient colors
- OAuth2 Discord 
- Expo Google Fonts
- React Navigation Stack
- React Native Gesture Handler
- Expo Authentication
- React Native Share
- Deep Link

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/0kv33XYjvOgvKGKHBaiR07/GamePlay-NLW-Together?node-id=58913%3A83). É necessário ter conta no [Figma](http://figma.com/) para acessá-lo.


## Executando o projeto

Utilize o **yarn** ou o **npm install** para instalar as dependências do projeto.
Em seguida, inicie o projeto.

```cl
expo start
```

Lembre-se de criar o seu App no servidor do Discord para obter as credencias de autenticação. Em seguida, defina no arquivo .env as configurações do seu App (remova o example do arquivo .env.example).
 
 ```cl
REDIRECT_URI=
SCOPE=
RESPONSE_TYPE=
CLIENT_ID=
CDN_IMAGE=
```