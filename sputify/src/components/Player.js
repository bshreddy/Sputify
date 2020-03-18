import React from 'react';
import SoundCloudAudio from 'soundcloud-audio/dist/soundcloud-audio.min.js'
import '@material/icon-button/dist/mdc.icon-button.min.css'
import './css/Player.css'
import '@polymer/paper-slider/paper-slider.js'

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.hostname = window.location.hostname
    this.height = 96
    this.scPlayer = new SoundCloudAudio();

    this.state = {
      autoPlay: true,
      isPlaying: false,
      trackIdx: 0,
      loop: true,
      shuffle: false,
      muted: false
    }
  }

  componentDidMount() {
    const props = this.props
    if(props.tracks.length == 0)
      return
    
    // document.getElementById('track-title').innerHTML = props.tracks[0].title
    this.scPlayer.on('canplay', () => {
      document.getElementById('player-track').setAttribute('max', this.scPlayer.audio.duration)
    })
    this.scPlayer.on('durationchange', () => {
      document.getElementById('player-track').setAttribute('max', this.scPlayer.audio.duration)
    })
    this.scPlayer.on('timeupdate', () => {
      document.getElementById('player-track').setAttribute('value', this.scPlayer.audio.currentTime)
    })
    this.scPlayer.on('ended', () => {
      this.skipTrack.bind(this, 1)
    })

    // var playerTrack = document.querySelector('#player-track');
    // playerTrack.addEventListener('click', () => {
    //   this.scPlayer.setTime(playerTrack.value)
    // });

    this.play()
  }

  componentWillUnmount() {
    this.scPlayer.stop()
  }

  componentWillReceiveProps() {
    this.scPlayer.stop()
    this.setState({autoPlay: true, isPlaying: false})
  }

  componentDidUpdate() {
    if(this.state.autoPlay) {
      this.play()
      this.setState({autoPlay: false})
    }
  }

  play() {
    if (!this.state.isPlaying) {
      this.setState({
        isPlaying: true
      })
    }
    this.scPlayer.play({streamUrl: `http://${window.location.hostname}:8000/cd_lib/api/stream/${this.props.tracks[this.state.trackIdx].id}`})
  }

  togglePlay() {
    const {isPlaying} = this.state

    if(isPlaying)
      this.scPlayer.pause()
    else
      this.play()

    this.setState({isPlaying: !isPlaying})
  }

  skipTrack(numSkip) {
    const maxLength = this.props.tracks.length
    var trackIdx = this.state.shuffle ? Math.floor(Math.random() * maxLength) : (this.state.trackIdx + numSkip) % maxLength
    trackIdx = (trackIdx < 0) ? maxLength + trackIdx : trackIdx

    this.setState({trackIdx: trackIdx}, () => {
      this.scPlayer.stop()
      this.play()
    })
  }

  toggleVolume() {
    this.setState({muted: !this.state.muted}, () => {
      this.scPlayer.setVolume(this.state.muted ? 0 : 1)
    })
  }

  render() {
    const props = this.props
    const state = this.state

    const prevDisabled = state.shuffle ? false : (!state.loop && state.trackIdx == 0)
    const nextDisabled = state.shuffle ? false : (!state.loop && state.trackIdx == (props.tracks.length - 1))

    return (
      <div className="player-container" style={{height: this.height}}>
        <img src={`http://${window.location.hostname}:8000/${props.album.cover}`} 
          className="player-album-image" style={{height: this.height}} />
        <div className="player-wrapper player-text-wrapper">
          <h6 className="mdc-typography--headline6 player-album-title" id="track-title">{props.tracks[state.trackIdx].title}</h6>
          <h6 className="mdc-typography--subtitle2 player-album-subtitle">{props.album.artist} - {props.album.title}</h6>
        </div>

        <div className="player-wrapper player-controls">
          <button className={`mdc-icon-button material-icons player-control ${prevDisabled && "player-control--disabled"}`}
                  onClick={() => { if(!prevDisabled) this.skipTrack(-1)}}>
                    skip_previous
          </button>
          <button className="mdc-icon-button material-icons" onClick={this.togglePlay.bind(this)}>
            {(state.isPlaying) ? "pause" : "play_arrow"}
          </button>
          <button className={`mdc-icon-button material-icons player-control ${nextDisabled && "player-control--disabled"}`}
                  onClick={() => { if(!nextDisabled) this.skipTrack(1)}}>
                    skip_next
          </button>
        </div>

        <div className="player-wrapper player-track-progress">
          <paper-slider className="track" id="player-track" value="0" max="255"></paper-slider>
        </div>

        <div className="player-wrapper player-additional-controls">
          <button className="mdc-icon-button material-icons player-control"
                  onClick={this.toggleVolume.bind(this)}>
                    { state.muted ? "volume_muted" : "volume_up" }
          </button>
          <button className={`mdc-icon-button material-icons player-control player-repeat ${state.loop && "player-control--active"}`}
                  onClick={() => {this.setState({loop: !this.state.loop, shuffle: false})}}>
                    repeat
          </button>
          <button className={`mdc-icon-button material-icons player-control player-shuffle ${state.shuffle && "player-control--active"}`}
                  onClick={() => {this.setState({shuffle: !this.state.shuffle, loop: false})}}>
                    shuffle
          </button>
          <button className="mdc-icon-button material-icons player-control player-control--disabled">queue_music</button>
        </div>
      </div>
    )
  }
}

export default Player