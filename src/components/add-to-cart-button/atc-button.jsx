import React from 'react';

export const AddToCartButton = props => {

    return (
        <button
            className={props.className}
            onClick={props.onClick}
            data-id={props.id}>
                {props.children}
        </button>
    );
}
