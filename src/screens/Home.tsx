import {Divider, AppBar, Backdrop, BackdropSubheader} from '@react-native-material/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPokemonRef} from '../interface/IPokemonRef';
import {getPokemons} from '../services/requisitions';
import {RootStackParamList} from '../types/RootStakParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({route, navigation}: Props) {
  const [pokemons, setPokemons] = useState<IPokemonRef[]>([]);

  async function GetPokemonList() {
    const resultado = await getPokemons();
    setPokemons(resultado?.data.results);
  }

  useEffect(() => {
    GetPokemonList();
  }, []);

  return (
    <View>
      <AppBar title="PokeAgenda TS" elevation={8}/>
      <FlatList
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
        <Text style={{paddingVertical: 16}}>
          {item.name}
        </Text>
        <Divider/>
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
    paddingHorizontal: 16,
  },
});
