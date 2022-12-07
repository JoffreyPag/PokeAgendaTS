export default interface IEvolutionChain{
    id:number,
    chain:{
        evolves_to:IChainLink[],
        species:IChainSpecie,
    }
}
export interface IChainLink{
    species:IChainSpecie,
    is_baby:boolean,
    evolves_to:IChainLink[]
}
export interface IChainSpecie{
    name?:string,
    url?:string
}