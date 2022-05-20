import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import env from "react-dotenv";

export default function Header(){
    const { t } = useTranslation();

    return <header>
        <nav>
            <div className='logo'><img src={require('../img/general/logo.png')} alt="" /></div>
            <NavLink to="/">{t('home')}</NavLink>
            <NavLink to={env.URL_BUY_PAGE}>{t('buy')}</NavLink>
            <NavLink to={env.URL_RENT_PAGE}>{t('rent')}</NavLink>
            <div className='ewallet_connection'>
                <Button variant="primary" size="sm">{t('connect_wallet')}</Button>
            </div>
        </nav>
    </header>
}