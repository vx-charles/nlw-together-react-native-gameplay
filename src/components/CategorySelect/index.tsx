import React from 'react';
import { ScrollView } from 'react-native'

import { styles } from './styles'
import { categories } from '../../utils/categories'
import { Category } from '../Category';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
}

export function CategorySelect({ setCategory, categorySelected, hasCheckBox = false }: Props) {
  return (
    <ScrollView
      horizontal // scroll na lista horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false} // desabilita a barra de rolagem
      contentContainerStyle={{ paddingRight: 40 }} // quando a listagem termina, terá um espaçamento na direita que bate com o espaçamento do botão acima.
    >
      {
        categories.map(category => (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
            hasCheckBox={hasCheckBox}
          />
        ))
      }
    </ScrollView>
  )
}