import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";

const Header = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate("/login");
    };

    const handleNavigateToAboutUs = () => {
        navigate("/about");
    };

    const handleNavigateToRecepies = () => {
        navigate("/");
    };

    // const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.authSlice);

    return (
        <AppBar position="relative" style={{ backgroundColor: "#AA95BB", marginBottom: 20, }}>
            <Toolbar>
                <Button
                    variant="text"
                    disableElevation
                    style={{
                        backgroundColor: "#C3ACD6",
                        color: "white",
                        marginRight: 20,
                    }}
                    onClick={() => handleNavigateToAboutUs()}>
                    O nas
                </Button>
                <Button
                    variant="text"
                    disableElevation
                    style={{ backgroundColor: "#C3ACD6", color: "white" }}
                    onClick={() => handleNavigateToRecepies()}>
                    Zobacz przepisy
                </Button>
                <div style={{ flex: 1 }}></div>
                {token === "" ? (
                    <Button
                        variant="text"
                        disableElevation
                        style={{ backgroundColor: "#C3ACD6", color: "white" }}
                        onClick={() => handleNavigateToLogin()}>
                        Zaloguj się
                    </Button>
                ) : (
                    <Button
                        variant="text"
                        disableElevation
                        style={{ backgroundColor: "#C3ACD6", color: "white" }}
                        onClick={() => handleNavigateToLogin()}>
                        Wyloguj się
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
