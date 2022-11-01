import { IAbility } from "../interface/IAbility";
import { IPokemon } from "../interface/IPokemon";
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