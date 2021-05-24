import React, { useState } from 'react';
import './BasketCounter.css';

const BasketCounter = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket] = useState(1);

    return (
        <div className="basketCounter">
            {itemsInBasket}
        </div>
    )
}

export default BasketCounter;