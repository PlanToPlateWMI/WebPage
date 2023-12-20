import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SkladnikiComponent = ({ updateIngredients, index, products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // When a product is selected or the input is changed
    const handleProductChange = (event, newValue) => {
        // Set the selected product
        setSelectedProduct(newValue);

        // Update the parent component's state
        if (newValue) {
            updateIngredients({ id: newValue.id, qty: '' }, index);
        } else {
            updateIngredients({ id: '', qty: '' }, index);
        }
    };

    // When the quantity is changed
    const handleQuantityChange = (event) => {
        let enteredValue = event.target.value;
      
        // Оставляем только цифры, точку и запятую
        enteredValue = enteredValue.replace(/[^\d.,]/g, '');
      
        // Убираем лишние точки и запятые
        const commaCount = enteredValue.split(',').length - 1;
        const dotCount = enteredValue.split('.').length - 1;
        
        if (commaCount > 1 || dotCount > 1) {
          const parts = enteredValue.split(/[,.]/);
          enteredValue = parts[0] + '.' + parts.slice(1).join('');
        }
      
        // Обновляем состояние родительского компонента с новым значением quantity
        if (selectedProduct) {
          updateIngredients({ id: selectedProduct.id, qty: enteredValue }, index);
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
