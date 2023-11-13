export type PokemonApiResponse = {
    pokemonCards: PokemonCard[],
    page: number,
    pages: number,
    pageSize: number,
    cardsFound: number,
    totalCards: string
}

export type PokemonCard = {
    id: string,
    name: string,
    supertype: string,
    subtypes: string[],
    level: string,
    hp: string,
    types: string[],
    rules: string[],
    abilities: PokemonAbility[],
    attacks: PokemonAttack[],
    weaknesses: PokemonWeakness[],
    resistances: PokemonResistance[],
    retreatCost: string[],
    convertedRetreatCost: number,
    flavorText: string,
    images: PokemonImage,
}

type PokemonAbility = {
    name: string,
    text: string,
    type: string
}

type PokemonAttack = {
    name: string,
    cost: string[],
    convertedEnergyCost: string,
    damage: string,
    text: string
}

type PokemonWeakness = {
    type: string,
    value: string
}

type PokemonResistance = {
    type: string,
    value: string
}

type PokemonImage = {
    small: string,
    large: string
}
