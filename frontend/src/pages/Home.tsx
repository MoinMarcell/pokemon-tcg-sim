import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "@mui/material";

export default function Home() {
    return (
        <Container sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: '1rem',
                padding: '1rem',
                textAlign: 'center',
            }}>
                <Typography variant="h2" color="primary.main">Welcome to the Pokemon TCG Sim!</Typography>
                <Typography variant="h4" color="primary.main">This is a work in progress.</Typography>
                <Typography paragraph color="primary.main">
                    This is a project to simulate the Pokemon TCG. It is currently in the early stages of development.
                    For now, you can only <Link href={"/register"}>register</Link>, <Link href={"/login"}>login</Link>,
                    search for <Link href={"/cards"}>Cards</Link> and add them as favorites.
                </Typography>
                <Box component="div">
                    <Tooltip title="GitHub" arrow>
                        <IconButton
                            onClick={() => window.open("https://github.com/MoinMarcell/pokemon-tcg-sim", '_blank', "noopener")}>
                            <FontAwesomeIcon icon={faGithub}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Discord" arrow>
                        <IconButton onClick={() => window.open("https://discord.gg/cf8EebFKxU", '_blank', "noopener")}>
                            <FontAwesomeIcon icon={faDiscord}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Container>
    );
}