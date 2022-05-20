import React from 'react';
import env from "react-dotenv";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function BuyListComponent(props){
    const { t } = useTranslation();

    return <NavLink className="purchaselist_table_content" to={env.URL_BUYHERO_PAGE + props.id}>
            <div className='purchaselist_table_item_bg'>
                <div className='content_block'></div>
            </div>
            <div className='purchaselist_table_item'>
                <img src={require(`../img/buy/heros/${props.heroImg}`)} />
                <div className='purchaselist_table_item_detail'>
                    <div className={`purchaselist_item_detail_top ${props.heroRarity}`}>
                        <div className="content_block">
                            <div className="purchaselist_item_label"></div>
                            <span className="purchaselist_item_type">{props.heroTitle}</span>
                            <span className="purchaselist_item_name">{props.heroName}</span>
                        </div>
                    </div>
                    <div className='purchaselist_item_detail_bottom'>
                        <div>
                            <span className='title'>{t('gthc_battle')}</span>
                            <span className='value'>{props.heroBattle}/{props.heroMaxBattle}</span>
                        </div>
                        <div>
                            <span className='title'>{t('price')}</span>
                            <div className='price'>
                                <div className='ecoin'>
                                    <img src={require('../img/general/coin_icon.png')} alt="" />
                                    <div>{props.heroPrice}</div>
                                </div>
                                <div className='currency'>$&nbsp;{props.heroCurrency}&nbsp;{env.DEFAULT_CURRENCY}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </NavLink>
}