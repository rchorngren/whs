
import React from 'react';
import './CheckoutView.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { createOrder } from '../../Features/repositoryFS';
import { actions } from '../../Features/customerBasket';
import{ actions as activeViewActions } from '../../Features/activeView';

const CheckoutView = () => {
 
    const [buttonClicked, setButtonClicked] = useState(false);
    const [contentOfBasket, setContentOfBasket] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const currentBasket = useSelector(state => state.customerBasket.content);
    const dispatch = useDispatch();

    const [emailInput, setEmailInput] = useState('');
    const [cardHolderInput, setCardHolderInput] = useState('');
    const [cardNumberInput, setCardNumberInput] = useState('');
    const [ccvInput, setCcvInput] = useState('');
    const [validUntilInput, setValidUntilInput] = useState('');
    const [inputError, setInputError] = useState(null);
    const [fsQueryDone, setFsQueryDone] = useState(false);
    
    function calculateTotalPrice(total, num) {
        return total + num;
    }

    let priceArray = [];
    const buildBasket = () => {
        setContentOfBasket(currentBasket.map((item, index) => {
            priceArray.push(item.price);
            let priceToSet = priceArray.reduce(calculateTotalPrice);
            let roundedPrice = Math.round((priceToSet + Number.EPSILON) * 100) / 100;
            setTotalPrice(roundedPrice);

            if(index % 2 === 0) {
                return(
                    <div className="basket-item-container" key={index}>
                        <div className="basket-item-title">{item.movieTitle}</div>
                        <div className="basket-item-price">${item.price}</div>
                        <div></div>
                    </div>
                )
            } else {
                return(
                    <div className="basket-item-container uneven" key={index}>
                    <div className="basket-item-title">{item.movieTitle}</div>
                    <div className="basket-item-price">${item.price}</div>
                    <div></div>
                </div>
                )
            }
        }));
    }

    function makePurchase() {
        let orderList = currentBasket;
        let titleList = [];
        orderList.forEach((item) => {
            titleList.push(item.movieTitle);
        })
        createOrder(orderList, titleList, () => setFsQueryDone(true));
    }

    function displayInputError(error) {
        setInputError(error);
        setTimeout(() => {
            setInputError(null);
        }, 5000);
    }

    function verifyInputs() {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regName = /^[\u00C0-\u017Fa-zA-Z'][\u00C0-\u017Fa-zA-Z-' ]+[\u00C0-\u017Fa-zA-Z']?$/;
        const regNumber = /^[0-9]+$/;
        const regDate = /^[\d./-]+$/;

        if(regEmail.test(String(emailInput).toLowerCase())) {
            if(regName.test(String(cardHolderInput).toLowerCase())) {
                if(regNumber.test(String(cardNumberInput).toLowerCase())) {
                    if(regNumber.test(String(ccvInput).toLowerCase())) {
                        if(regDate.test(String(validUntilInput).toLowerCase())) {
                            makePurchase();
                        } else {
                            displayInputError('Invalid date');
                        }
                    } else {
                        displayInputError('Invalid CCV number');
                    }
                } else {
                    displayInputError('Invalid card number');
                }
            } else {
                displayInputError('Invalid name supplied');
            }
        } else {
            displayInputError('Invalid e-mail supplied');
        }   
    }

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 150);
        setTimeout(() => {
            verifyInputs();
        }, 250);
    }

    useEffect (() => {
        buildBasket();
        if(currentBasket.length === 0){
            setTotalPrice(0);
        } 
    }, [currentBasket]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(fsQueryDone) {
            dispatch(actions.emptyBasket());
            dispatch(activeViewActions.purchaseThanks());
        } 
    }, [fsQueryDone]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='checkoutContainer'>
            <div className='checkoutMovies'>
                <div id='checkout'>Checkout</div>
                <div className='moviesInCart'>
                    <div className='cart'>{contentOfBasket}</div>
                    <div id='price'>
                        <div className='totalPrice'>Total: </div>
                        <div className='combinedPrice'>${totalPrice}</div>
                    </div>
                </div>
                <div className='emailInput'>
                    <div id='emailAdress'>Email adress</div>
                    <input type="text" placeholder='Email' className='emailInputField' value={emailInput} onInput={e => setEmailInput(e.target.value)} />
                </div>
                <div>
                    <div className='ownerInformation'> 
                        <div id='payInfo'>Payment information</div>
                        <input type="text" placeholder='Card holder' id='ownerName' className='holderInformation' value={cardHolderInput} onInput={e => setCardHolderInput(e.target.value)} />
                        <input type="text" placeholder='Card number' id='cardNumber' className='holderInformation' value={cardNumberInput} onInput={e => setCardNumberInput(e.target.value)} />
                    </div>
                
                    <div className='addCardInfo'>
                        <input type="text" placeholder='CCV' className='cardInfoInput' value={ccvInput} onInput={e => setCcvInput(e.target.value)} />
                        <input type="text" placeholder='Valid until' className='cardInfoInput' value={validUntilInput} onInput={e => setValidUntilInput(e.target.value)} />
                    </div>
                </div>

            <button className={ buttonClicked ? 'payButton click' : 'payButton' } 
                onClick={() => {
                    animationOnClick();
                    setButtonClicked(true);
                }}>{inputError ? (inputError) : ('Pay')}</button>
            </div>
        </div>
    )
}

export default CheckoutView;
