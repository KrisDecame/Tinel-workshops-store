import React from 'react';
import './checkout.style.scss'

export const Checkout = props => {

    const dateLogo = process.env.PUBLIC_URL + `/logotypes/calendar.svg`;
    const closeButton = process.env.PUBLIC_URL + `/logotypes/closebutton.svg`;

    return (
        <div className="checkout__wrapper">
            {
                props.completeCheckout ?
                    <div className="checkout-message">
                        <div className="checkout-message__container">
                            <div className="checkout-message__content-block">
                                <h2>Thank you!</h2>
                                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, iste provident! Pariatur facilis fugit sunt.</h6>
                            </div>
                            <button className="checkout-message__back-button" onClick={() => {
                                props.onCloseButton();
                                props.onCompleteCheckout();
                            }}>Back to Shop</button>
                        </div>
                    </div> :
                    <div className="checkout">
                        <header className="checkout__header">
                            <h2>Checkout</h2>
                            <button onClick={props.onCloseButton}><img src={closeButton} alt="x"/></button>
                        </header>
                        <h6 className="checkout__description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, unde?</h6>
                        <form className="checkout__form" defaultValue="none" onSubmit={(e) => {
                                e.preventDefault();
                                props.onCompleteCheckout();
                                return false;
                            }}>
                            <div className="checkout__form-block">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" required placeholder="Type your first name here" id="first-name"/>
                            </div>
                            <div className="checkout__form-block">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" placeholder="Type your last name here" id="last-name"/>
                            </div>
                            <div className="checkout__form-block">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" required placeholder="Type your email address here" id="email"/>
                            </div>
                            <div className="checkout__date-gender-block">
                                <div className="checkout__form-block checkout__date-block">
                                    <label htmlFor="birth-date"><img src={dateLogo} alt="date"/>Date of Birth</label>
                                    <input type="date" required placeholder="DD/MM/YYYY" id="birth-date"/>
                                </div>
                                <div className="checkout__form-block checkout__gender-block">
                                    <label htmlFor="gender">Gender</label>
                                    <select id="gender" defaultValue="choose">
                                        <option value="choose" disabled="disabled">Choose your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="checkout__form-block">
                                <label htmlFor="adress">Address</label>
                                <input type="text" required placeholder="Type your address here" id="address"/>
                            </div>
                            <div className="checkout__form-block">
                                <label htmlFor="zip-code">Zip Code</label>
                                <input type="text" required placeholder="eg. 21310" id="zip-code"/>
                            </div>
                            <div className="checkout__form-block--agreement">
                                <input type="checkbox" required name="" id="agreement"/>
                                <label htmlFor="agreement">Agree</label>
                            </div>
                            <button className="checkout__form-submit-button" type="submit">Checkout</button>
                        </form>
                    </div>
            }
            <div className="checkout__outer-layer"></div>
        </div>
    )
}
