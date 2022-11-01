import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IAbility } from '../interface/IAbility';
import {IPokemon} from '../interface/IPokemon';
import {getAbility, getPokemon} from '../services/requisitions';
import {RootStackParamList} from '../types/RootStakParamList';

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

  async function OnAbilityPressed(url:string){

  }
  return (
    <View>
      <View style={style.backgroundImage}>
        <Image style={style.image} source={{uri: imageUrl}} />
      </View>
      <Text style={style.name}>{pokemon?.name?.toUpperCase()}</Text>
      <Text style={style.details}>Height: {pokemon?.height}</Text>
      <Text style={style.details}>Weight: {pokemon?.weight}</Text>
      <Text style={style.details}>Type: {pokemon?.types[0].type.name}</Text>
      <FlatList
        data={pokemon?.abilities}
        ListHeaderComponent={<Text> Abilities </Text>}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>OnAbilityPressed(item.ability.url)}>
            <Text style={style.details}>{item.ability.name}</Text>
          </TouchableOpacity>
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
  name: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  backgroundImage: {
    backgroundColor: '#3f3f3f',
    height: 200,
  },
});
