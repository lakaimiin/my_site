import React from 'react';

export default function PurchaseItemDetailName(props){
    return <>
        <div className={`buybox_name_container ${props.colorType}`}>
            <div className='title'>{props.name}</div>
            <div className='type'>{props.type}</div>
        </div>
    </>
}