import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Own from "../images/own.jpg";
import { showPrzepis, openModalPrzepisDialog } from "../redux/slices/authSlice.js";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import {
    useAddInFavoriteMutation, useRemoveFromFavoriteMutation
} from "../redux/api/index.js";

const Przepis = ({ recipe, refetch }) => {
    const {
        image,
        title,
        id,
        vege,
        time,
        categoryName,
        level,
        portions,
        steps,
    } = recipe;
    const { token, favorites, role } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    //console.log(recipe);

    const handleOpenDialog = () => {
        console.log(id);
        dispatch(openModalPrzepisDialog(true));
        dispatch(showPrzepis(id));
    };

    const [addInFavorite, { isSuccess }] = useAddInFavoriteMutation();

    const handleAddToFavorites = async () => {
        try {
            await addInFavorite(id).unwrap();
        } catch (error) {
            console.error("Error adding to favorites: ", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);

    const [removeFromFavorite, { isSuccess: removeSuccess }] = useRemoveFromFavoriteMutation();

    const handleRemoveFromFavorites = async () => {
        try {
            await removeFromFavorite(id).unwrap();
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    useEffect(() => {
        if (removeSuccess) {
            refetch();
        }
    }, [removeSuccess, refetch]);

    const safeFavorites = favorites || [];
    const isFavorite = safeFavorites.some((recipe) => recipe.id === id);

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
                        pt: "56.25%",
                        position: "relative",
                    }}
                    image={image || Own}
                >
                    {isFavorite && (
                        <span
                            style={{
                                fontSize: "40px",
                                color: "red",
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                            }}
                        >
                            ❤️
                        </span>
                    )}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">

                        <div style={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 2, // Maximum number of lines
                            WebkitBoxOrient: 'vertical',
                            maxHeight: '3em', // Three lines' height
                            boxSizing: "border-box", // To include padding within maxWidth
                            whiteSpace: "normal", // Allow text to wrap
                            wordWrap: "break-word", // Wrap long words
                        }}>
                            {vege ? <span> 🌿</span> : <span></span>}
                            {title}
                        </div>
                    </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <Button
                            variant="text"
                            disableElevation
                            style={{
                                backgroundColor: "#C3ACD6",
                                color: "white",
                                flex: 1,
                            }}
                            onClick={handleOpenDialog}
                        >
                            Zobacz przepis
                        </Button>
                        {(token !== "" && role === "ROLE_ADMIN") &&
                            (isFavorite ? (
                                <Button
                                    variant="text"
                                    disableElevation
                                    style={{
                                        backgroundColor: "#C3ACD6",
                                        color: "white",
                                        flex: 1,
                                    }}
                                    onClick={handleRemoveFromFavorites}
                                >
                                    Usuń z ulubionych
                                </Button>
                            ) : (
                                <Button
                                    variant="text"
                                    disableElevation
                                    style={{
                                        backgroundColor: "#C3ACD6",
                                        color: "white",
                                        flex: 1,
                                    }}
                                    onClick={handleAddToFavorites}
                                >
                                    Dodaj do ulubionych
                                </Button>
                            ))}
                    </div>
                </CardActions>


            </Card>
        </Grid>
    );
};

export default Przepis;
