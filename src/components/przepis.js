import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";


const Przepis = ({ image, title, recipeId }) => {
    const { token, favorites } = useAppSelector((state) => state.authSlice);

    const recipeIds = [];

    const handleAddToFavorites = () => {
        const url = `https://plantoplate.lm.r.appspot.com/api/recipes/selected/${recipeId}`;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "";
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    const isFavorite = favorites.some(recipe => recipe.id === recipeId);

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
