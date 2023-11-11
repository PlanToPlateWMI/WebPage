import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import {
    useAddInFavoriteMutation,
    useGetFavoriteQuery,
} from "../redux/api/index.js";

const Przepis = ({ image, title, recipeId, isVege, time, categoryName, level, portions, steps, refetch }) => {
    const { token, favorites } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const safeFavorites = favorites || [];

    const [addInFavorite, { isSuccess }] = useAddInFavoriteMutation();

    const handleAddToFavorites = async () => {
        try {
            await addInFavorite(recipeId).unwrap();
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
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
                        pt: "56.25%",
                    }}
                    image={image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                        {isVege ? (
                            <span> 🌿</span>
                        ) : (
                            <span></span>
                        )}
                    </Typography>
                </CardContent>
                <CardActions>
                    <div>
                        <Button size="small" onClick={handleOpenDialog}>Zobacz przepis</Button>
                        <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle style={{ textAlign: 'center', backgroundColor: 'rgb(195, 172, 214)' }} >
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    {title}

                                </Typography>

                                <IconButton
                                    edge="end"
                                    style={{ position: 'absolute', right: 20, top: 10 }}
                                    color="inherit"
                                    onClick={handleCloseDialog}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent style={{ textAlign: 'left' }}>
                                <div style={{
                                    maxWidth: '250px',
                                    height: '250px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '15px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '10%',
                                    }}>
                                        <img
                                            src={image}
                                            alt={title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    {isVege && (
                                        <span style={{ fontSize: '18px', color: 'green' }}> 🌿 Przepis wegański 🌿</span>
                                    )}
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '18px', color: 'black' }}>📋 Kategoria: {categoryName}</span>
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '18px', color: 'black' }}>⏰ Czas: {time} minut</span>
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    {level === 'EASY' && (
                                        <span style={{ fontSize: '18px', color: 'black' }}>⭐ Łatwy</span>
                                    )}
                                    {level === 'MEDIUM' && (
                                        <span>
                                            <span style={{ fontSize: '18px', color: 'black' }}>⭐⭐ Średni</span>
                                        </span>
                                    )}
                                    {level === 'HARD' && (
                                        <span>
                                            <span style={{ fontSize: '18px', color: 'black' }}>⭐⭐⭐ Trudny</span>
                                        </span>
                                    )}
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '18px', color: 'black' }}>👪 Porcje: {portions}</span>
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '18px', color: 'black' }}>👣 kroki: {steps}</span>
                                </div>

                            </DialogContent>
                            <DialogActions>
                                <Button color="primary">
                                    тут добавить кнопку удалть с любимых если рецепт в любимом
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
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
