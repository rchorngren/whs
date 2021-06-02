import { useEffect, useState } from 'react';
import './BasketView.css';
import remove from '../../Assets/Images/cross.svg';

const Basket = () => {

    const [buttonClicked, setButtonClicked] = useState(false);

    function goToCheckout() {
        console.log('going to checkout');
        //dispatch to checkout component goes here
    }

    function trashItem() {
        console.log('throwing away...');
    }

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 100);
        setTimeout(() => {
            goToCheckout();
        }, 250);
    }

    return (
        <div className="basket-view-component">
            <div className="basket-view-container">
                <div className="basket-header-text">Your basket</div>
                <div className="items-in-basket-container">
                    {/* items in basket goes here */}

                    <div className="movies-in-basket">

                        <div className="basket-item-container">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} onClick={() => trashItem()} />
                        </div>

                        <div className="basket-item-container even">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} onClick={() => trashItem()} />
                        </div>

                        <div className="basket-item-container">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} onClick={() => trashItem()} />

                        </div>

                        <div className="basket-item-container even">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} onClick={() => trashItem()} />

                        </div>

                        {/* end of items */}

                    </div>

                    <div className="basket-summary">
                        <div style={{ marginLeft: '5px' }}>Total:</div>
                        <div style={{ marginRight: '5px' }}>$19.96</div>
                    </div>

                </div>

                <div className={buttonClicked ? "checkout-button-clicked" : "checkout-button"} onClick={() => { setButtonClicked(true); animationOnClick() }}>Proceed to checkout</div>
            </div>
        </div>
    )
}

export default Basket;