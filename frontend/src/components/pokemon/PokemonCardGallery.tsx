import {ImageList} from "@mui/material";
import {PokemonCard} from "../../models/Pokemon.ts";
import PokemonCardImage from "./PokemonCard.tsx";
import {AppUser} from "../../models/AppUser.ts";

type PokemonCardGalleryProps = {
    pokemonCards: PokemonCard[];
    appUser: AppUser;
}

export default function PokemonCardGallery(props: Readonly<PokemonCardGalleryProps>) {
    const cards = props.pokemonCards.map((pokemonCard) => <PokemonCardImage appUser={props.appUser}
                                                                            pokemonCard={pokemonCard}
                                                                            key={pokemonCard.id}/>);

    return (
        <ImageList sx={{width: 500, height: 450}}>
            {cards}
        </ImageList>
    );
}