import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
    useGetAllProductsQuery,
} from "../redux/api/index.js";
import React, { useState } from "react";


const KrokiComponent = () => {
    const { data: products } = useGetAllProductsQuery();
    const produktyLista = [
        { label: '' },
        ...(products || []).map(category => ({ label: `${category.name} - ${category.unit}` }))
    ];

    return (
        <div style={{ display: 'flex', gap: '20px', paddingBottom: '10px' }}>
            <TextField
                id="outlined-multiline-flexible"
                label="Wpisz krok"
                multiline
                maxRows={4}
                style={{ width: '500px' }}
            />
        </div>
    );
};

export default KrokiComponent;