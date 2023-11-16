import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { setStateDialog } from "../redux/slices/authSlice.js";

const ModalPrzepis = () => {
    const { isModalOpen, selectedRecipe, recipes } = useAppSelector(
        (state) => state.authSlice
    );
    const dispatch = useAppDispatch();

    const handleCloseDialog = () => {
        dispatch(setStateDialog(false));
    };

    if (!selectedRecipe.id) {
        return;
    }

    const { image, title, id, vege, time, level, portions, steps, ingredients, source } =
        selectedRecipe;

    const safeRecipes = recipes || [];
    const categoryName = safeRecipes.find(
        (recipe) => recipe.id === id
    ).categoryName;

    return (
        <Dialog fullScreen open={isModalOpen} onClose={handleCloseDialog}>
            <DialogTitle
                style={{
                    textAlign: "center",
                    backgroundColor: "rgb(195, 172, 214)",
                }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
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
                            maxWidth: "250px",
                            height: "250px",
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
                            <img
                                src={image}
                                alt={title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
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
                                    ⭐ Łatwy
                                </span>
                            )}
                            {level === "MEDIUM" && (
                                <span>
                                    <span style={{ fontSize: "18px", color: "black" }}>
                                        ⭐⭐ Średni
                                    </span>
                                </span>
                            )}
                            {level === "HARD" && (
                                <span>
                                    <span style={{ fontSize: "18px", color: "black" }}>
                                        ⭐⭐⭐ Trudny
                                    </span>
                                </span>
                            )}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <span style={{ fontSize: "18px", color: "black" }}>
                                👪 Porcje: {portions}
                            </span>
                        </div>
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

                <div style={{ marginTop: "20px" }}>
                    <span style={{ fontSize: "18px", color: "black" }}>
                        👣 Kroki:{" "}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: steps.join("<br>"),
                            }}
                        />

                    </span>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <a href={source} style={{ fontSize: "16px", color: "black", textDecoration: "underline" }}>
                        Źródło
                    </a>
                </div>
            </DialogContent>

        </Dialog>
    );
};

export default ModalPrzepis;
