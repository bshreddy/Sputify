import React from 'react';
import './css/Content.css';
import ContentList from './ContentList';

class Content extends React.Component {
  constructor(props) {   
    super(props)
    this.hostname = window.location.hostname
    this.height = 250
    this.aspectRatio = 1
    this.state = {
      isLoaded: false,
      content: {},
      error: null
    }
  }

  componentDidMount() {
    fetch(`http://${this.hostname}:8000/cd_lib/api/content`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            content: result
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
    const { error, isLoaded, content } = this.state;

    if(!isLoaded)
      return (
        <div className="content">
          Loading...
        </div>
      )

    return (
      <div className="content">
        <h4 className="mdc-typography--headline4 content-title">Albums</h4>
          {
            content.categories.map((category) => 
              <ContentList height={this.height} aspectRatio={this.aspectRatio} 
                key={category} title={category} categoryData={content.categoryData[category]} />
            ) 
          }
      </div>
    )
  }
}

export default Content