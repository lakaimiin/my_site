import React, {useEffect} from 'react';
import $ from 'jquery';
import SvgDisplay from '../components/svgDisplay';

import { ReactComponent as IconArrow } from '../img/general/down_arrow.svg';

export default function FilterCollapse(props){

    useEffect(() => {
        $(document)
            .off('click', '.collapse_container .collapse_header')
            .on('click', '.collapse_container .collapse_header', function(){
                $(this).toggleClass('close');
                $(this).parent().children('.collapse_body').stop().slideToggle(150);
            });
    }, [])

    return <>
        <div className='content_block'>
            <div className='purchaselist_filter_secondary collapse_container'>
                <div className='collapse_header'>
                    <div>{props.title}</div>
                    <div className="icon"><SvgDisplay src={IconArrow} /></div>
                </div>
                <div className='collapse_body'>
                    {props.bodyContent}
                </div>
            </div>
        </div>
    </>
}