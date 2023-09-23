import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Card() {
    const [card1, setCard1] = useState(null);
    const [card2, setCard2] = useState(null);

    const fetchHand = () => {
        axios("http://localhost:10000/api/hand")
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
                <p>
                    Card 1: {card1.card} of {card1.suit}
                </p>
            )}
            {card2 && (
                <p>
                    Card 2: {card2.card} of {card2.suit}
                </p>
            )}
        </div>
    );
}
