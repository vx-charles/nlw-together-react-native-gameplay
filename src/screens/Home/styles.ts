import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26, // isso é no caso de Iphone, aplicar um margin-top a mais por causa do statusbar.
    marginBottom: 42
  },
  matches: {
    marginTop: 24,
    marginLeft: 24,
  }
})