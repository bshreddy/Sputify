import React from 'react';
import './css/ScrollingBannerItem.css'

class ScrollingBannerItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    const props = this.props
    return (
        <div className="swiper-slide mdc-card item-card mdc-elevation--z4" style={{width:props.height*props.aspectRatio, 
        backgroundImage: `url(http://${window.location.hostname}:8000/${props.data.cover})`}}
        onClick={props.onClick.bind(this, props.data)}>
            <div className="item-text">
                <h4 className="item-title mdc-typography--headline5">{props.data.title}</h4>
                <h6 className="item-subtitle mdc-typography--subtitle1">by {props.data.artist}, {props.data.year}</h6>
            </div>
        </div>
    )
  }
}

export default ScrollingBannerItem