import React, { useState, useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Avatar } from "@mui/material";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import { useGetFavoriteQuery } from "../redux/api/index.js";


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

const defaultTheme = createTheme();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let recipeData = [];

fetch("https://plantoplate.lm.r.appspot.com/api/recipes", requestOptions)
    .then(response => response.text())
    .then(result => {
        recipeData = JSON.parse(result);
    })
    .catch(error => console.log('error', error));


export function RecepiesPage() {
    const [page, setPage] = useState(1); // Current page
    const recipesPerPage = 12;
    const offset = (page - 1) * recipesPerPage;
    const pageCount = Math.ceil(recipeData.length / recipesPerPage);

    const { favorites } = useGetFavoriteQuery();

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {recipeData.slice(offset, offset + recipesPerPage).map((recipe) => (
                            <Przepis key={recipe.id} image={recipe.image} title={recipe.title} recipeId={recipe.id} />
                        ))}
                    </Grid>
                </Container>
            </main>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                 
                />
            </Box>

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
