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

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GrassTwoToneIcon from '@mui/icons-material/GrassTwoTone';

import SignalCellular1BarIcon from '@mui/icons-material/SignalCellular1Bar';
import SignalCellular3BarIcon from '@mui/icons-material/SignalCellular3Bar';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';

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
                    borderRadius: 5,
                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                        transform: "scale(1.05)",
                                    },
                }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        pt: "70%",
                        position: "relative",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={handleOpenDialog}
                    image={image || Own}
                >
                </CardMedia>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {(token !== "" && role === "ROLE_ADMIN") && (
                        <Button size="small" onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites} style={{ minWidth: 'unset' }}>
                            {isFavorite ? <FavoriteOutlinedIcon style={{ color: "#757575", fontSize: '1.1rem' }}/> :
                                        <FavoriteBorderOutlinedIcon style={{ color: "#757575", fontSize: '1.1rem' }}/>}
                        </Button>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeOutlinedIcon style={{ color: "#757575", fontSize: '1.1rem', marginRight: '4px' }}/> 
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.1rem' }}>{time} min.</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {level === "EASY" ? 
                            <SignalCellular1BarIcon style={{ color: "#757575", fontSize: '1.1rem', marginRight: '4px' }}/> : 
                            level === "MEDIUM" ? 
                                <SignalCellular3BarIcon style={{ color: "#757575", fontSize: '1.1rem', marginRight: '4px' }}/> : 
                                <SignalCellular4BarIcon style={{ color: "#757575", fontSize: '1.1rem', marginRight: '4px' }}/>
                        }
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.1rem' }}>
                            {level === "EASY" ? "łat." : level === "MEDIUM" ? "śr." : "tr."}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <GrassTwoToneIcon style={{ color: vege ? "#04610f" : '#757575', fontSize: '1.1rem' }} />
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.1rem' }}></Typography>
                    </div>

                </CardActions>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    noWrap="true"
                    sx={{
                        height: '38px',
                        maxWidth: '100%',
                        paddingRight: '12px',
                        paddingLeft: '12px',
                        textAlign: 'center',
                        fontSize: '1.1rem'
                    }}
                    >
                    {title}
                </Typography>
            </Card>
        </Grid>
    );
};

export default Przepis;
