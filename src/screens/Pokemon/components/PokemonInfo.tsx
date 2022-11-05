import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import {IPokemon} from '../../../interface/IPokemon';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props{
    imageURL:string|undefined,
    pokemon: IPokemon|undefined
}

export default function PokemonInfo({imageURL, pokemon}:Props) {
const theme = useTheme();
  async function OnAbilityPressed(url: string) {}

  return (
    <View>
      <View style={style.backgroundImage}>
        <Image style={style.image} source={{uri: imageURL}} />
      </View>
      <Text style={style.pokemonName} variant="titleLarge">
        {pokemon?.name?.toUpperCase()}
      </Text>
      <Text style={style.info} variant="bodyLarge">
        Height: {pokemon?.height}
      </Text>
      <Text style={style.info} variant="bodyLarge">
        Weight: {pokemon?.weight}
      </Text>
      <Text style={style.info} variant="bodyLarge">
        Type:
      </Text>
      <View style={style.typeList}>
        {pokemon?.types.map((type, index) => (
          <Chip mode="outlined" style={style.type} compact key={index}>
            {type.type.name}
          </Chip>
        ))}
      </View>
      <Text> Abilities </Text>
      {pokemon?.abilities.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              style={style.itemButton}
              onPress={() => OnAbilityPressed(item.ability.url)}>
              <Text style={[style.abilitiesItem, {}]} variant="bodyLarge">
                {item.ability.name}
              </Text>
              <Icon
                name="arrow-forward-ios"
                size={24}
                color={theme.colors.onPrimaryContainer}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
const style = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      display: 'flex',
      alignSelf: 'center',
    },
    pokemonName: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginVertical: 16,
    },
    info: {
      marginHorizontal: 16,
      marginVertical: 8,
    },
    typeList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginVertical: 8,
    },
    type: {
      height: 'auto',
      width: 'auto',
      marginHorizontal: 4,
      marginVertical: 2,
    },
    backgroundImage: {
      backgroundColor: '#3f3f3f',
      height: 200,
    },
    abilitiesItem: {
      marginVertical: 16,
      marginHorizontal: 16,
    },
    itemButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });