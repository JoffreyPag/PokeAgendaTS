import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IPokemonRef} from '../interface/IPokemonRef';
import {getPokemons} from '../services/requisitions';
import {RootStackParamList} from '../types/RootStakParamList';
import {Appbar, Divider, useTheme} from 'react-native-paper';
import PokemonItemList from './components/PokemonItemList';

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

  const theme = useTheme();
  return (
    <View>
      <Appbar.Header elevated>
        <Appbar.Content title="Tittle" />
      </Appbar.Header>

      <FlatList
        style={{backgroundColor: theme.colors.background}}
        data={pokemons}
        renderItem={({item}) => (
          <PokemonItemList
            name={item.name}
            onClick={() => navigation.navigate('Pokemon', {pokemonRef: item})}
          />
        )}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 36,
  },
});
