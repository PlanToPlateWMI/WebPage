import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import {
    useAddInFavoriteMutation,
    useGetFavoriteQuery,
} from "../redux/api/index.js";

const Przepis = ({ image, title, recipeId, refetch }) => {
    const { token, favorites } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    const safeFavorites = favorites || [];

    const [addInFavorite, { isSuccess }] = useAddInFavoriteMutation();

    const handleAddToFavorites = async () => {
        try {
            await addInFavorite(recipeId).unwrap();
        } catch (error) {
            // Обрабатываем ошибки здесь
            console.error("Error adding to favorites:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            // Если мутация была успешной, перезапрашиваем данные избранных рецептов
            refetch();
        }
    }, [isSuccess, refetch]);

    const isFavorite = safeFavorites.some((recipe) => recipe.id === recipeId);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: "56.25%",
                    }}
                    image={image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Zobacz przepis</Button>
                    {token !== "" && (
                        isFavorite ? (
                            <span style={{ marginLeft: 'auto', fontSize: '24px', color: 'red' }}>❤️</span>
                        ) : (
                            <Button size="small" onClick={handleAddToFavorites}>
                                Dodaj do ulubionych
                            </Button>
                        )
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Przepis;
