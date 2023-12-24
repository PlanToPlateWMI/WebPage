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

const ModalAddPrzepis = () => {
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

    // Format products data for Autocomplete
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
        setIsVegeValue(newValue); // Update the state based on checkbox status
    };

    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    // Function to update steps
    const updateSteps = (step, index) => {
        let newSteps = [...steps];
        newSteps[index] = step;
        setSteps(newSteps);
    };

    // Function to update ingredients
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
                    Dodawanie własnego przepisu
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
                    <div style={{ display: "flex", gap: "16px" }}>
                        <TextField
                            id="outlined-basic"
                            label="Wpisz nazwę"
                            variant="outlined"
                            style={{ width: 500 }}
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
                            paddingTop: "15px",
                        }}>
                        <TextField
                            id="outlined-basic-numbers"
                            label="Wpisz czas w minutach"
                            variant="outlined"
                            value={numericValue}
                            onChange={handleNumericChange}
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
                                    paddingLeft: "65px",
                                    "& .MuiSvgIcon-root": {
                                        color: "#a0db5c",
                                    },
                                }}
                            />
                        </FormGroup>
                    </div>
                    <Grid container spacing={4}>
                        {/* Контейнер для компонентов "Kroki" */}
                        <Grid item xs={6}>
                            {/* Содержимое первого контейнера "Kroki" */}
                            <Grid container spacing={1}>
                                <Typography
                                    variant="h6"
                                    style={{
                                        paddingTop: "25px",
                                        paddingBottom: "15px",
                                        paddingRight: "15px",
                                    }}>
                                    Dodaj kroki
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
                                        onClick={handleAddKroki}>
                                        <AddIcon />
                                    </Fab>
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
                                            marginLeft: "25px",
                                        }}
                                        onClick={handleRemoveKroki}>
                                        <RemoveIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                            {/* Рендеринг компонентов Kroki */}
                            {[...Array(krokiCount)].map((_, index) => (
                                <Grid item key={index}>
                                    <KrokiComponent
                                        updateSteps={updateSteps}
                                        index={index}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Контейнер для компонентов "Skladniki" */}
                        <Grid item xs={6}>
                            {/* Содержимое второго контейнера "Skladniki" */}
                            <Grid container spacing={1}>
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
                                            marginLeft: "25px",
                                        }}
                                        onClick={handleRemoveSkladniki}>
                                        <RemoveIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                            {/* Рендеринг компонентов Skladniki */}
                            {[...Array(skladnikiCount)].map((_, index) => (
                                <Grid item key={index}>
                                    <SkladnikiComponent
                                        updateIngredients={updateIngredients}
                                        index={index}
                                        products={products}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </div>

                <div
                    style={{
                        position: "fixed",
                        bottom: "5%",
                        right: "45px",
                        zIndex: "999",
                    }}>
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
