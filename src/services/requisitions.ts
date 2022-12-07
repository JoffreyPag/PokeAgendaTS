import { IAbility } from "../interface/IAbility";
import { IPokemon } from "../interface/IPokemon";
import ISpecie from "../interface/ISpecie";
import { api } from "./api";

export async function getPokemons(){
    try{
        const res = await api.get('pokemon/');
        return res;
    }catch(error){
        console.log(error)
    }
    return null
}
export async function getMorePokemons(url:string){
    try{
        var newUrl = url.slice(26);
        console.log(newUrl);
        const res = await api.get(newUrl);
        return res;
    }catch(error){
        console.log(error)
    }
    return null
}

export async function getPokemon(url:string){
    try{
        var id = url.split('/')[6]
        const res = await api.get(`pokemon/${id}`)
        return res.data
    }catch(error){
        console.log(error);
    }
    return {}
}

export async function getAbility(url:string) {
    try{
        var id = url.split('/')[6]
        const res = await api.get<IAbility>(`ability/${id}`)
        return res.data
    }catch(error){
        console.log(error);
    }
    return {}
}

export async function getSpecie(url:string) {
    try{
        var id = url.split('/')[6]
        const res = await api.get(`pokemon-species/${id}`)
        return res.data
    }catch(error){
        console.log(error);
    }
    return {}
}
export async function getEvolutionChain(url:string) {
    try{
        var id = url.split('/')[6]
        const res = await api.get(`evolution-chain/${id}`)
        return res.data
    }catch(error){
        console.log(error);
    }
    return {}
}

export async function getPokemonImage(url:string){
    try{
        var id = url.split('/')[6]
        const res = await api.get<IPokemon>(`pokemon/${id}`)
        return res.data.sprites.other?.['official-artwork'].front_default
    }catch(error){
        console.log(error);
    }
    return undefined
}
