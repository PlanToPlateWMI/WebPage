import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Header from "./header";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://github.com/orgs/PlanToPlateWMI/repositories">
                Plan To Plate
            </Link>{" "}
            {new Date().getFullYear()}
            {". Wszelkie prawa zastrzeżone."}
        </Typography>
    );
}

const defaultTheme = createTheme();


export function AboutUs() {

    const handleMailTo = () => {
        const subject = encodeURIComponent('Usunięcie konta'); // Temat wiadomości
        const email = 'plantoplatemobileapp@gmail.com'; // Adres e-mail odbiorcy
        window.location.href = `mailto:${email}?subject=${subject}`;
    };

    const buttonStyle = {
        backgroundColor: '#C3ACD6',
        color: 'white',
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
                         
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Jeżeli chcesz usunąć konto:  <span>&nbsp;&nbsp;</span></p>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={buttonStyle}
                    onClick={handleMailTo}
                >
                    Napisz do nas
                </Button>
            </div>

            {/* Footer */}
            <Box sx={{ backgroundColor: "#AA95BB", p: 2, position: "fixed", bottom: 0, width: "100%" }} component="footer">
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}
