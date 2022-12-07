import React, { useEffect, useState } from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {IPokemonRef} from '../../../interface/IPokemonRef';
import { getPokemonImage } from '../../../services/requisitions';
import { CapitalizeFirstLetter } from '../../../utils/util';

interface Props {
  onClick?: () => void | undefined;
  pokemonRef:IPokemonRef
}

export default function PokemonItemList({onClick, pokemonRef}: Props) {

  const [imageURL, setImageUrl] = useState<string>()

  async function GetPokemonImage(){
    const res = await getPokemonImage(pokemonRef.url);
    setImageUrl(res);
  }

  useEffect(()=>{
    GetPokemonImage();
  }, [])

  return (
    <TouchableOpacity style={styles.item} onPress={onClick}>
      <Text style={styles.name} variant="titleLarge" >
        {pokemonRef.name && CapitalizeFirstLetter(pokemonRef.name)}
      </Text>
      {imageURL && <Image source={{uri:imageURL}} style = {styles.image}/>}
      
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({ 
  image:{
    width:80,
    height:80
  },
  item: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 16,
  },
  name:{
    paddingVertical: 16,
    alignSelf:'center',
  }
});
