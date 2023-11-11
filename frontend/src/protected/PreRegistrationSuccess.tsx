import {AppUser} from "../models/AppUser.ts";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Button, Container, TextField, Typography} from "@mui/material";
import {PokemonCard} from "../models/Pokemon.ts";
import {useState} from "react";
import PokemonCardGallery from "../components/pokemon/PokemonCardGallery.tsx";

type PreRegistrationSuccessProps = {
    appUser: AppUser | undefined;
}

export default function PreRegistrationSuccess(props: Readonly<PreRegistrationSuccessProps>) {
    const navigate = useNavigate();
    const [cards, setCards] = useState<PokemonCard[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loadingCards, setLoadingCards] = useState<boolean>(false);
    if (!props.appUser) return <Navigate to={"/"}/>

    function logout() {
        axios.post("/api/v1/auth/logout").then(() => {
            toast.success("Logout successful!");
            navigate("/")
        }).catch(() => {
            toast.error("Logout failed!");
            navigate("/")
        });
    }

    function fetchCards() {
        setLoadingCards(true)
        if (searchText && searchText.length > 3) {
            axios.get(`/api/v1/pokemon/cards?name=${searchText}`)
                .then((response) => {
                    setCards(response.data);
                })
                .catch(() => {
                    toast.error("Fetching cards failed!");
                })
                .finally(() => setLoadingCards(false));
        }
    }

    return (
        <Container
            maxWidth={"lg"}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "25px",
                padding: "10px"
            }}
        >
            <Typography variant={"h3"}>
                Thank you for registration, {props.appUser.username}!
            </Typography>
            <Typography paragraph>The Beta will start soon!</Typography>
            <Button onClick={logout} variant={"contained"} sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                width: "100%",
            }}>
                Logout
            </Button>
            <TextField id="search-for-card" label="Search Card(s)" variant="standard" value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}/>
            <Button onClick={fetchCards} variant={"contained"}>Search</Button>
            {
                loadingCards &&
                <Typography paragraph>
                    Loading Cards...
                </Typography>
            }
            {
                cards.length > 0 ?
                    <PokemonCardGallery appUser={props.appUser} pokemonCards={cards}/> :
                    <Typography paragraph>
                        No Cards found!
                    </Typography>
            }
        </Container>
    )
}