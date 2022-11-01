import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import {IPokemonRef} from '../interface/IPokemonRef';
import {getPokemons} from '../services/requisitions';
import {RootStackParamList} from '../types/RootStakParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({route, navigation}:Props) {
  const [pokemons, setPokemons] = useState<IPokemonRef[]>([]);
  
  async function GetPokemonList() {
    const resultado = await getPokemons();
    setPokemons(resultado?.data.results);
  }

  useEffect(()=>{
    GetPokemonList();
  },[])

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.titulo}>Poke Agenda TS: WIP</Text>
        }
        data={pokemons}
        renderItem={({item}) => <HomeItem {...item} />}
      />
    </View>
  );

  function HomeItem(item: IPokemonRef) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Pokemon', {pokemonRef: item})}>
        <Text style={{paddingVertical: 10}}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 36,
  },
  item: {
    paddingHorizontal: 8,
  },
});
