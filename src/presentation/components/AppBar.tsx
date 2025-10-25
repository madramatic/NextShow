import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../core/theme/index';

const AppBar: React.FC = () => (
  <View style={styles.appBarWrapper}>
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>Watch</Text>
      <MaterialIcons name="search" size={24} color={theme.colors.dark} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  appBarWrapper: {
    backgroundColor: theme.colors.light,
    paddingTop: 48,
    paddingLeft: 0,
    paddingRight: 0,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  appBarTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
  },
});

export default AppBar;
