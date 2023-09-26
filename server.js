const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9000;

app.use(express.json());

const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? "https://cards-ilnp.onrender.com"
            : "http://localhost:3000",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

app.get("/api/hand", (req, res) => {
    const hand = [];

    for (let i = 0; i < 2; i++) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];

        hand.push({ card, suit });
    }
    res.json({ cards: hand });
});

app.use(express.static("./client/build"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
