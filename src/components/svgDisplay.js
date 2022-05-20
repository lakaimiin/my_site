import React from 'react';

export default function SvgDisplay(props) {
    let html = "";

    if(props.width && props.height)
        html = <props.src width={props.width} height={props.height} />
    else if(props.width && props.height !== undefined)
        html = <props.src width={props.width} />
    else if(props.height && props.width !== undefined)
        html = <props.src width={props.height} />
    else
        html = <props.src />

    return (
        html
    )
}