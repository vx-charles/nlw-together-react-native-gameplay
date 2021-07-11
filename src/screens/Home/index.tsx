import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native' // FlatList - renderiza aos poucos e dá prioridade aos elementos visíveis, como o Lazyload.
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Appointments, AppointmentsProps } from '../../components/appointments';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background'
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';

import { styles } from './styles'
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([])
  
  const navigation = useNavigation()

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId) // fazer o efeito de marcar e desmarcar.
  }

  function handleAppointmentDetails(guildSelected: AppointmentsProps) {
    navigation.navigate('AppointmentDetails', { guildSelected }) // usando o segundo parâmetro a guild selecionada, para recuperar o agendamento por meio da rota.
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storage: AppointmentsProps[] = response ? JSON.parse(response) : []
    if(category) {
      setAppointments(storage.filter(item => item.category === category))
    } else {
      setAppointments(storage) // atualiza o estado do agendamento.
    }

    setLoading(false)
  }

  useFocusEffect(useCallback(() => { // useFocusEffect - quando voltar para a tela home, ele recarregar essa tela. E o useCallback() é para memorizar função, memoriza a referência função em memória e evita de recriar a função.
    loadAppointments()
  }, [category] )) // toda vez que selecionar uma nova categoria, recarregue a listagem.

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      
      {
        loading ? <Load /> : 
        <>
          <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />
          
          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointments
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />} // add o component separador criado
            style={styles.matches}
            contentContainerStyle={{ paddingBottom: 69 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      }
    </Background>
  )
}