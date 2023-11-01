import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Avatar } from "@mui/material";

import Header from "./header";
import Przepis from "./przepis";

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const defaultTheme = createTheme();

export function RecepiesPage() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card, index) => (
                            <Przepis
                                key={index}
                                image="https://source.unsplash.com/random?wallpapers"
                                title="Nazwa przepisu"
                            />
                        ))}
                    </Grid>
                </Container>
            </main>

            {/* Footer */}
            <Box sx={{ backgroundColor: "#AA95BB", p: 2 }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p">
                    Email:{" "}
                    <a href="mailto:plantoplatemobileapp@gmail.com">
                        plantoplatemobileapp@gmail.com
                    </a>
                </Typography>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}
