import './scss/main.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar } from "./components/navbar/navbar.jsx";
import { FilterElement } from "./components/filter-element/filter-element.component.jsx";
import { WorkshopsContainer } from "./components/workshops-container/workshops-container.jsx";
import { SingleWorkshop } from "./components/single-workshop-page/single-workshop.jsx";
import { Cart } from "./components/cart/cart.jsx";
import { Footer } from "./components/footer/footer.jsx";
import { Checkout } from "./components/checkout/checkout.jsx";

function App() {
    const [workshops, setWorkshops] = useState([]);
    const [workshopsLoaded, setWorkshopsLoaded] = useState(false);
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [categories, setCategories] = useState([]);
    const [cartAppear, setCartAppear] = useState(false);
    const [enabledCart, setEnabledCart] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [completeCheckout, setCompleteCheckout] = useState(false);
    const media = window.matchMedia("(max-width: 800px)");

    const pageLimit = 9;

    // API functions

    const getWorkshops = () => {
        fetch(`http://localhost:5000/workshops?_page=${pageNumber}&_limit=${pageLimit}`)
            .then(response => response.json())
            .then(
                data => {
                    setWorkshops(data);
                    setFilteredWorkshops(data);
                    setPageNumber(pageNumber + 1)
                },
            );
    }

    const loadMoreWorkshops = () => {
        console.log(pageNumber);
        fetch(`http://localhost:5000/workshops?_page=${pageNumber}&_limit=${pageLimit}`)
            .then(response => response.json())
            .then(
                data => {
                    if (data.length < pageLimit) {
                        console.log(data);
                        setWorkshops(workshops.slice().concat(data));
                        setFilteredWorkshops(workshops.slice().concat(data))
                        setPageNumber(pageNumber + 1)
                        setWorkshopsLoaded(true);
                    } else {
                        console.log(data);
                        setWorkshops(workshops.slice().concat(data));
                        setFilteredWorkshops(workshops.slice().concat(data))
                        setPageNumber(pageNumber + 1)
                    }
                },
            );
    }

    const getCategories = () => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(
                data => {
                    setCategories(data);
                },
            );
    }

    const getOrders = () => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                updateCart(data);
            })
    }

    // Filters functionality

    const desktopFilterhandler = (e) => {
        for (const category of categories) {
            if (e.target.dataset.category === category) {
                setFilteredWorkshops(workshops.filter(workshop => workshop.category === category));
                setActiveFilter(category)
            } else if (e.target.dataset.category.toLowerCase() === 'all') {
                setFilteredWorkshops(workshops);
                setActiveFilter('all')
            }
        }
    }

    const mobileFilterhandler = (e) => {
        for (const category of categories) {
            if (e.target.value === category) {
                setFilteredWorkshops(workshops.filter(workshop => workshop.category === category));
            } else if (e.target.value.toLowerCase() === 'all') {
                setFilteredWorkshops(workshops)
            }
        }
    }

    // Cart functionality

    const toggleCart = () => {
        setCartAppear(!cartAppear);
        if (enabledCart === false) {
            setEnabledCart(true);
        }
    }

    const addToCart = async (e) => {
        let workshopToPost;

        workshopToPost = workshops.find(workshop => workshop.id === e);

        try {
            await fetch('http://localhost:5000/orders', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ ...workshopToPost, quantity: 1 })
            })
                .then(() => getOrders())
        } catch (e) {
            console.log(e);
        }
    }

    const deleteItem = async (e) => {
        const id = e.target.dataset.id

        try {
            await fetch(`http://localhost:5000/orders/${id}`, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(response => console.log(response))
                .then(() => getOrders())
        } catch (e) {
            console.log(e);
        }
    }

    const updateCart = (items) => {
        let total = 0;

        for (const item of items) {
            total += item.price * (item.quantity ? item.quantity : 1);
        }

        setCartTotal(total)
    }

    const updateItem = (id, obj) => {
        fetch("http://localhost:5000/orders/" + id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        }).then(() => getOrders())
    }

    const onCartCheckout = (cartItems) => {
        cartItems.length === 0 ?
            console.log('your cart is empty') :
            setCheckout(!checkout);
            toggleCart();
    }

    const closeCheckout = () => {
        setCheckout(!checkout)
    }

    const onCompleteCheckout = () => {
        setCompleteCheckout(!completeCheckout);
    }

    // Lifecycle functions

    useEffect(() => {
        getWorkshops();
        getCategories();
        getOrders()
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <Navbar
                        toggleCart={toggleCart}
                        media={media}
                        cartItems={cartItems}
                    />
                </header>
                <Switch>
                    <Route path="/" exact>
                        <main>
                            <FilterElement
                                media={media}
                                categories={categories}
                                onClick={desktopFilterhandler}
                                onChange={mobileFilterhandler}
                                active={activeFilter}
                            />
                            <WorkshopsContainer
                                items={filteredWorkshops}
                                media={media}
                                onAddToCart={addToCart}
                                onLoadMore={loadMoreWorkshops}
                                workshopsLoaded={workshopsLoaded}
                            />
                        </main>
                    </Route>
                    <Route path={"/workshops/:id"} exact>
                        <SingleWorkshop
                            onAddToCart={addToCart}
                            updateItem={updateItem}
                            cartItems={cartItems}
                            workshops={workshops}
                            cartTotal={cartTotal}
                        />
                    </Route>
                </Switch>
                <Cart
                    cartAppear={cartAppear}
                    enabledCart={enabledCart}
                    items={cartItems}
                    toggleCart={toggleCart}
                    deleteItem={deleteItem}
                    cartTotal={cartTotal}
                    updateItem={updateItem}
                    onCheckout={onCartCheckout}
                />
                <Footer></Footer>
                {
                    checkout ?
                        <Checkout
                            onCloseButton={closeCheckout}
                            onCompleteCheckout={onCompleteCheckout}
                            completeCheckout={completeCheckout}
                        />
                        : null
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
