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
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";

const SkladnikiComponent = ({
    updateIngredients,
    index,
    products,
    handleRemoveSkladniki,
    skladnikiCount,
    selectedIngredients,
    ingredient
}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        // This effect will update the selected product when the ingredient changes
        const product = products.find(p => p.id === ingredient.id);
        setSelectedProduct(product || null);
    }, [ingredient, products]);

    const handleProductChange = (event, newValue) => {
        setSelectedProduct(newValue);
        if (newValue) {
            updateIngredients({ id: newValue.id, qty: ingredient.qty }, index);
        } else {
            updateIngredients({ id: "", qty: "" }, index);
        }
    };

    const handleQuantityChange = (event) => {
        if (selectedProduct) {
            updateIngredients(
                { id: selectedProduct.id, qty: event.target.value },
                index
            );
        }
    };

    const handleQuantityKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        const inputValue = event.target.value;

        const hasDot = inputValue.includes(".");
        const afterDot = inputValue.split(".")[1];
        const newValue = inputValue + String.fromCharCode(charCode);

        const isValidNumber = (value) => {
            const floatValue = parseFloat(value);
            return (
                !isNaN(floatValue) && floatValue >= 0 && floatValue <= 9999.99
            );
        };

        if (
            ((charCode < 48 || charCode > 57) &&
                charCode !== 8 &&
                charCode !== 46) ||
            (newValue.length > 1 &&
                newValue.charAt(0) === "0" &&
                newValue.charAt(1) !== ".") ||
            (hasDot && afterDot && afterDot.length >= 2) ||
            !isValidNumber(newValue)
        ) {
            event.preventDefault();
        }
    };

    return (
        <>
            <Grid item key={index}>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        paddingBottom: "10px",
                    }}>
                    <Autocomplete
                        disablePortal
                        id={`product-autocomplete-${index}`}
                        options={products.filter(
                            (product) =>
                                !selectedIngredients.has(product.id) ||
                                product.id === selectedProduct?.id
                        )}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Wybierz produkt" />
                        )}
                        onChange={handleProductChange}
                        value={selectedProduct}
                        sx={{ width: isSmallScreen ? "200px" : "300px" }}
                    />
                    <TextField
                        id={`product-quantity-${index}`}
                        label="Ilość"
                        variant="outlined"
                        onChange={handleQuantityChange}
                        value={ingredient.qty}
                        onKeyPress={handleQuantityKeyPress}
                        sx={{ width: isSmallScreen ? "80px" : "120px" }}
                    />
                    
                    <Fab
                        color="secondary"
                        aria-label="remove"
                        style={{
                            backgroundColor: "#d11f1f",
                            width: "35px",
                            height: "25px",
                            visibility: skladnikiCount <= 1 ? "hidden" : "visible",
                        }}
                        onClick={handleRemoveSkladniki}>
                        <RemoveIcon />
                    </Fab>

                </div>
                
            </Grid>
            
        </>
    );
};

export default SkladnikiComponent;
