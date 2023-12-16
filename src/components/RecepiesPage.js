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
import Button from "@mui/material/Button";
import Header from "./header";
import Przepis from "./przepis";
import ModalPrzepis from "./modalPrzepis.js";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


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
    const [searchQuery, setSearchQuery] = useState('');
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



    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const filteredRecipes = recipeData
        .filter((recipe) => {
            if (filter === "Wszystkie") return true;
            return recipe.categoryName === filter;
        })
        .filter((recipe) => {
            if (filterLevel === "all") return true;
            return recipe.level === filterLevel;
        })
        .filter((recipe) => {
            if (searchQuery === '') return true;
            return recipe.title.toLowerCase().includes(searchQuery);
        });

    let filteredRecipesCount = 0;

    if (filteredRecipes) {
        filteredRecipesCount = filteredRecipes.length;
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
                <Paper
                    component="form"
                    sx={{
                        p: '5px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 600,
                        margin: '0 auto',
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Szukaj przepis"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {searchQuery && (
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="clear"
                            onClick={() => setSearchQuery('')}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Paper>
                <Container sx={{ py: 2 }} maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            p: 2,
                        }}>
                        <h3>Wybierz kategorię: &nbsp;&nbsp;</h3>
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
                            justifyContent: "flex-start",
                            p: 2,
                        }}>
                        <h3>Wybierz poziom &nbsp;&nbsp;&nbsp;&nbsp; <br /> trudności: &nbsp;&nbsp;&nbsp;&nbsp;  </h3>
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
                <div style={{ position: 'fixed', bottom: '18%', right: '35px', zIndex: '999' }}>
                <Button
                    variant="text"
                    disableElevation
                    style={{
                        backgroundColor: "#C3ACD6",
                        color: "white",
                        width: 30,
                        height: 60,
                        borderRadius: '50%',
                        fontSize: '36px',
                    }}
                    title="Dodaj własny przepis"
                >
                    +
                </Button>
            </div>

            </main>

            {/* Pagination */}
            {Math.ceil(filteredRecipesCount / recipesPerPage) > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                    <Pagination
                        count={Math.ceil(filteredRecipesCount / recipesPerPage)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Box>
            )}

            {/* Footer */}
            <Box sx={{ backgroundColor: "#AA95BB", p: 2, marginTop: 'auto' }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
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
