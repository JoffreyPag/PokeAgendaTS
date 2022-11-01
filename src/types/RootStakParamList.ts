import {IPokemonRef} from '../interface/IPokemonRef';

export type RootStackParamList = {
  Home: undefined;
  Pokemon: {pokemonRef: IPokemonRef};
};
