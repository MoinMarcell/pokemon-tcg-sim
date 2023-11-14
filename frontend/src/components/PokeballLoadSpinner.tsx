import "./PokeballLoadSpinner.css"
import Box from "@mui/material/Box";

export default function PokeballLoadSpinner() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.8)',
            }}
            component="div"
        >
            <Box component="div" className="pokemon"></Box>
        </Box>
    );
}
