import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSigninMutation } from "../redux/api/index.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Logo from "../images/Logo2.jpg";

const defaultTheme = createTheme();

export function LoginPage() {
    const [signIn] = useSigninMutation();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (error) {
            const timeoutId = setTimeout(() => {
                setError(null);
            }, 1500);

            return () => clearTimeout(timeoutId);
        }
    }, [error]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        const scrypt = require("scrypt-async");

        var key;
        scrypt(
            password,
            email,
            {
                N: 16, // CPU/memory cost factor
                r: 16, // Block size
                p: 16, // Parallelization factor
                dkLen: 128, // Desired key length in bytes
                encoding: "base64",
            },
            function (derivedKey) {
                key = derivedKey;
            }
        );

        let signInData = JSON.stringify({
            email: email,
            password: key,
        });

        try {
            const response = await signIn(signInData);
            if (response.data.token) {
                const token = response.data.token;
                const role = response.data.role;
                console.log(token);
                console.log(role);
                navigate("/");
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setError("Niepoprawne dane do logowania!");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    component={Logo}
                    sx={{
                        backgroundImage: Logo,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Logowanie
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#AA95BB",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#AA95BB",
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleShowPassword} edge="end">
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#AA95BB",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#AA95BB",
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                    backgroundColor: "#AA95BB",
                                    color: "white",
                                }}
                                sx={{ mt: 3, mb: 2 }}>
                                Zaloguj się
                            </Button>
                        </Box>
                        <Box>
                            <div>
                                {error && (
                                    <Stack sx={{ width: "100%" }} spacing={2}>
                                        <Alert severity="error">
                                            <AlertTitle>
                                                Błąd logowania
                                            </AlertTitle>
                                            {error}
                                        </Alert>
                                    </Stack>
                                )}
                            </div>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
