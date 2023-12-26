import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SkladnikiComponent = ({ updateIngredients, index, products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductChange = (event, newValue) => {
        setSelectedProduct(newValue);
        if (newValue) {
            updateIngredients({ id: newValue.id, qty: '' }, index);
        } else {
            updateIngredients({ id: '', qty: '' }, index);
        }
    };
    const handleQuantityKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        const inputValue = event.target.value;

        const hasDot = inputValue.includes('.');
        const beforeDot = inputValue.split('.')[0];
        const afterDot = inputValue.split('.')[1];

        const newValue = inputValue + String.fromCharCode(charCode);

        const isValidNumber = (value) => {
            const floatValue = parseFloat(value);
            return !isNaN(floatValue) && floatValue >= 0 && floatValue <= 9999.99;
        };

        if (
            (charCode < 48 || charCode > 57) &&
            (charCode !== 8 && charCode !== 46) ||
            (newValue.length > 1 && newValue.charAt(0) === '0' && newValue.charAt(1) !== '.') ||
            (hasDot && afterDot && afterDot.length >= 2) ||
            !isValidNumber(newValue)
        ) {
            event.preventDefault();
        }
    };

    const handleQuantityChange = (event) => {
        // Update the parent component's state with the new quantity
        if (selectedProduct) {
            updateIngredients({ id: selectedProduct.id, qty: event.target.value }, index);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', paddingBottom: '10px' }}>
            <Autocomplete
                disablePortal
                id={`product-autocomplete-${index}`}
                options={products}
                getOptionLabel={(option) => option.label || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Wybierz produkt" />}
                onChange={handleProductChange}
                value={selectedProduct}
                sx={{ width: 300 }}
            />
            <TextField
                id={`product-quantity-${index}`}
                label="Wpisz ilość"
                variant="outlined"
                onChange={handleQuantityChange}
                onKeyPress={handleQuantityKeyPress}
                sx={{ width: '120px' }}
            />
        </div>
    );
};

export default SkladnikiComponent;
