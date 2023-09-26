import React, { useState } from "react";
import axios from "axios";

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
        <div>
            <button onClick={fetchHand}>Draw Hand</button>
            {card1 && (
                <div>
                    <p>Card 1:</p>
                    <img
                        src={`/cards/${card1.card}${card1.suit[0]}.svg`}
                        alt=""
                    />
                </div>
            )}
            {card2 && (
                <div>
                    <p>Card 2:</p>
                    <img
                        src={`/cards/${card2.card}${card2.suit[0]}.svg`}
                        alt=""
                    />
                </div>
            )}
        </div>
    );
}
