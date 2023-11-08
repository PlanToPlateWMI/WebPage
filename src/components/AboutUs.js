import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Header from "./header";

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
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <h1>About us page</h1>

            {/* Footer */}
            <Box sx={{ backgroundColor: "#AA95BB", p: 2, position: "fixed", bottom: 0, width: "100%" }} component="footer">
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
