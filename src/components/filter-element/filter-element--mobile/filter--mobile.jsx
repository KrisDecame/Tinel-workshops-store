import React from 'react';
import './filter--mobile.style.scss'

export const MobileFilter = props => {
    return(
        <select className="filter-select-element" onChange={props.onChange}>
            <option data-category="all">All</option>
            {
                props.categories.map((category, index) => {
                    return <option data-category={category} key={index}>{category}</option>
                })
            }
        </select>
    )
}
