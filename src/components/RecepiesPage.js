import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import {
    useGetAllQuery,
    useGetFavoriteQuery,
    useGetCategoriesQuery,
} from "../redux/api/index.js";

import Header from "./header";
import Przepis from "./przepis";
import ModalPrzepis from "./modalPrzepis.js";

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
    const [page, setPage] = useState(1); 
    const { refetch } = useGetFavoriteQuery();
    const { data: recipeData } = useGetAllQuery();
    const { data: categories } = useGetCategoriesQuery();

    const [filter, setFilter] = useState("Wszystkie");
    const [filterLevel, setFilterLevel] = useState("all");
    const filtersLevel = [
        { friendlyTitle: "Wszystkie", id: "all" },
        { friendlyTitle: "Łatwe", id: "EASY" },
        { friendlyTitle: "Średnie", id: "MEDIUM" },
        { friendlyTitle: "Ciężkie", id: "HARD" },
    ];

    if (!recipeData) {
        return;
    }

    if (!categories) {
        return;
    }

    const recipesPerPage = 12;
    const offset = (page - 1) * recipesPerPage;
    const pageCount = Math.ceil(recipeData.length / recipesPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredRecipes = recipeData
        .filter((recipe) => {
            if (filter === "Wszystkie") return true;
            return recipe.categoryName === filter;
        })
        .filter((recipe) => {
            if (filterLevel === "all") return true;
            return recipe.level === filterLevel;
        });

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 2,
                        }}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={filter === "Wszystkie"}
                                    onChange={() => setFilter("Wszystkie")}
                                    value="Wszystkie"
                                />
                            }
                            label="Wszystkie"
                            key={0}
                        />
                        {categories.map((item) => (
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={filter === item.name}
                                        onChange={() => setFilter(item.name)}
                                        value={item.name}
                                    />
                                }
                                label={item.name}
                                key={item.id}
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 2,
                        }}>
                        {filtersLevel.map((item) => (
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={filterLevel === item.id}
                                        onChange={() => setFilterLevel(item.id)}
                                        value={item.friendlyTitle}
                                    />
                                }
                                label={item.friendlyTitle}
                                key={item.id}
                            />
                        ))}
                    </Box>
                    <Grid container spacing={4}>
                        {filteredRecipes
                            .slice(offset, offset + recipesPerPage)
                            .map((recipe) => (
                                <Przepis
                                    key={recipe.id}
                                    recipe={recipe}
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
            <ModalPrzepis />
        </ThemeProvider>
    );
}
