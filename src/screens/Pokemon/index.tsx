import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {IPokemon} from '../../interface/IPokemon';
import ISpecie from '../../interface/ISpecie';
import {getPokemon, getSpecie} from '../../services/requisitions';
import {RootStackParamList} from '../../types/RootStakParamList';
import {useTheme, Text} from 'react-native-paper';
import PokemonInfo from './components/PokemonInfo';
import EvolutionList from './components/EvolutionList';

type Props = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;

export default function Pokemon({route, navigation}: Props) {
  const theme = useTheme();
  const pokemonref = route.params.pokemonRef;
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [specie, setSpecie] = useState<ISpecie>();

  async function GetPokemonData() {
    const res = await getPokemon(pokemonref.url);
    setPokemon(res);
  }
  async function GetSpecies(url: string) {
    const result = await getSpecie(url);
    setSpecie(result)
  }
  useEffect(() => {
    GetPokemonData();
  }, []);

  useEffect(() => {
    if (pokemon != undefined) {
      GetSpecies(pokemon?.species.url);
    }
  }, [pokemon]);

  useEffect(() => {
    setImageUrl(pokemon?.sprites.other?.['official-artwork'].front_default);
  }, [pokemon]);

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}>
      <PokemonInfo imageURL={imageUrl} pokemon={pokemon} />
      
      <EvolutionList evolutionChainUrl={specie?.evolution_chain.url}/>
    </ScrollView>
  );
}
