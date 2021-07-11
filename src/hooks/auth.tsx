import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { SCOPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env
const { REDIRECT_URL } = process.env
const { RESPONSE_TYPE } = process.env
  
import { api } from '../services/api'
import { COLLECTION_USERS } from '../configs/database'

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string; // o token é opcional quando o usuário cancela a autenticação.
    error: string;
  }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  async function signIn() {
    try { // vamos lidar com contexto externo, ou seja, que dispara uma exceção.
      setLoading(true)

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse; // aqui é onde ele vai abrir um browser pra fazer a autenticação.

      if(type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}` // injetar token na header para conseguir pegar os dados do user no código seguinte.
        const userInfo = await api.get('/users/@me')
        console.log(userInfo)

        const firstName = userInfo.data.username.split(' ')[0]
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png` // Mudar o conteúdo do objeto, já que ele vem  em forma de hash.
        
        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData)) // armazena os dados persistidos, como se fosse um localStorage.
        setUser(userData)
      }
    } catch {
      throw new Error('Não foi possível autenticar') // Lança uma nova exceção, por causa do "new", que não usa o erro padrão.
    } finally { // independente de se der certo ou errado, ele entra nesse bloco de finally
      setLoading(false)
    }
  }

  async function signOut() {
    setUser({} as User) // seta o usuário como vazio, logo onde tem a condição do redirecionamento, será nulo lá no arquivo index na pasta routes.
    await AsyncStorage.removeItem(COLLECTION_USERS) // remove o item que fica o Storage.
  }
  
  async function loadUserStorageData() { // para armazenar os dados localmente e persistir os dados do login mesmo quando sair do app.
    const storage = await AsyncStorage.getItem(COLLECTION_USERS) // @gameplay:user - pega o valor da chave do localStorage
    if(storage) {
      const userLogged = JSON.parse(storage) as User
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`
      setUser(userLogged)
    }
  }
  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthProvider,
  useAuth
}
