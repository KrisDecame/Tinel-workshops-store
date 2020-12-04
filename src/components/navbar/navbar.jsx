import React from 'react';
import './navbar.style.scss';
import { Link } from 'react-router-dom';

export const Navbar = props => {

    // Logotypes

    const tinelLogo = process.env.PUBLIC_URL + '/tinel-workshop-logo.png';
    const cartLogo = process.env.PUBLIC_URL + "/cart.png";

    return(
        <nav className="navbar">
            <Link to="/">
                <img src={tinelLogo} alt="tinel workshop logo"/>
            </Link>
            <button className="navbar__cart-button" onClick={props.toggleCart}>
            {props.media.matches ?
                    <img src={cartLogo} alt="cart"/> :
                    <div>
                        <img src={cartLogo} alt="cart"/>
                        <span>
                            {
                                props.cartItems.length > 0 ?
                                    (props.cartItems.length === 1 ?
                                        `${props.cartItems.length} Workshop in cart` :
                                        `${props.cartItems.length} Workshops in cart`) :
                                    'Cart is Empty'
                            }
                        </span>
                    </div>
                }
            </button>
        </nav>
    )
}
