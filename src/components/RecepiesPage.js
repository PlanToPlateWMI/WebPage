/*
 * Copyright 2023 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import {
    useGetAllQuery,
    useGetFavoriteQuery,
    useGetCategoriesQuery,
    useGetMyRecipesQuery
} from "../redux/api/index.js";
import Header from "./header";
import Przepis from "./przepis";
import ModalPrzepis from "./modalPrzepis.js";
import ModalAddPrzepis from "./modalAddPrzepis.js";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from "../app/hooks.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const defaultTheme = createTheme();

export function RecepiesPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const { refetch } = useGetFavoriteQuery();
    const { data: recipeData } = useGetAllQuery();
    const { data: categories } = useGetCategoriesQuery();
    const { token, role } = useAppSelector((state) => state.authSlice);

    const [filter, setFilter] = useState("Wszystkie");
    const [filterLevel, setFilterLevel] = useState("all");
    const filtersLevel = [
        { friendlyTitle: "Wszystkie", id: "all" },
        { friendlyTitle: "Łatwe", id: "EASY" },
        { friendlyTitle: "Średnie", id: "MEDIUM" },
        { friendlyTitle: "Ciężkie", id: "HARD" },
    ];

    const [containerVisible, setContainerVisible] = useState(false);

    const toggleContainer = () => {
        setContainerVisible(!containerVisible);
    };
    const { data: favoriteRecipesData } = useGetFavoriteQuery();
    const { data: ownRecipesData } = useGetMyRecipesQuery();

    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [showOnlyOwn, setShowOnlyOwn] = useState(false);

    const handleCheckboxChange = (event) => {
        setShowOnlyFavorites(event.target.checked);
    };
    const handleOwnCheckboxChange = (event) => {
        setShowOnlyOwn(event.target.checked);
    };

    useEffect(() => {
        setPage(1);
    }, [filter, filterLevel, showOnlyFavorites, showOnlyOwn, searchQuery]);

    if (!recipeData || !categories) {
        return;
    }

    const recipesPerPage = 12;
    const offset = (page - 1) * recipesPerPage;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const filteredRecipes = recipeData
        .filter((recipe) => {
            if (showOnlyFavorites) {
                return favoriteRecipesData.some((favRecipe) => favRecipe.id === recipe.id);
            }
            return true;
        })
        .filter((recipe) => {
            if (showOnlyOwn) {
                return ownRecipesData.some((ownRecipe) => ownRecipe.id === recipe.id);
            }
            return true;
        })
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
    ;
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <main style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', paddingTop: '90px' }}>
                <Paper
                    component="form"
                    sx={{
                        p: '5px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        width: isSmallScreen ? '90vw' : 600,
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="text"
                        disableElevation
                        style={{
                            backgroundColor: '#C3ACD6',
                            color: 'white',
                            width: '220px',
                            marginTop: '20px',
                        }}
                        onClick={toggleContainer}
                    >
                        {containerVisible ? 'Zamknij filtrowanie' : 'Otwórz filtrowanie'}
                    </Button>
                </div>

                <Container sx={{ py: 1 }} maxWidth="md">
                    <div>


                        {containerVisible && (
                            <div>
                                {token !== "" && role === "ROLE_ADMIN" ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    p: 1,
                                                }}
                                            >
                                                <h3>Tylko własne przepisy: &nbsp;&nbsp;</h3>
                                                <Checkbox
                                                    checked={showOnlyOwn}
                                                    onChange={handleOwnCheckboxChange}
                                                    {...label}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    p: 1,
                                                }}
                                            >
                                                <h3>Tylko ulubione przepisy: &nbsp;&nbsp;</h3>
                                                <Checkbox
                                                    checked={showOnlyFavorites}
                                                    onChange={handleCheckboxChange}
                                                    {...label}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    null
                                )}

                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={6} md={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <h3>Wybierz kategorię:</h3>
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            checked={filter === 'Wszystkie'}
                                                            onChange={() => setFilter('Wszystkie')}
                                                            value="Wszystkie"
                                                        />
                                                    }
                                                    label="Wszystkie"
                                                />
                                                {categories.map((item) => (
                                                    <FormControlLabel
                                                        key={item.id}
                                                        control={
                                                            <Radio
                                                                checked={filter === item.name}
                                                                onChange={() => setFilter(item.name)}
                                                                value={item.name}
                                                            />
                                                        }
                                                        label={item.name}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <h3>Wybierz poziom trudności:</h3>
                                                {filtersLevel.map((item) => (
                                                    <FormControlLabel
                                                        key={item.id}
                                                        control={
                                                            <Radio
                                                                checked={filterLevel === item.id}
                                                                onChange={() => setFilterLevel(item.id)}
                                                                value={item.friendlyTitle}
                                                            />
                                                        }
                                                        label={item.friendlyTitle}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        )}
                    </div>
                    <Grid container spacing={4} sx={{ marginTop: '10px' }}>
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
            {Math.ceil(filteredRecipesCount / recipesPerPage) > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                    <Pagination
                        count={Math.ceil(filteredRecipesCount / recipesPerPage)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Box>
            )}
            <ModalPrzepis />
            <ModalAddPrzepis />
        </ThemeProvider>
    );
}
