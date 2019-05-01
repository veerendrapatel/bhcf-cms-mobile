import {StyleSheet, Dimensions} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#3cea8d',
    secondary: '#FF572',
    tertiary: '#FFF',
    black: '#000',
    orange: '#FF5722',
    grey: 'rgb(236, 236, 236);',
    grey2: '#464646',
    warning: '#FFC107',
    danger: '#F44336',
    violet: '#f15bf1'
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
}

export const container = {
  padding: padding.sm,
  flex: 1,
  backgroundColor: colors.tertiary
}