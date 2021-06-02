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
        console.log('going to checkout');
        //dispatch to checkout component goes here
    }

    function trashItem(id) {
        console.log('currentBasket: ', currentBasket);
        console.log('throwing away...', id);
        dispatch(actions.removeItem(id));
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

    const buildBasket = () => {
        
        setContentOfBasket(currentBasket.map((item, index) => {            
            priceArray.push(item.price);
            setTotalPrice(priceArray.reduce(calculateTotalPrice));

            return (
                <div className="basket-item-container" key={index}>
                    <div className="basket-item-title">{item.movieTitle}</div>
                    <div className="basket-item-price">${item.price}</div>
                    <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem(index)} />
                </div>
            )
        }))
    }

    useEffect(() => {
        buildBasket();
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
                        <div style={{ marginLeft: '5px' }}>Total:</div>
                        <div style={{ marginRight: '5px' }}>${totalPrice}</div>
                    </div>

                </div>

                <div className={buttonClicked ? "checkout-button-clicked" : "checkout-button"} onClick={() => { setButtonClicked(true); animationOnClick() }}>Proceed to checkout</div>
            </div>
        </div>
    )
}

export default Basket;