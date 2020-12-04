import React from 'react';
import { DesktopFilter } from './filter-element--desktop/filter--desktop.jsx'
import { MobileFilter } from './filter-element--mobile/filter--mobile.jsx'

export const FilterElement = props => {
    return(
        <div className="filter-element">
            {props.media.matches ? null : <h6 className="filter-element__title">Filter by category:</h6>}
            {
                props.media.matches ?
                    <MobileFilter categories={props.categories} onChange={props.onChange}></MobileFilter> :
                    <DesktopFilter categories={props.categories} onClick={props.onClick} active={props.active}></DesktopFilter>
            }
        </div>
    )
}
