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
import {Appbar, useTheme, Text, Chip, Divider} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;

export default function Pokemon({route, navigation}: Props) {
  const pokemonref = route.params.pokemonRef;
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const theme = useTheme();
  async function GetPokemonData() {
    const res = await getPokemon(pokemonref.url);
    setPokemon(res);
  }
  useEffect(() => {
    GetPokemonData();
  }, []);
  useEffect(() => {
    setImageUrl(pokemon?.sprites.other?.['official-artwork'].front_default);
  }, [pokemon]);
  async function OnAbilityPressed(url: string) {}
  return (
    <View style={{backgroundColor:theme.colors.background, flex:1, flexDirection:'column'}}>
      <View style={style.backgroundImage}>
        <Image style={style.image} source={{uri: imageUrl}} />
      </View>
      <Divider/>
      <Text style={style.pokemonName} variant="titleLarge">
        {pokemon?.name?.toUpperCase()}
      </Text>
      <Divider/>
      <Text style={style.info} variant="bodyLarge">
        Height: {pokemon?.height}
      </Text>
      <Divider/>
      <Text style={style.info} variant="bodyLarge">
        Weight: {pokemon?.weight}
      </Text>
      <Divider/>
      <Text style={style.info} variant="bodyLarge">
        Type:
      </Text>
      <View style={style.typeList}>
        {pokemon?.types.map((type, index)=>(
          <Chip mode='outlined' style={style.type} compact key={index}>{type.type.name}</Chip>
        ))}
      </View>
      <Divider/>
      <FlatList
        data={pokemon?.abilities}
        ListHeaderComponent={<Text> Abilities </Text>}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={style.itemButton}
              onPress={() => OnAbilityPressed(item.ability.url)}>
              <Text style={[style.abilitiesItem, {}]} variant='bodyLarge'>{item.ability.name}</Text>
              <Icon
                name="arrow-forward-ios"
                size={24}
                color={theme.colors.onPrimaryContainer}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text> Evolution Chain: WIP </Text>
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
    marginVertical: 16
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  typeList:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'flex-start',
    marginVertical: 8
  },
  type:{
    height: 'auto',
    width:'auto',
    marginHorizontal:4,
    marginVertical: 2
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
