import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { showPrzepis, setStateDialog } from "../redux/slices/authSlice.js";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import {
    useAddInFavoriteMutation
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
        dispatch(setStateDialog(true));
        dispatch(showPrzepis(id));
    };

    const [addInFavorite, { isSuccess }] = useAddInFavoriteMutation();

    const handleAddToFavorites = async () => {
        try {
            await addInFavorite(id).unwrap();
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);

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
                    image={image}
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
                        {title}
                        {vege ? <span> 🌿</span> : <span></span>}

                    </Typography>
                </CardContent>
                <CardActions>
                    <div>
                        <Button size="small" onClick={handleOpenDialog}>
                            Zobacz przepis
                        </Button>
                    </div>
                    {token !== "" && role === "ADMIN" &&
                        (isFavorite ? (
                            <Button size="small" >
                                Usuń z ulubionych
                            </Button>
                        ) : (
                            <Button size="small" onClick={handleAddToFavorites}>
                                Dodaj do ulubionych
                            </Button>
                        ))}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Przepis;
