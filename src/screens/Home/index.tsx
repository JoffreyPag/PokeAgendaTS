import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IPokemonRef} from '../../interface/IPokemonRef';
import {getPokemons} from '../../services/requisitions';
import {RootStackParamList} from '../../types/RootStakParamList';
import {Appbar, Divider, useTheme} from 'react-native-paper';
import PokemonItemList from './components/PokemonItemList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({route, navigation}: Props) {
  const [pokemons, setPokemons] = useState<IPokemonRef[]>([]);
  const [nextURL, setNextURL] = useState();
  async function GetPokemonList() {
    const resultado = await getPokemons();
    setNextURL(resultado?.data.next)
    setPokemons(resultado?.data.results);
  }

  useEffect(() => {
    GetPokemonList();
  }, []);

  const theme = useTheme();
  return (
    <View>
      <Appbar.Header elevated>
        <Appbar.Content title="Pokemons" />
      </Appbar.Header>

      <FlatList
        contentContainerStyle={{paddingBottom:60}}
        style={{backgroundColor: theme.colors.background}}
        data={pokemons}
        renderItem={({item}) => (
          <PokemonItemList
            onClick={() => navigation.navigate('Pokemon', {pokemonRef: item})}
            pokemonRef={item}
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
