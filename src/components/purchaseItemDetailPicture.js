import React from 'react';

export default function PurchaseItemDetailPicture(props){
    return <>
        <img src={props.bgLabel} alt="" className='buybox_bg_label' />
        <div className='buybox_left_container'>
            <div className='box_bg_blur_effect'></div>
            <div className='box_ground_effect'><img src={require('../img/buybox/box_ground_effect.png')} alt='' /></div>
            <div className={`buybox_img ${props.static ? 'static' : ''}`}><img src={props.heroImg} alt='' /></div>
        </div>
    </>
}