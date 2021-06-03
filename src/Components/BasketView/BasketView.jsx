import { useEffect, useState } from 'react';
import './BasketView.css';
import remove from '../../Assets/Images/cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/customerBasket';

const Basket = () => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [contentOfBasket, setContentOfBasket] = useState(null);

    const currentBasket = useSelector(state => state.customerBasket.content);

    let priceArray = [];

    const dispatch = useDispatch();

    function goToCheckout() {
        console.log('placeholder log - going to checkout');
        //dispatch to checkout component goes here
    }

    function trashItem(movieToRemove) {
        dispatch(actions.removeItem(movieToRemove));
    }

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 150);
        setTimeout(() => {
            goToCheckout();
        }, 250);
    }

    function calculateTotalPrice(total, num) {
        return total + num;
    }

    //builds the basket out of the value provided from redux and also calculates total price of all wares
    const buildBasket = () => {
        setContentOfBasket(currentBasket.map((item, index) => {            
            priceArray.push(item.price);
            let priceToSet = priceArray.reduce(calculateTotalPrice)
            let roundedPrice = Math.round((priceToSet + Number.EPSILON) * 100) / 100;
            setTotalPrice(roundedPrice);

            if(index % 2 === 0) {
                return (
                    <div className="basket-item-container" key={index}>
                        <div className="basket-item-title">{item.movieTitle}</div>
                        <div className="basket-item-price">${item.price}</div>
                        <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem(index)} />
                    </div>
                )
            } else {
                return (
                    <div className="basket-item-container uneven" key={index}>
                        <div className="basket-item-title">{item.movieTitle}</div>
                        <div className="basket-item-price">${item.price}</div>
                        <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem(index)} />
                    </div>
                )
            }
        }));
    }

    useEffect(() => {
        buildBasket();
        if(currentBasket.length === 0) {
            setTotalPrice(0);
        }
    }, [currentBasket]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="basket-view-component">
            <div className="basket-view-container">
                <div className="basket-header-text">Your basket</div>
                <div className="items-in-basket-container">

                    <div className="movies-in-basket">
                        {contentOfBasket}
                    </div>

                    <div className="basket-summary">
                        <div style={{ marginLeft: '15px' }}>Total:</div>
                        <div style={{ marginRight: '15px' }}>${totalPrice}</div>
                    </div>

                </div>

                <div className={buttonClicked ? "checkout-button clicked" : "checkout-button"} onClick={() => { setButtonClicked(true); animationOnClick() }}>Proceed to checkout</div>
            </div>
        </div>
    )
}

export default Basket;