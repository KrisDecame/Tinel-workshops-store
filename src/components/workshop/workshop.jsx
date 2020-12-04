import React from 'react';
import { AddToCartButton } from "../add-to-cart-button/atc-button.jsx";
import { Link } from 'react-router-dom';
import './workshop.style.scss';

export const Workshop = props => {

    const backgroundImage = {
        backgroundImage: `url(${props.image})`,
    };

    // Logotypes

    const linkStyle = { textDecoration: "none", color: "initial" };
    const logoUrl = process.env.PUBLIC_URL + `/logotypes/categories/${props.category}white.svg`;
    const dateLogo = process.env.PUBLIC_URL + `/logotypes/calendar.svg`;
    const timeLogo = process.env.PUBLIC_URL + `/logotypes/clock.svg`;
    const cartLogo = process.env.PUBLIC_URL + "/cart.png";

    // Date and time functions

    const date = new Date(props.date);
    const workshopDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const workshopTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;


    return(
        <div className={props.className}>
            <Link to={`/workshops/${props.id}`} style={linkStyle} className="workshop__link">
                <div
                    style={backgroundImage}
                    className="workshop__image-container">
                        <img className="workshop__logo" src={logoUrl} alt=""/>
                </div>
            </Link>
            <div className="workshop__content-block">
                <div className="workshop__title-time-block">
                    <div className="workshop__date-time">
                        <span><img src={dateLogo} alt="date"/>{workshopDate}</span>
                        <span><img src={timeLogo} alt="date"/>{workshopTime}</span>
                    </div>
                    <Link to={`/workshops/${props.id}`} style={linkStyle}>
                        <h4 className="workshop__title">{props.title}</h4>
                    </Link>
                </div>
                <div className="workshop__price-button-block">
                    <div className="workshop__price-block">
                        <h3 className="workshop__price">{props.price.toFixed(2)}</h3>
                        <h6 className="workshop__currency">eur</h6>
                    </div>
                    <AddToCartButton
                        media={props.media}
                        className="workshop__atc-button"
                        onClick={() => props.onAddToCart(props.id)}
                        id={props.id}>
                            {
                                props.media.matches ?
                                    <img src={cartLogo} alt="cart"/> :
                                    'Add to Cart'
                            }
                    </AddToCartButton>
                </div>
            </div>
        </div>
    )
}
