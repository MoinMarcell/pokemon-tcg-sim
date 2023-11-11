import {PokemonCard} from "../../models/Pokemon.ts";
import {IconButton, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GradeIcon from '@mui/icons-material/Grade';
import axios from "axios";
import {useState} from "react";
import {toast} from "react-toastify";
import {AppUser} from "../../models/AppUser.ts";

type PokemonCardProps = {
    pokemonCard: PokemonCard;
    appUser: AppUser;
}
export default function PokemonCardImage(props: Readonly<PokemonCardProps>) {
    const [isFavorite, setIsFavorite] = useState<boolean>(props.appUser.favoritePokemonCardIds.includes(props.pokemonCard.id));
    const [loading, setLoading] = useState<boolean>(false);

    function addToFavorites() {
        setLoading(true)
        axios.patch(`/api/v1/users/add-favorite/${props.pokemonCard.id}`)
            .then(() => {
                setIsFavorite(true);
                toast.success(props.pokemonCard.name + " added to favorites!");
            })
            .catch(() => {
                toast.error("Adding to favorites failed! Try again later!");
            })
            .finally(() => setLoading(false));
    }

    function deleteFromFavorites() {
        setLoading(true)
        axios.patch(`/api/v1/users/remove-favorite/${props.pokemonCard.id}`)
            .then(() => {
                setIsFavorite(false);
                toast.success(props.pokemonCard.name + " removed from favorites!");
            })
            .catch(() => {
                toast.error("Removing from favorites failed! Try again later!");
            })
            .finally(() => setLoading(false));
    }

    let icon;

    if (isFavorite) {
        icon = (
            <Tooltip title="Remove from favorites">
                <GradeIcon onClick={deleteFromFavorites}/>
            </Tooltip>
        )
    } else {
        icon = (
            <Tooltip title="Add to favorites">
                <StarOutlineIcon onClick={addToFavorites}/>
            </Tooltip>
        )
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <ImageListItem>
            <img
                srcSet={`${props.pokemonCard.images.small}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${props.pokemonCard.images.small}?w=248&fit=crop&auto=format`}
                alt={props.pokemonCard.name}
                loading="lazy"
            />
            <ImageListItemBar
                title={props.pokemonCard.name}
                actionIcon={
                    <IconButton
                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                        aria-label={`info about ${props.pokemonCard.name}`}
                    >
                        {icon}
                    </IconButton>
                }
            />
        </ImageListItem>
    );
}