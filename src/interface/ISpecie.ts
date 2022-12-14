export default interface ISpecie{
    id:number,
    name:string,
    order?:number,
    gender_rate?:number,
    capture_rate?:number,
    base_hapiness?:number,
    is_baby?:boolean,
    is_mythical?:boolean,
    hatch_counter?:number,
    has_gender_differences?:boolean,
    forms_switchable?:boolean,
    grow_rate:{
        name?:string,
        url?:string
    },
    pokedex_number:{
        entry_number?:number,
        pokedex:{
            name?:string,
            url?:string
        }
    }[],
    egg_group?:{
        name:string,
        url:string
    }[],
    shape:{
        name?:string,
        url?:string
    },
    evolution_chain:{
        url:string
    },
    evolves_from_species:{
        name?:string,
        url?:string
    },
    habitat:{
        name?:string,
        url?:string
    },
    varieties?:{
        id_default:boolean,
        pokemon:{
            name:string,
            url:string
        }
    }[]
}