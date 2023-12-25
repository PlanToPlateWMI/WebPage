import React, { useEffect, useState } from "react";
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
import ModalAddPrzepis from "./modalAddPrzepis.js";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { openModalAddDialog } from "../redux/slices/authSlice.js";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        setPage(1);
    }, [filter, filterLevel]);

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

                <Container sx={{ py: 1 }} maxWidth="md">
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
                                    <Checkbox {...label} />
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
                                    <Checkbox {...label} />
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        null
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            p: 1,
                            flexDirection: { xs: 'column', md: 'row' }, // Change direction on small screens
                            alignItems: { xs: 'flex-start', md: 'center' },
                        }}>
                        <h3>Wybierz<br></br> kategorię: &nbsp;&nbsp;</h3>
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
                            p: 1,
                            flexDirection: { xs: 'column', md: 'row' }, // Change direction on small screens
                            alignItems: { xs: 'flex-start', md: 'center' },
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
                <Copyright />
            </Box>
            <ModalPrzepis />
            <ModalAddPrzepis />
        </ThemeProvider>
    );
}
