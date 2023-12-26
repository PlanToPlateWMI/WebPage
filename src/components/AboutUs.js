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

import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Header from "./header";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Baza from "../images/baz.jpg";
import Lista from "../images/lis.jpg";
import Przepisy from "../images/prz.jpg";
import Spizarnia from "../images/spiz.jpg";
import QR from "../images/qr.jpg";

const defaultTheme = createTheme();

export function AboutUs() {

    const handleMailTo = () => {
        const subject = encodeURIComponent('Usunięcie konta'); // Temat wiadomości
        const email = 'plantoplatemobileapp@gmail.com'; // Adres e-mail odbiorcy
        window.location.href = `mailto:${email}?subject=${subject}`;
    };

    const buttonStyle = {
        backgroundColor: '#C3ACD6',
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto', // Центрирует по горизонтали

    };

    const divStyle = {
        background: "rgba(195, 172, 214, 0.7)",
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        margin: '8px',
    };

    const imageStyle = {
        width: '200px',
        height: '350px',
        margin: '35px',
        display: 'inline-block',
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header />
            <div style={{ ...divStyle, paddingTop: '80px' }}>
                PlanToPlate to niezbędne narzędzie dla każdego pragnącego w pełni kontrolować swoje codzienne nawyki żywieniowe. Nasza aplikacja mobilna i strona internetowa to klucz do łatwego planowania jadłospisów, precyzyjnego zarządzania zakupami oraz odkrywania nowych, kulinarnych inspiracji osobom indywidualnym i grupom.    <br />
                Z PlanToPlate zdobędziesz kontrolę nad swoją dietą, odkryjesz kulinarne horyzonty i zaoszczędzisz cenny czas, który dotąd poświęcałeś na codzienny stres związany z posiłkami. Zobacz możliwości naszej aplikacji mobilnej!
            </div>
            <div style={{ textAlign: 'center' }}>
                <img src={Baza} alt="Baza" style={imageStyle} />
                <img src={Lista} alt="Lista" style={imageStyle} />
                <img src={Przepisy} alt="Przepisy" style={imageStyle} />
                <img src={Spizarnia} alt="Spizarnia" style={imageStyle} />
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Dołącz do naszej społeczności i odkryj, jak łatwo może być cieszyć się smakiem zdrowego życia!
            </div>

            <div style={{ textAlign: 'center' }}>
                <img src={QR} alt="QR code" style={{
                    width: '175px',
                    height: '175px',
                    display: 'inline-block',
                }} />
                <h4>Pobierz aplikację mobilną w <a href="  https://play.google.com/store/apps/details?id=pl.plantoplate&pcampaignid=web_share" target="_blank">Google Play</a></h4>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                marginRight: '10px',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <p style={{ marginBottom: '5px' }}>Jeżeli chcesz usunąć konto:</p>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={buttonStyle}
                    onClick={handleMailTo}
                >
                    Napisz do nas
                </Button>
            </div>
        </ThemeProvider>
    );
}