import React from 'react';
import './filter--desktop.style.scss';

export const DesktopFilter = props => {

    // Remove filter hover 'active' class

    const filters = document.querySelectorAll('.filter-option__category');

    for (const filter of filters) {
        filter.classList.remove('active');
        if (filter.dataset.category === props.active) {
            filter.classList.add('active');
        }
    }

    return(
        <div>
            <div className="filter-option filter-option--all filter-active filter-option__category" onClick={props.onClick} data-category="all">All</div>
            {
                props.categories.map((category, index) => {
                    const logoUrl = process.env.PUBLIC_URL + `/logotypes/categories/${category}.svg`;

                    return(
                        <div key={index} className="filter-option" data-category={category} onClick={props.onClick}>
                            <img src={logoUrl} alt="" onClick={props.onClick} data-category={category} />
                            <div className="filter-option__category" onClick={props.onClick} data-category={category}>{category}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
