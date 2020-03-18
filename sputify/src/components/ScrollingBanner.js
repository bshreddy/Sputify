import React from 'react';
import Swiper from 'swiper/js/swiper.min.js';
import ScrollingBannerItem from './ScrollingBannerItem';
import 'swiper/css/swiper.min.css';
import './css/ScrollingBanner.css';

class ScrollingBanner extends React.Component {

  constructor(props) {
    super(props)
    this.hostname = window.location.hostname
    this.height = 480;
    this.state = {
      isLoaded: false,
      bannerItems: [],
      error: null
    }
  }

  initSwiper() {
    console.log("Loading Swiper")
    this.swiper = new Swiper('#banner-container', 
    {
      effect: 'coverflow',
      grabCursor: true,
      slidesPerView: 'auto',
      spaceBetween: this.height / -2,
      centeredSlides: true,
      coverflow: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows : true
      },
      loop: false,
      initialSlide: (this.state.bannerItems.length-1)/2,
      slideToClickedSlide: true
    })
  }

  componentDidMount() {
    this.initSwiper()

    fetch(`http://${this.hostname}:8000/cd_lib/api/banner`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bannerItems: result
          }, this.initSwiper)
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, bannerItems } = this.state;

    if(!isLoaded)
      return (
        <div className="scrolling-banner" style={{height: this.height}}>
          <div className="scrolling-banner-loading">
            Loading...
          </div>
        </div>
      )
    
    if(error)
      return (
        <div className="scrolling-banner" style={{height: this.height}}>
          <div className="scrolling-banner-error">
            {this.state.error.message}
          </div>
        </div>
      )

    return (
      <div className="swiper-container scrolling-banner" style={{height: this.height}} id="banner-container">
        <div className="swiper-wrapper">
          {
            bannerItems.map((item) => {
              return <ScrollingBannerItem key={item.id} data={item} height={this.height} aspectRatio="1" onClick={this.props.onClick}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default ScrollingBanner