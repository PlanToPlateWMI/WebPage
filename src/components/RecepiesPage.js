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
import { useGetAllQuery, useGetDetailsMutation, useGetFavoriteQuery } from "../redux/api/index.js";
import { useAppSelector } from "../app/hooks.js";

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



export function RecepiesPage() {
    const [page, setPage] = useState(1); // Current page
    const { token } = useAppSelector((state) => state.authSlice);

    const { data: favoriteData, refetch } = useGetFavoriteQuery();
    const { data: recipeData, isLoading, isError } = useGetAllQuery();

    const { data: recipeDataDetails } = useGetDetailsMutation();

    if(!recipeData) {
        return;
    }

    if(!recipeDataDetails) {
        return;
    }

    const recipesPerPage = 12;
    const offset = (page - 1) * recipesPerPage;
    const pageCount = Math.ceil(recipeData.length / recipesPerPage);
    
    
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const combinedData = recipeData.map((recipe) => {
        const details = recipeDataDetails.find((detail) => detail.id === recipe.id);
        return { ...recipe, ...(details || {}) }; // Use empty object if details not found
      });

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                 
                        {combinedData 
                            .slice(offset, offset + recipesPerPage)
                            .map((recipe) => (
                                <Przepis
                                    key={recipe.id}
                                    image={recipe.image}
                                    title={recipe.title}
                                    recipeId={recipe.id}
                                    isVege={recipe.vege}
                                    time={recipe.time}
                                    categoryName={recipe.categoryName}
                                    level={recipe.level}
                                    portions={recipe.portions}
                                    steps={recipe.steps}
                                    refetch={refetch}
                                />
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
