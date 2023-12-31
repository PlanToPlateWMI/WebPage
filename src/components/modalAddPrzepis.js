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

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { closeDialogs } from "../redux/slices/authSlice.js";
import Autocomplete from "@mui/material/Autocomplete";
import {
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useCreateRecipeMutation,
    useGetAllQuery,
} from "../redux/api/index.js";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SkladnikiComponent from "./skladnikiComponent.js";
import KrokiComponent from "./krokiComponent.js";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ModalAddPrzepis = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { refetch } = useGetAllQuery();

    const { isModalAddPrzepisOpen } = useAppSelector(
        (state) => state.authSlice
    );
    const dispatch = useAppDispatch();

    const [createRecipe] = useCreateRecipeMutation();

    const handleCloseDialog = () => {
        dispatch(closeDialogs(false));
    };

    const { data: productsData } = useGetAllProductsQuery();

    const products = productsData
        ? productsData.map((product) => ({
            label: `${product.name} - ${product.unit}`,
            id: product.id,
        }))
        : [];

    const poziomyTrudnosci = [
        { label: "Łatwy" },
        { label: "Średni" },
        { label: "Trudny" },
    ];
    const liczbaPorcji = [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "10" },
    ];
    const { data: categories } = useGetCategoriesQuery();

    const kategorieLista = [
        { label: "" },
        ...(categories || []).map((category) => ({
            id: category.id,
            label: category.name,
        })),
    ];

    const [numericValue, setNumericValue] = useState("");
    const [timeValue, setTimeValue] = useState("");

    const handleNumericChange = (event) => {
        let enteredValue = event.target.value;
        let onlyNums = enteredValue.replace(/\D/g, "");

        if (onlyNums.length > 3) {
            onlyNums = onlyNums.substring(0, 3);
        }

        setNumericValue(onlyNums);
        setTimeValue(onlyNums);
    };

    const [skladnikiCount, setSkladnikiCount] = useState(1);
    const handleAddSkladniki = () => {
        setSkladnikiCount((prevCount) => prevCount + 1);
    };
    const handleRemoveSkladniki = () => {
        if (skladnikiCount > 1) {
            setSkladnikiCount((prevCount) => prevCount - 1);
        }
    };

    const [krokiCount, setKrokiCount] = useState(1);
    const handleAddKroki = () => {
        setKrokiCount((prevCount) => prevCount + 1);
    };
    const handleRemoveKroki = () => {
        if (krokiCount > 1) {
            setKrokiCount((prevCount) => prevCount - 1);
        }
    };
    const [titleValue, setTitleValue] = useState("");
    const [levelValue, setLevelValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [portionsValue, setPortionsValue] = useState("");
    const [isVegeValue, setIsVegeValue] = useState(false);

    const handleTitleChange = (event) => {
        const newValue = event.target.value;
        setTitleValue(newValue);
    };
    const handleLevelChange = (event, newValue) => {
        let englishValue = "";

        if (newValue) {
            switch (newValue.label) {
                case "Łatwy":
                    englishValue = "EASY";
                    break;
                case "Średni":
                    englishValue = "MEDIUM";
                    break;
                case "Trudny":
                    englishValue = "HARD";
                    break;
            }
        }
        setLevelValue(englishValue);
    };

    const handleCategoryChange = (event, newValue) => {
        setCategoryValue(newValue.id);
    };

    const handlePortionsChange = (event, newValue) => {
        setPortionsValue(newValue.label);
    };

    const handleCheckboxChange = (event) => {
        const newValue = event.target.checked;
        setIsVegeValue(newValue);
    };

    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const updateSteps = (step, index) => {
        let newSteps = [...steps];
        newSteps[index] = step;
        setSteps(newSteps);
    };

    const updateIngredients = (ingredient, index) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = ingredient;
        setIngredients(newIngredients);

        console.log(newIngredients);
    };

    const handleDodajPrzepis = async () => {
        const recipeData = {
            title: titleValue,
            level: levelValue,
            time: parseInt(timeValue),
            steps: steps.join("&"),
            portions: parseInt(portionsValue),
            isVege: isVegeValue,
            category: parseInt(categoryValue),
            ingredients: ingredients.map((ing) => ({
                id: parseInt(ing.id, 10),
                qty: parseFloat(ing.qty),
            })),
        };

        try {
            const result = await createRecipe(recipeData).unwrap();
            refetch();
            console.log("Recipe submitted successfully", result);

            setTitleValue("");
            setLevelValue("");
            setCategoryValue("");
            setPortionsValue("");
            setTimeValue("");
            setIsVegeValue(false);
            setSteps([]);
            setIngredients([]);
            setNumericValue("");
            setSkladnikiCount(1);
            setKrokiCount(1);
        } catch (error) {
            console.error("Error submitting recipe", error);
        }
    };

    const isFormIncomplete = !titleValue || !levelValue || !categoryValue || !numericValue || !portionsValue;


    return (
        <Dialog
            fullScreen
            open={isModalAddPrzepisOpen}
            onClose={handleCloseDialog}>
            <DialogTitle
                style={{
                    textAlign: "center",
                    backgroundColor: "rgb(195, 172, 214)",
                }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    Dodanie własnego przepisu
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
            <DialogContent style={{ textAlign: "left", paddingTop: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        gap: "16px"
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="Wpisz nazwę"
                            variant="outlined"
                            style={{ width: 300 }}
                            value={titleValue}
                            onChange={handleTitleChange}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo-poziomy"
                            options={poziomyTrudnosci}
                            sx={{ width: 300 }}
                            value={levelValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Wybierz poziom trudności"
                                    value={levelValue}
                                />
                            )}
                            onChange={handleLevelChange}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo-kategorie"
                            options={kategorieLista}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Wybierz kategorię"
                                />
                            )}
                            onChange={handleCategoryChange}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            flexDirection: isSmallScreen ? "column" : "row",
                            paddingTop: "15px",
                        }}>
                        <TextField
                            id="outlined-basic-numbers"
                            label="Wpisz czas w minutach"
                            variant="outlined"
                            value={numericValue}
                            onChange={handleNumericChange}
                            style={{
                                width: 300
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo-poziomy"
                            options={liczbaPorcji}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Wybierz liczbę porcji"
                                />
                            )}
                            onChange={handlePortionsChange}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isVegeValue}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Ten przepis jest wegański"
                                sx={{
                                    paddingTop: "5px",
                                    paddingLeft: isSmallScreen ? "0" : "65px",
                                    textAlign: isSmallScreen ? "left" : "initial",
                                    "& .MuiSvgIcon-root": {
                                        color: "#a0db5c",
                                    },
                                }}
                            />
                        </FormGroup>
                    </div>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1} direction="row" alignItems="center">
                                <Typography
                                    variant="h6"
                                    style={{
                                        paddingTop: "25px",
                                        paddingBottom: "15px",
                                        paddingRight: "15px",
                                    }}>
                                    Dodaj kroki
                                </Typography>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    style={{
                                        backgroundColor: "#a0db5c",
                                        width: "35px",
                                        height: "25px",
                                    }}
                                    onClick={handleAddKroki}>
                                    <AddIcon />
                                </Fab>
                            </Grid>

                            {[...Array(krokiCount)].map((_, index) => (
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item key={index}>
                                        <KrokiComponent
                                            updateSteps={updateSteps}
                                            index={index}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Fab
                                            color="secondary"
                                            aria-label="remove"
                                            style={{
                                                backgroundColor: "#d11f1f",
                                                width: "35px",
                                                height: "25px",
                                                visibility:
                                                    krokiCount <= 1
                                                        ? "hidden"
                                                        : "visible",
                                            }}
                                            onClick={handleRemoveKroki}>
                                            <RemoveIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1} >
                                <Typography
                                    variant="h6"
                                    style={{
                                        paddingTop: "25px",
                                        paddingBottom: "15px",
                                        paddingRight: "15px",
                                    }}>
                                    Dodaj składniki
                                </Typography>
                                <Grid item style={{ paddingTop: "20px" }}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{
                                            backgroundColor: "#a0db5c",
                                            width: "35px",
                                            height: "25px",
                                        }}
                                        onClick={handleAddSkladniki}>
                                        <AddIcon />
                                    </Fab>

                                </Grid>
                            </Grid>

                            {[...Array(skladnikiCount)].map((_, index) => (
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item key={index}>
                                        <SkladnikiComponent
                                            updateIngredients={updateIngredients}
                                            index={index}
                                            products={products}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Fab
                                            color="secondary"
                                            aria-label="remove"
                                            style={{
                                                backgroundColor: "#d11f1f",
                                                width: "35px",
                                                height: "25px",
                                                visibility:
                                                    skladnikiCount <= 1
                                                        ? "hidden"
                                                        : "visible",
                                            }}
                                            onClick={handleRemoveSkladniki}>
                                            <RemoveIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </div>

                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        marginTop: 'auto',
                        textAlign: 'right',
                    }}
                >
                    <Button
                        variant="text"
                        disableElevation
                        style={{
                            backgroundColor: isFormIncomplete ? "#CCC" : "#C3ACD6",
                            color: isFormIncomplete ? "#999" : "white"
                        }}
                        onClick={handleDodajPrzepis}
                        disabled={isFormIncomplete}
                    >
                        Dodaj przepis
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalAddPrzepis;
