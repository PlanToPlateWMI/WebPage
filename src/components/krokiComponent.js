import React from "react";
import TextField from '@mui/material/TextField';

const KrokiComponent = ({ updateSteps, index }) => {
    const handleStepChange = (event) => {
        updateSteps(event.target.value, index);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', paddingBottom: '10px' }}>
            <TextField
                id={`step-${index}`}
                label="Wpisz krok"
                multiline
                maxRows={4}
                style={{ width: '500px' }}
                onChange={handleStepChange}
            />
        </div>
    );
};

export default KrokiComponent;
