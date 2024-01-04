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

import React from "react";
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";

const KrokiComponent = ({ updateSteps, index, handleRemoveKroki, krokiCount, step }) => {
    const handleStepChange = (event) => {
        updateSteps(event.target.value, index);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div style={{ display: 'flex', gap: '20px', paddingBottom: '20px' }}>
            <Grid item>
                <TextField
                    id={`step-${index}`}
                    label="Wpisz krok"
                    multiline
                    maxRows={4}
                    value={step}
                    style={{
                        width: isSmallScreen ? '270px' : '290px',
                        maxWidth: '100%',
                    }}
                    onChange={handleStepChange}
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
                            krokiCount < 2
                                ? "hidden"
                                : "visible",
                    }}
                    onClick={() => handleRemoveKroki(index)}>
                    <RemoveIcon />
                </Fab>
            </Grid>
        </div>
    );
};

export default KrokiComponent;