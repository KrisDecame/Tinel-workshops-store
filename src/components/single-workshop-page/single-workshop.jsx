import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./single-workshop.style.scss";
import { AddToCartButton } from "../add-to-cart-button/atc-button.jsx";
import { Workshop } from "../workshop/workshop";

export const SingleWorkshop = (props) => {
    const [singleWorkshop, setSingleWorkshop] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [user, setUser] = useState();
    const [similarWorkshops, setSimilarWorkshops] = useState();
    const media = window.matchMedia("(max-width: 800px)");
    const params = useParams();

    // Logotypes

    let logoUrl = null;

    if (singleWorkshop) {
        logoUrl  = process.env.PUBLIC_URL + `/logotypes/categories/${singleWorkshop.category}white.svg`;
    }
    const dateLogo = process.env.PUBLIC_URL + `/logotypes/calendar.svg`;
    const timeLogo = process.env.PUBLIC_URL + `/logotypes/clock.svg`;
    const backLogo = process.env.PUBLIC_URL + `/logotypes/backarrow.svg`;
    const cartLogo = process.env.PUBLIC_URL + `/cart.png`;

    // Date and time

    let date;
    let time;

    if (singleWorkshop) {
        const workShopDate = new Date(singleWorkshop.date);
        date = `${workShopDate.getDate()}.${workShopDate.getMonth() + 1}.${workShopDate.getFullYear()}.`;
        time = `${workShopDate.getHours()}:${workShopDate.getMinutes()}`;
    }

    // Functions, lifecycle methods and event listeners

    const handleChange = (item, value) => {
        props.updateItem(item.id, {
            ...item,
            quantity: Number(value),
        });

        setQuantity(value);
    };

    const getSingleWorkshop = () => {
        fetch(`http://localhost:5000/workshops/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setSingleWorkshop(data);
            });
    };

    useEffect(() => {
        getSingleWorkshop();
    }, [params]);

    useEffect(() => {
        if (singleWorkshop) {
            fetch(`http://localhost:5000/orders/`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.find((item) => item.id === singleWorkshop.id)) {
                        setQuantity(
                            data.find((item) => item.id === singleWorkshop.id)
                                .quantity
                        );
                    }
                });

            fetch(`http://localhost:5000/users/${singleWorkshop.userId}`)
            .then(response => response.json())
            .then(
                data => {
                    setUser(data);
                },
            );

            setSimilarWorkshops(
                props.workshops.filter(item =>
                    item.category === singleWorkshop.category && item.id !== singleWorkshop.id).slice(0,3)
            );
        }

    }, [singleWorkshop, props.cartItems]);

    return (
        <div className="single-workshop">
            <div className="single-workshop__container">
                <aside>
                    <Link className="single-workshop__link" to="/">
                        <button className="single-workshop-back-button"><img src={backLogo} alt=""/> Back</button>
                    </Link>
                </aside>
                {
                    singleWorkshop ?
                        <div className="single-workshop__summary">
                        <div className="single-workshop__image"
                            style={singleWorkshop ? {
                                backgroundImage: `url(${singleWorkshop.imageUrl})`
                            }: null}
                        ></div>
                        <div className="single-workshop__content-block">
                            <div className="single-workshop__description-block">
                                <div className="single-workshop__date">
                                    <img className="single-workshop__logo" src={logoUrl}></img>
                                    <img className="logo" src={dateLogo} alt="date"/>{date} <span><img className="logo" src={timeLogo} alt="clock"/>{time}</span>
                                </div>
                                <div className="single-workshop__title">{singleWorkshop.title}</div>
                                <div className="single-workshop__name">
                                    <span>with </span>{ user ? user.name : null } </div>
                                <div className="single-workshop__description">{singleWorkshop.desc}</div>
                            </div>
                            <div className="single-workshop__add-to-cart">
                                {media.matches ? null: <h5>Buy your ticket</h5>}
                                <h2>{singleWorkshop.price} <span>eur</span></h2>
                                <div className="single-workshop__atc-block">
                                    <input
                                        min={1}
                                        type="number"
                                        onChange={(e) => handleChange(singleWorkshop, e.currentTarget.value)}
                                        value={quantity}
                                    />
                                    <AddToCartButton
                                        media={media}
                                        className="single-workshop__atc-button"
                                        onClick={() =>
                                            props.onAddToCart(singleWorkshop.id)
                                        }>
                                            Add to { media.matches ? <img src={cartLogo} alt="Cart"/> : 'Cart' }
                                    </AddToCartButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="single-workshop__spinner"></div>
                }
            </div>
            {
                similarWorkshops &&
                    (similarWorkshops.length > 0 ?
                    <div className="similar-workshops">
                        <aside></aside>
                        <div className="similar-workshops__main">
                            <h2>Similar Workshops</h2>
                            <div className="similar-workshops__container">
                                {
                                    similarWorkshops.map(item => {
                                        return <Workshop
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            image={item.imageUrl}
                                            price={item.price}
                                            date={item.date}
                                            userid={item.userId}
                                            category={item.category}
                                            media={media}
                                            onAddToCart={props.onAddToCart}
                                            className="workshop">
                                        </Workshop>
                                    })
                                }
                            </div>
                        </div>
                    </div> : null)
            }
        </div>
    );
};
