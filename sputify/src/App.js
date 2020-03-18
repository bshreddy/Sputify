import React from 'react';
import ScrollingBanner from './components/ScrollingBanner';
import Content from './components/Content';
import '@material/card/dist/mdc.card.min.css'
import '@material/elevation/dist/mdc.elevation.min.css'
import '@material/typography/dist/mdc.typography.min.css'
import './css/App.css';
import Player from './components/Player';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.hostname = window.location.hostname
    this.state = {
      isPlayerOpen: false,
      tracks: [],
      album: null,
      error: null
    }
  }

  bannerClicked(album) {
    console.log(album.id)
    fetch(`http://${this.hostname}:8000/cd_lib/api/tracks/${encodeURI(album.id)}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isPlayerOpen: true,
            album: album,
            tracks: result
          })
        },
        (error) => {
          this.setState({
            isPlayerOpen: false,
            error
          })
        }
      )
  }

  render() {
    return (
      <div>
        <ScrollingBanner onClick={this.bannerClicked.bind(this)}/>
        <Content />  
        
        { (this.state.isPlayerOpen) && <Player tracks={this.state.tracks} album={this.state.album} /> }
      </div>
    )
  }
}

export default App;
