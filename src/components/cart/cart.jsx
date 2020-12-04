import React from "react";
import "./cart.style.scss";

export const Cart = (props) => {
    const handleChange = (item, value) => {
        props.updateItem(item.id, {
            ...item,
            quantity: Number(value),
        });
    };

    // Logotypes

    const deleteButton = process.env.PUBLIC_URL + `/logotypes/trash.svg`;
    const closeButton = process.env.PUBLIC_URL + `/logotypes/closebutton.svg`;
    const cartlogo = process.env.PUBLIC_URL + `/cart.png`;

    // Cart animation

    let cartAnimation;

    props.cartAppear ?
        cartAnimation = { animation: "cartAppear 500ms ease forwards" } :
            (
                props.enabledCart ?
                    (cartAnimation = { animation: "cartDisappear 500ms ease forwards" }) :
                    cartAnimation = null
            )

    return (
        <div className="cart" style={cartAnimation}>
            <div className="cart__indicator">
                <h5>
                    <img src={cartlogo} alt="cart"/>
                    {
                        props.items.length > 0 ?
                            (props.items.length === 1 ?
                                `${props.items.length} Workshop` :
                                `${props.items.length} Workshops`) :
                            'Cart is Empty'}
                </h5>
                <button onClick={props.toggleCart}>
                    <img src={closeButton} alt="close"/>
                </button>
            </div>
            <div className="cart__items-container">
                {props.items.map((item, index) => {
                    return (
                        <div className="cart__item" key={index}>
                            <div
                                className="cart__item-background"
                                style={{backgroundImage:`url(${item.imageUrl})`}}>
                            </div>
                            <div className="cart__item-content">
                                <div className="cart__item-title-block">
                                    <h4>{item.title}</h4>
                                    <button
                                        onClick={props.deleteItem}
                                        data-id={item.id}>
                                            <img data-id={item.id} src={deleteButton} alt="close"/>
                                    </button>
                                </div>
                                <div className="cart__item-price-block">
                                    <input
                                        type="number"
                                        onChange={(e) =>
                                            handleChange(item, e.currentTarget.value)
                                        }
                                        data-type="input"
                                        value={item.quantity ? item.quantity : "1"}
                                        min="1"
                                        data-id={item.id}
                                        />
                                    <h3>
                                        {(item.price * (item.quantity ? item.quantity : 1)).toFixed(2)} <span>eur</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="cart__checkout-block">
                <h6>subtotal</h6>
                <h2>{props.cartTotal} <span>eur</span></h2>
                <button onClick={() => props.onCheckout(props.items)}>
                    <h5>Checkout</h5>
                </button>
            </div>
        </div>
    );
};
