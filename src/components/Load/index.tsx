import React from 'react';

import {
  View,
  ActivityIndicator
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function Load() {
  return (
    <View style={styles.container}>
      <ActivityIndicator // barra de loading que no caso é círculo no android.
        size='large'
        color={theme.colors.primary}
      />
    </View>
  );
}