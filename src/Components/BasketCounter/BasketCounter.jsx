import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './BasketCounter.css';

const BasketCounter = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket, setItemsInBasket] = useState(1);
    const basketActivity = useSelector(state => state.customerBasket.content);

    useEffect(() => {
        setItemsInBasket(basketActivity.length);
    }, [basketActivity]);

    return (
        basketActivity.length > 0 ? (
            <div className="basketCounter">
                {itemsInBasket}
            </div>
        ) : (null)
    )
}

export default BasketCounter;