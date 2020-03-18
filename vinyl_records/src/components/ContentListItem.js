import React from 'react';
import './css/ContentListItem.css'

function ContentListItem(props) {
    return (
        <div className="swiper-slide content-list-item mdc-elevation--z2" style={{width:props.height*props.aspectRatio}}>
            <img src={`http://${window.location.hostname}:8000/${props.cover}`} 
            className="content-list-item-image" style={{height: props.height}}/>
            <div className="content-list-item-text">
                <h4 className="item-title mdc-typography--headline6">{props.title}</h4>
                <h6 className="item-subtitle mdc-typography--subtitle2">{props.subtitle}</h6>
            </div>
        </div>
    )
}

export default ContentListItem