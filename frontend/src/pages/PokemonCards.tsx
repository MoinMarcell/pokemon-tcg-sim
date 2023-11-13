import {PokemonCard} from "../components/pokemon-cards/PokemonTypes.ts";
import PokemonImageList from "../components/pokemon-cards/PokemonImageList.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {AppUser} from "../App.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import PokeballLoadSpinner from "../components/PokeballLoadSpinner.tsx";

type PokemonCardsProps = {
    appUser: AppUser | null | undefined;
    isLoading: boolean;
}

export default function PokemonCards(props: Readonly<PokemonCardsProps>) {
    const navigate = useNavigate();
    const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function getPokemonCards() {
        setIsLoading(true);
        axios.get("/api/v1/pokemon/cards")
            .then((response) => setPokemonCards(response.data.pokemonCards))
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if ((props.appUser === undefined || props.appUser === null) && !props.isLoading) {
            navigate("/login");
            toast.error("To view Cards, you must be logged in.");
        } else {
            getPokemonCards();
        }
    }, [props.isLoading, navigate, props.appUser]);

    if (isLoading || props.isLoading) return <PokeballLoadSpinner/>;

    return <PokemonImageList appUser={props.appUser} pokemonCards={pokemonCards}/>;
}