import { useEffect, useState } from 'react';
import './BasketView.css';
import remove from '../../Assets/Images/cross.svg';
import { useSelector } from 'react-redux';



const Basket = () => {

    const [buttonClicked, setButtonClicked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const currentBasket = useSelector(state => state.customerBasket.content);

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
        }, 150);
        setTimeout(() => {
            goToCheckout();
        }, 250);
    }

    const mapBasket = () => {
        const basket = currentBasket;

        // basket.map((item, index) => {
        //     console.log('item in basket: ', item.movieTitle);
        // })
        
        basket.forEach(item => {
            console.log('item in basket: ', item.price);
        });
    }

    function calculateTotal() {

        currentBasket.forEach(item => {
            let currentTotal = totalPrice;
            let price = item.price;
            console.log('totalPrice: ', totalPrice);
            setTotalPrice(currentTotal + price);
        });
        
    }

    useEffect(() => {
        calculateTotal();
        console.log('basket view loaded');
        console.log('currentBasket: ', currentBasket);
        // mapBasket()
    }, []);

    return (
        <div className="basket-view-component">
            <div className="basket-view-container">
                <div className="basket-header-text">Your basket</div>
                <div className="items-in-basket-container">
                    

                    <div className="movies-in-basket">
                        {mapBasket()}
                        
                        {/* items in basket goes here - placeholders atm */}

{/* 
                        <div className="basket-item-container">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem()} />
                        </div>

                        <div className="basket-item-container even">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem()} />
                        </div>

                        <div className="basket-item-container">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem()} />

                        </div>

                        <div className="basket-item-container even">
                            <div className="basket-item-title">A really cool movie title</div>
                            <div className="basket-item-price">$4.99</div>
                            <img className="basket-item-trash" src={remove} alt="" onClick={() => trashItem()} />
                        </div> */}


                        {/* end of items */}

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