import {PokemonCard} from "./PokemonTypes.ts";
import {CardMedia, Grid} from "@mui/material";
import {AppUser} from "../../App.tsx";

type PokemonImageProps = {
    pokemonCard: PokemonCard;
    appUser: AppUser | null | undefined;
}

export default function PokemonImageListItem(props: Readonly<PokemonImageProps>) {
    return (
        <Grid item xs={8} md={4} lg={2}>
            <CardMedia
                component="img"
                alt={props.pokemonCard.name}
                image={props.pokemonCard.images.small}
            />
        </Grid>
    );
}