import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import IEvolutionChain from '../../../interface/IEvolutionChain';
import {getEvolutionChain} from '../../../services/requisitions';

import PokemonEvolutionCard from './PokemonEvolutionCard';

interface Props {
  evolutionChainUrl: string | undefined;
}

export default function EvolutionList({evolutionChainUrl}: Props) {
  const [evolution, setEvolution] = useState<IEvolutionChain>();
  const evoCards = []
  async function getEvo(url:string){
    const res = await getEvolutionChain(url);
    setEvolution(res);
  } 


  useEffect(()=>{
    console.log(".")
    if(evolution != undefined){
      //TODO
    }
  }, [evolution])
  
  useEffect(() => {
    if (evolutionChainUrl != undefined) {
      getEvo(evolutionChainUrl);
    }
  }, [evolutionChainUrl]);

  return (<View>
    <Text variant='titleMedium'> Evolution Chain: </Text>
    <View style={{flexDirection:'row', alignContent:'space-between'}}>
      <PokemonEvolutionCard specie={evolution?.chain.species}/>
      
      {evolution?.chain.evolves_to.map((evo, index)=>(
        <PokemonEvolutionCard specie={evo.species} key={index}/>
        ))}
      
      {}
    </View>

  </View>);
}
