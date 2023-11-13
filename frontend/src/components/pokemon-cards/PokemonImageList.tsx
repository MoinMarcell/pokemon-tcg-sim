import {PokemonCard} from "./PokemonTypes.ts";
import PokemonImageListItem from "./PokemonImageListItem.tsx";
import Box from "@mui/material/Box";
import {AppUser} from "../../App.tsx";
import {Grid} from "@mui/material";

type PokemonImageListProps = {
    pokemonCards: PokemonCard[];
    appUser: AppUser | null | undefined;
}

export default function PokemonImageList(props: Readonly<PokemonImageListProps>) {
    const cards = props
        .pokemonCards
        .map((card) => <PokemonImageListItem key={card.id} appUser={props.appUser} pokemonCard={card}/>);

    return (
        <Box
            sx={{flexGrow: 1, p: 2}}
        >
            <Grid container spacing={2} justifyContent="center">
                {cards}
            </Grid>
        </Box>
    );
}