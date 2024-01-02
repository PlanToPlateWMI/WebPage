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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { openModalAddDialog } from "../redux/slices/authSlice.js";

const Header = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate("/login");
    };
    const handleNavigateToLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload(); 
    };

    const handleNavigateToAboutUs = () => {
        navigate("/about");
    };

    const handleNavigateToRecepies = () => {
        navigate("/");
    };
    const dispatch = useAppDispatch();
    const handleOpenAddDialog = () => {
        dispatch(openModalAddDialog(true));
    };

    const { token, role } = useAppSelector((state) => state.authSlice);
    return (
        <AppBar position="fixed" style={{ backgroundColor: "#AA95BB", marginBottom: 20, }}>
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

                {token !== "" && role === "ROLE_ADMIN" ? (
                    <Button
                        variant="text"
                        disableElevation
                        style={{ backgroundColor: "#C3ACD6", color: "white", marginLeft: "20px" }}
                        onClick={handleOpenAddDialog}>
                        Dodaj własny przepis
                    </Button>
                ) : (
                    null
                )}
                <div style={{ flex: 1, marginLeft: '10px' }}></div>
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
                        onClick={() => handleNavigateToLogout()}>
                        Wyloguj się
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
