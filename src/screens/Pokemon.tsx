import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPokemon} from '../interface/IPokemon';
import {getPokemon} from '../services/requisitions';
import {RootStackParamList} from '../types/RootStakParamList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Appbar, Divider, useTheme, Text, Button} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;

export default function Pokemon({route, navigation}: Props) {
  const pokemonref = route.params.pokemonRef;
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  async function GetPokemonData() {
    const res = await getPokemon(pokemonref.url);
    setPokemon(res);
  }
  useEffect(() => {
    GetPokemonData();
  }, []);
  useEffect(() => {
    setImageUrl(pokemon?.sprites.front_default);
  }, [pokemon]);
  async function OnAbilityPressed(url: string) {}
  return (
    <View>
      <View style={style.backgroundImage}>
        <Image style={style.image} source={{uri: imageUrl}} />
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
        Type: {pokemon?.types[0].type.name}
      </Text>
      <FlatList
        data={pokemon?.abilities}
        ListHeaderComponent={<Text> Abilities </Text>}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={style.itemButton}
              onPress={() => OnAbilityPressed(item.ability.url)}>
              <Text style={[style.abilitiesItem, {}]}>{item.ability.name}</Text>
              <Icon
                name="arrow-forward-ios"
                size={24}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
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
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  backgroundImage: {
    backgroundColor: '#3f3f3f',
    height: 200,
  },
  abilitiesItem: {
    marginVertical: 16,
    marginHorizontal: 16,
    color: 'black',
  },
  itemButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
