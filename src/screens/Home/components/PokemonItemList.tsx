import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  name?: string;
  onClick?: () => void | undefined;
}

export default function PokemonItemList({name, onClick}: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onClick}>
      <Text style={{paddingVertical: 16}} variant="bodyMedium">
        {name}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
  },
});
