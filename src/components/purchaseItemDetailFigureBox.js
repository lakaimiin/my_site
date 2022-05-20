import React from 'react';
import { Button } from 'react-bootstrap';
import {moneyWithComma} from '../functionallity/dataConvertor';
import env from "react-dotenv";

export default function PurchaseItemDetailFigureBox(props){
    return <>
        <div className='buybox_figure_box'>
            <div className='price'>
                <img src={require('../img/general/coin_icon.png')} className='coin_icon lg' alt='' /> 
                <span className='buybox_price_ecoin'>{moneyWithComma(props.boxPrice)} {env.DEFAULT_ECOIN}</span>
                <span className='buybox_price_currency'>≈ {props.boxCurrencyPrice} {env.DEFAULT_CURRENCY}</span>
            </div>
            
            {props.quantityControl && <div className='input'>
                <Button disabled={props.figureMinus} variant="primary" size="sm" className='figure_box_btn' onClick={() => props.figureAdjustHandler('-')}>-</Button>
                <input maxLength={9} type="text" name='number' value={props.number} onChange={props.figureHandler} />
                <Button disabled={props.figurePlus} variant="primary" size="sm" className='figure_box_btn' onClick={() => props.figureAdjustHandler('+')}>+</Button>
            </div>}

            <Button disabled={props.figureMinus} variant="primary" size="lg" className='buybox_purchase_btn'>{props.buttonText}</Button>

        </div>
    </>
}