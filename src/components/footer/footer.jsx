import React from 'react';
import './footer.style.scss';

export const Footer = () => {
    const copyrightLogo = process.env.PUBLIC_URL + '/logotypes/copyright.svg';

    const date = new Date();

    return (
        <footer>
            <h6><img src={copyrightLogo} alt="copyright"/><span>tinel </span>Meetup {date.getFullYear()}</h6>
        </footer>
    )
}
