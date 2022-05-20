import React from 'react';
import { Link } from 'react-router-dom';
import SvgDisplay from './svgDisplay';

import { ReactComponent as IconBackArrow } from '../img/general/back_arrow.svg';

export default function PurchaseBackButton(props){
    return <div className='buybox_back_btn'>
        <Link to={props.link}><SvgDisplay src={IconBackArrow} /> {props.name}</Link>
    </div>
}