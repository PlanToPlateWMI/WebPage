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
                sx={{ width: '120px' }}
            />
        </div>
    );
};

export default SkladnikiComponent;
