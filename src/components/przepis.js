import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from "../app/hooks.js";

const Przepis = ({ image, title }) => {

    // const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.authSlice);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: "56.25%",
                    }}
                    image={image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Zobacz przepis</Button>
                    {token !== "" ? <Button size="small">Dodaj do ulubionych</Button> : null}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Przepis;
