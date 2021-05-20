import React, { useState } from 'react';
import './BasketCounter.css';

const BasketCounter = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket] = useState(1);

    const style={
        counter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 50,
            border: "1px solid black",
            position: "absolute",
            bottom: 5,
            right: 10,
            color: "white",
            fontWeight: "bold",
            background: "#548F25"
        }
    }

    return (
        // <div style={style.counter}>
        <div className="basketCounter">
            {itemsInBasket}
        </div>
    )
}

export default BasketCounter;