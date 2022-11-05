import {Card, Paragraph, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {getPokemon} from '../../../services/requisitions';
import {useEffect, useState} from 'react';
import {IPokemon} from '../../../interface/IPokemon';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStakParamList';

interface Props {
  specie:
    | {
        name?: string | undefined;
        url?: string | undefined;
      }
    | undefined;
}

export default function PokemonEvolutionCard({specie}: Props) {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Pokemon', undefined>
    >();
  const [pokeRef, setPokeRef] = useState({name: '', url: ''});
  async function GetPokemon() {
    if (specie?.url != undefined) {
      const res = await getPokemon(specie.url);
      setPokemon(res);
    }
  }
  useEffect(() => {
    if (specie?.url != undefined) {
      GetPokemon();
    }
  }, [specie]);
  useEffect(() => {
    if (pokemon != undefined) {
      setPokeRef({name: pokemon?.name, url: pokemon?.species.url});
    }
  }, [pokemon]);

  return (
    <TouchableOpacity
      style={{flex: 1, paddingHorizontal: 2}}
      onPress={() => {
        navigation.push('Pokemon', {
          pokemonRef: pokeRef,
        });
      }}>
      <Card mode="outlined">
        <Card.Content>
          <Card.Cover
            style={{}}
            source={{
              uri: pokemon?.sprites.other?.['official-artwork'].front_default,
            }}
          />
          <Title> {pokemon?.name} </Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
