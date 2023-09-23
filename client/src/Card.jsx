import React, { useState } from "react";
import axios from "axios";
import { PokerCard } from "react-playing-cards";

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
                <PokerCard
                    back={!card1}
                    front={
                        card1 &&
                        `${card1.card}${card1.suit.charAt(0).toUpperCase()}`
                    }
                />
            )}
            {card2 && (
                <PokerCard
                    back={!card2}
                    front={
                        card2 &&
                        `${card2.card}${card2.suit.charAt(0).toUpperCase()}`
                    }
                />
            )}
        </div>
    );
}
