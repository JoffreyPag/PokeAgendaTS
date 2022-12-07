import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import IEvolutionChain, { IChainLink, IChainSpecie } from '../../../interface/IEvolutionChain';
import {getEvolutionChain} from '../../../services/requisitions';

import PokemonEvolutionCard from './PokemonEvolutionCard';

interface Props {
  evolutionChainUrl: string | undefined;
}

export default function EvolutionList({evolutionChainUrl}: Props) {
  const [evolution, setEvolution] = useState<IEvolutionChain>();
  const [chain, setChain] = useState<IChainSpecie[]>([])
  async function getEvo(url:string){
    const res = await getEvolutionChain(url);
    setEvolution(res);
  } 

  useEffect(()=>{
    if(evolution != undefined){
      AddToChain(evolution.chain.species)
      VerifyChainSpecie(evolution.chain.evolves_to)
    }
  }, [evolution])

  useEffect(() => {
    if (evolutionChainUrl != undefined) {
      getEvo(evolutionChainUrl);
    }
  }, [evolutionChainUrl]);

  function VerifyChainSpecie(evolves_to:IChainLink[]){
    if(evolves_to != null && evolves_to.length > 0){
      AddToChain(evolves_to[0].species)
      VerifyChainSpecie(evolves_to[0].evolves_to)
    }
  }

  function AddToChain(specie:IChainSpecie){
    setChain(current => [...current, specie])
  }

  return (<View>
    <Text variant='titleMedium'> Evolution Chain: </Text>
    <View style={{flexDirection:'row', alignContent:'space-between'}}>
      
      {chain.map((evo, index) => (
        <PokemonEvolutionCard specie={evo} key={index}/>
      ))}
    </View>

  </View>);
}
