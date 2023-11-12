import {AppUser} from "../models/AppUser.ts";
import {Navigate, useParams} from "react-router-dom";

type FavoriteCardsProps = {
    appUser: AppUser;
}

export default function FavoriteCards(props: Readonly<FavoriteCardsProps>) {
    const params = useParams();
    const username = params.username;

    if (!username) {
        return <Navigate to={"/"}/>;
    }

    if (props.appUser.username !== username) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div>
            <h1>Favorite Cards of {props.appUser.username}</h1>
            {
                props.appUser.favoritePokemonCardIds.length === 0 && <div>No favorite cards yet!</div>
            }
            {
                props.appUser.favoritePokemonCardIds.length > 0 && props.appUser.favoritePokemonCardIds.map((id) => {
                    return <div key={id}>{id}</div>
                })
            }
        </div>
    );
}