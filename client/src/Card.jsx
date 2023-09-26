import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    Grid,
    Container,
    CssBaseline,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: 'url("/poker.jpg")',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
});

export default function Card() {
    const [card1, setCard1] = useState(null);
    const [card2, setCard2] = useState(null);

    const apiBaseUrl =
        process.env.NODE_ENV === "production"
            ? "https://cards-ilnp.onrender.com"
            : "http://localhost:9000";

    const fetchHand = () => {
        axios(`${apiBaseUrl}/api/hand`)
            .then((response) => {
                setCard1(response.data.cards[0]);
                setCard2(response.data.cards[1]);
            })
            .catch((error) => {
                console.error("Error fetching hand:", error);
            });
    };

    return (
        <StyledContainer>
            <CssBaseline />
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h1" gutterBottom>
                        Card Drawer
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchHand}
                    >
                        Draw Hand
                    </Button>
                </Grid>

                {card1 && (
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                            Card 1:
                        </Typography>
                        <img
                            src={`/cards/${card1.card}${card1.suit[0]}.svg`}
                            alt={`Card ${card1.card} of ${card1.suit}`}
                        />
                    </Grid>
                )}

                {card2 && (
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                            Card 2:
                        </Typography>
                        <img
                            src={`/cards/${card2.card}${card2.suit[0]}.svg`}
                            alt={`Card ${card2.card} of ${card2.suit}`}
                        />
                    </Grid>
                )}
            </Grid>
        </StyledContainer>
    );
}
