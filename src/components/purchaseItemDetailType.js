import React from 'react';
import SvgDisplay from './svgDisplay';

export default function PurchaseItemDetailType(props){
    return <>
        <div className='buybox_remaining_content'>
            <div><SvgDisplay src={props.icon} /></div>
            <div className='buybox_remaining_desc'>
                <div className='title'>{props.title}</div>
                <div className={`value ${props.colorType}`}>{props.value}</div>
            </div>

            {
                props.tooltips && <div className='tooltips'>
                    <div className='title'>{props.tooltipTitle}</div>
                    <div className='content'>{props.tooltipsContent}</div>
                </div>
            }
        </div>
    </>
}