import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { closeDialogs } from "../redux/slices/authSlice.js";
import Autocomplete from '@mui/material/Autocomplete';
import {
    useGetCategoriesQuery, useGetAllProductsQuery,
} from "../redux/api/index.js";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SkladnikiComponent from "./skladnikiComponent.js";
import KrokiComponent from "./krokiComponent.js";
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";
import RemoveIcon from '@mui/icons-material/Remove';

const ModalAddPrzepis = () => {
    const { isModalAddPrzepisOpen } = useAppSelector(
        (state) => state.authSlice
    );
    const dispatch = useAppDispatch();

    const handleCloseDialog = () => {
        dispatch(closeDialogs(false));
    };

    const poziomyTrudnosci = [
        { label: 'Łatwe' },
        { label: 'Średnie' },
        { label: 'Ciężkie' },
    ];
    const liczbaPorcji = [
        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '4' },
        { label: '5' },
        { label: '6' },
        { label: '7' },
        { label: '8' },
        { label: '9' },
        { label: '10' },
    ];
    const { data: categories } = useGetCategoriesQuery();

    const kategorieLista = [
        { label: '' },
        ...(categories || []).map(category => ({ label: category.name }))
    ];

    const [numericValue, setNumericValue] = useState('');

    const handleNumericChange = (event) => {
        const enteredValue = event.target.value;
        const onlyNums = enteredValue.replace(/\D/g, '');

        setNumericValue(onlyNums);
    };

    const [skladnikiCount, setSkladnikiCount] = useState(1);
    const handleAddSkladniki = () => {
        setSkladnikiCount(prevCount => prevCount + 1);
    };
    const handleRemoveSkladniki = () => {
        if (skladnikiCount > 1) {
            setSkladnikiCount(prevCount => prevCount - 1);
        }
    };

    const [krokiCount, setKrokiCount] = useState(1);
    const handleAddKroki = () => {
        setKrokiCount(prevCount => prevCount + 1);
    };
    const handleRemoveKroki = () => {
        if (krokiCount > 1) {
            setKrokiCount(prevCount => prevCount - 1);
        }
    };

    return (
        <Dialog fullScreen open={isModalAddPrzepisOpen} onClose={handleCloseDialog}>
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
            <DialogContent style={{ textAlign: "left", paddingTop: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Wpisz nazwę"
                            variant="outlined"
                            style={{ width: 500 }}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo-poziomy"
                            options={poziomyTrudnosci}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Wybierz poziom trudności" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo-kategorie"
                            options={kategorieLista}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Wybierz kategorię" />}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', paddingTop: '15px' }}>
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
                            renderInput={(params) => <TextField {...params} label="Wybierz liczbę porcji" />}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Ten przepis jest wegański"
                                sx={{
                                    paddingTop: '5px',
                                    paddingLeft: '65px',
                                    '& .MuiSvgIcon-root': {
                                        color: '#a0db5c' 
                                    }
                                }}
                            />
                        </FormGroup>
                    </div>
                    <Grid container spacing={4}>
                        {/* Контейнер для компонентов "Kroki" */}
                        <Grid item xs={6}>
                            {/* Содержимое первого контейнера "Kroki" */}
                            <Grid container spacing={1}>
                                <Typography variant="h6" style={{ paddingTop: '25px', paddingBottom: '15px', paddingRight: '15px' }}>
                                    Dodaj kroki
                                </Typography>
                                <Grid item style={{ paddingTop: '20px' }}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{
                                            backgroundColor: "#a0db5c",
                                            width: "35px",
                                            height: "25px",
                                        }}
                                        onClick={handleAddKroki}
                                    >
                                        <AddIcon />
                                    </Fab>
                                    <Fab
                                        color="secondary"
                                        aria-label="remove"
                                        style={{
                                            backgroundColor: "#d11f1f",
                                            width: "35px",
                                            height: "25px",
                                            visibility: krokiCount <= 1 ? 'hidden' : 'visible',
                                            marginLeft: '25px',
                                        }}
                                        onClick={handleRemoveKroki}
                                    >
                                        <RemoveIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                            {/* Рендеринг компонентов Kroki */}
                            {[...Array(krokiCount)].map((_, index) => (
                                <Grid item key={index}>
                                    <KrokiComponent />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Контейнер для компонентов "Skladniki" */}
                        <Grid item xs={6}>
                            {/* Содержимое второго контейнера "Skladniki" */}
                            <Grid container spacing={1}>
                                <Typography variant="h6" style={{ paddingTop: '25px', paddingBottom: '15px', paddingRight: '15px' }}>
                                    Dodaj składniki
                                </Typography>
                                <Grid item style={{ paddingTop: '20px' }}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{
                                            backgroundColor: "#a0db5c",
                                            width: "35px",
                                            height: "25px",
                                        }}
                                        onClick={handleAddSkladniki}
                                    >
                                        <AddIcon />
                                    </Fab>
                                    <Fab
                                        color="secondary"
                                        aria-label="remove"
                                        style={{
                                            backgroundColor: "#d11f1f",
                                            width: "35px",
                                            height: "25px",
                                            visibility: skladnikiCount <= 1 ? 'hidden' : 'visible',
                                            marginLeft: '25px',
                                        }}
                                        onClick={handleRemoveSkladniki}
                                    >
                                        <RemoveIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                            {/* Рендеринг компонентов Skladniki */}
                            {[...Array(skladnikiCount)].map((_, index) => (
                                <Grid item key={index}>
                                    <SkladnikiComponent />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </div>

                <div style={{ position: 'fixed', bottom: '5%', right: '45px', zIndex: '999' }}>
                    <Button
                        variant="text"
                        disableElevation
                        style={{ backgroundColor: "#C3ACD6", color: "white" }}
                    >
                        Dodaj przepis
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ModalAddPrzepis;
