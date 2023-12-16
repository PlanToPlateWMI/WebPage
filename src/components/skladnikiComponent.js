import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
    useGetAllProductsQuery,
} from "../redux/api/index.js";
import React, { useState } from "react";


const SkladnikiComponent = () => {
    const { data: products } = useGetAllProductsQuery();
    console.log(products);
    const produktyLista = [
        { label: '' },
        ...(products || []).map(category => ({ label: `${category.name} - ${category.unit}` }))
    ];
    
    const [numericValue, setNumericValue] = useState('');

    const handleNumericChange = (event) => {
        const enteredValue = event.target.value;
        const onlyNums = enteredValue.replace(/\D/g, ''); // Keep only numeric characters

        setNumericValue(onlyNums);
    };
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={produktyLista}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Wpisz nazwę produktu" />}
            />
            <TextField
                id="outlined-basic-numbers"
                label="Wpisz ilość"
                variant="outlined"
                value={numericValue}
                onChange={handleNumericChange}
                sx={{ width: '120px' }}
            />
        </div>
    );
};

export default SkladnikiComponent;