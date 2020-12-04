import React from 'react';
import { Workshop } from "../workshop/workshop";
import './workshop-container.style.scss';

export const WorkshopsContainer = props => {

    return(
        <div className="workshops-container">
            <div className="workshops-container__title-block">
                <h2 className="workshops-container__main-title">Workshops</h2>
                <h6>Displayed: <span>{props.items.length}</span></h6>
            </div>
            <div className="workshops-container__workshops" onClick={props.itemClick}>
                {
                    props.items.map(item => {
                        return(
                            <Workshop
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.imageUrl}
                                price={item.price}
                                date={item.date}
                                userid={item.userId}
                                media={props.media}
                                category={item.category}
                                onAddToCart={props.onAddToCart}
                                onTest={props.onTest}
                                className="workshop">
                            </Workshop>
                        )
                    })
                }
                {
                    props.workshopsLoaded ?
                        null :
                        <button
                            className="workshops-container__load-button"
                            onClick={props.onLoadMore}>
                                Load more
                        </button>
                }
            </div>
        </div>
    )
}
