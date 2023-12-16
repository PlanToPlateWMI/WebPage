import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { closeDialogs } from "../redux/slices/authSlice.js";

const ModalAddPrzepis = () => {
    const { isModalAddPrzepisOpen } = useAppSelector(
        (state) => state.authSlice
    );
    const dispatch = useAppDispatch();

    const handleCloseDialog = () => {
        dispatch(closeDialogs(false));
    };

    return (
        <Dialog fullScreen open={isModalAddPrzepisOpen} onClose={handleCloseDialog}>
            <DialogTitle
                style={{
                    textAlign: "center",
                    backgroundColor: "rgb(195, 172, 214)",
                }}>

                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    Тест
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
            <DialogContent style={{ textAlign: "left" }}>

            </DialogContent>

        </Dialog>
    );
};

export default ModalAddPrzepis;
