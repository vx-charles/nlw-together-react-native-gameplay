import React from 'react';
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

type Props = RectButtonProps & { // Props recebem todas as propriedades de RectButtonProps e mais as outras propriedades adiante.
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <RectButton
      style={styles.container}
      {...rest} // ...rest = activeOpacity
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  )
}