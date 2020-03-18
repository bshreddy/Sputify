import React from 'react';
import ContentListItem from './ContentListItem';
import Swiper from 'swiper/js/swiper.min.js';
import './css/ContentList.css'

class ContentList extends React.Component {
    
    constructor(props) {
        super(props)
        this.id = Math.random().toString(36).substring(10)
        
        this.contentListItems = props.categoryData.map((data) => {
            return <ContentListItem height={this.props.height} aspectRatio={this.props.aspectRatio} 
                                    key={data.id} title={data.title} 
                                    subtitle={this.getSubtitle(data)} cover={data.cover} />
        })
    }

    componentDidMount() {
        new Swiper(`#content-swiper-container-${this.id}`, {
            slidesPerView: 'auto',
            grabCursor: true
        });
    }

    getSubtitle(album) {
        if(album.albumType == 'a')
            return `by ${album.artist}, ${album.year}`
        else {
            var followers = album.followers
            if(followers >= 1000000)
                followers = `${(followers/1000000).toFixed(2)}M`
            else if(followers >= 1000)
            followers = `${followers/1000.0}k`
            return `${followers} Followers`
        }
            
    }

    render() {
        return (
            <div className="content-list">
                <h5 className="mdc-typography--headline5 content-list-title">{this.props.title}</h5>
                <div className="swiper-container content-list-wrapper" id={`content-swiper-container-${this.id}`}>
                    <div className="swiper-wrapper">
                        {this.contentListItems}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentList