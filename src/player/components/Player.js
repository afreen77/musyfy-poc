import React from 'react';
import ClassNames from 'classnames';


class Player extends React.Component {

  xlArtwork(url){
    return url.replace(/large/, 't50x50');
  }

  render(){

    const backgroundImage = {

      backgroundImage:`linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),   url(${this.xlArtwork(this.props.backgroundImage)})`
    }
    const playPauseClass = ClassNames({
      'fa fa-play': this.props.playStatus === 'PLAYING' ? false : true,
      'fa fa-pause': this.props.playStatus === 'PLAYING' ? true : false
    });
    return(

      <div className="progress-radial player" style={backgroundImage}>
        <div className="overlay">
          <div className="button-play">
          
          <div className="player__main">
            <button onClick={this.props.togglePlay}><i className={playPauseClass}></i></button>
            </div>

          </div>
          <div className="player__forward">
            <button onClick={this.props.forward}><i className="fa fa-forward"></i></button>
          </div>
        </div>
      </div>
    )
  }

}

export default Player