import React from 'react';
import css from './Footer.module.css'

const Footer = () => (

    <footer>
        <div className={css.Footer}>
            <div className={css.FooterSection}></div>
            <div className={css.FooterSection}></div>
            <div className={css.FooterSection}></div>
        </div>
        <p> Osaebros 2021</p>
    </footer>
);
export default Footer