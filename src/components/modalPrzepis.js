import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import Own from "../images/own.jpg";
import { useGetMyRecipesQuery, useDeleteRecipeMutation, useGetAllQuery } from "../redux/api";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { closeDialogs } from "../redux/slices/authSlice.js";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ModalPrzepis = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { refetch } = useGetAllQuery();
    const { isModalOpen, selectedRecipe, recipes } = useAppSelector(
        (state) => state.authSlice
    );
    const { token, role } = useAppSelector((state) => state.authSlice);
    const isAuthenticated = token !== "";
    const dispatch = useAppDispatch();

    const { data: myRecipes } = useGetMyRecipesQuery(undefined, { skip: !isAuthenticated });
    const [deleteRecipe] = useDeleteRecipeMutation();

    const handleCloseDialog = () => {
        dispatch(closeDialogs(false));
    };

    if (selectedRecipe.id == null || recipes == null) {
        return;
    }

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe(selectedRecipe.id).unwrap();
            await refetch();
            // Handle success - e.g., show notification, refetch recipes, close dialog, etc.
        } catch (error) {
            // Handle error - e.g., show error notification
        }
    };

    const { image, title, id, vege, time, level, portions, steps, ingredients, source } =
        selectedRecipe;

    const safeRecipes = recipes || [];
    const categoryName = safeRecipes.find(
        (recipe) => recipe.id === id
    ).categoryName;

    const isMyRecipe = myRecipes?.some(recipe => recipe.id === selectedRecipe.id);

    const handleInfoClick = () => {
        window.open(source, '_blank');
    };
    return (
        <Dialog fullScreen open={isModalOpen} onClose={handleCloseDialog}>
            <DialogTitle
                style={{
                    textAlign: "center",
                    backgroundColor: "rgb(195, 172, 214)",
                }}>

                {source !== null && (
                    <IconButton
                        style={{ position: "absolute", left: 20, top: 10 }}
                        aria-label="info"
                        onClick={handleInfoClick}
                        title="Zobacz oryginalny przepis"
                    >
                        <InfoIcon />
                    </IconButton>
                )}

                <Typography
                    variant="h5"
                    style={{
                        fontWeight: "bold",
                        maxWidth: "1200px",
                        padding: "0 50px",
                        boxSizing: "border-box",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                    }}
                >
                    {title}
                </Typography>

                <IconButton
                    edge="end"
                    style={{ position: "absolute", right: 20, top: 10 }}
                    color="inherit"
                    onClick={handleCloseDialog}
                    aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ textAlign: "left" }}>

                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                        style={{
                            maxWidth: "450px",
                            height: "450px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "15px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "10%",
                            }}
                        >
                            {!isSmallScreen && (
                                <img
                                    src={image || Own}
                                    alt={title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />)}
                        </div>
                    </div>

                    <div style={{ marginLeft: "50px" }}>
                        <div style={{ marginTop: "30px" }}>
                            {vege && (
                                <span style={{ fontSize: "18px", color: "green" }}>
                                    {" "}
                                    🌿 Przepis wegański 🌿
                                </span>
                            )}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <span style={{ fontSize: "18px", color: "black" }}>
                                📗 Kategoria: {categoryName}
                            </span>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <span style={{ fontSize: "18px", color: "black" }}>
                                ⏰ Czas: {time} minut
                            </span>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            {level === "EASY" && (
                                <span style={{ fontSize: "18px", color: "black" }}>
                                    ⭐ Poziom trudności: Łatwy
                                </span>
                            )}
                            {level === "MEDIUM" && (
                                <span>
                                    <span style={{ fontSize: "18px", color: "black" }}>
                                        ⭐⭐ Poziom trudności: Średni
                                    </span>
                                </span>
                            )}
                            {level === "HARD" && (
                                <span>
                                    <span style={{ fontSize: "18px", color: "black" }}>
                                        ⭐⭐⭐ Poziom trudności: Trudny
                                    </span>
                                </span>
                            )}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <span style={{ fontSize: "18px", color: "black" }}>
                                👪 Porcje: {portions}
                            </span>
                        </div>

                        {token !== "" && role === "ROLE_ADMIN" && isMyRecipe ? (
                            <div style={{ marginTop: "50px", width: "200px" }}>
                                <Button
                                    variant="text"
                                    disableElevation
                                    style={{ backgroundColor: "#d11f1f", color: "white", width: "100%" }}
                                    onClick={handleDeleteRecipe}
                                >
                                    Usuń przepis
                                </Button>
                            </div>

                        ) : (
                            null
                        )}
                    </div>

                    <div style={{ marginTop: "30px", marginLeft: "50px" }}>
                        <span style={{ fontSize: "18px", color: "black" }}>
                            📋Lista skladnikow:
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {`${ingredient.ingredientName}: ${ingredient.quantity} ${ingredient.unit}`}
                                    </li>
                                ))}
                            </ul>
                        </span>
                    </div>
                </div>

                <div style={{ marginTop: "20px", maxWidth: "1100px" }}>
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "20px", color: "black" }}>
                            <b>Kroki:</b>{" "}
                        </span>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: steps.map(step => `⦿ ${step}`).join("<br>"),
                        }}
                        style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            fontSize: "18px",
                        }}
                    />
                </div>

            </DialogContent>

        </Dialog>
    );
};

export default ModalPrzepis;
