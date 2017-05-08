//React library
import React, { Component } from 'react';
//Sound component
import Sound from 'react-sound';
//Axios for Ajax
import Axios from 'axios';

//Custom components
import { Details, Player, Progress, Search } from './player';

class App extends Component {

  constructor(props) {
     super(props);
     this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
     let elapsed_time = ''
     let position = 0;
     if(localStorage.getItem("elapsed_time")){
        elapsed_time = localStorage.getItem("elapsed_time");
        position = localStorage.getItem("position");
      }else{
        elapsed_time = '00:00'
     }
     this.state = {
       track: {stream_url: '', title: '', artwork_url: ''},
       tracks: [],
       playStatus: Sound.status.PAUSED,
       elapsed: elapsed_time,
       total: '00:00',
       position: position ,
       playFromPosition: 0,
       autoCompleteValue: ''
     };
   }

 componentDidMount() {
    this.randomTrack();
  }

  prepareUrl(url) {
    //Attach client id to stream url
    return `${url}?client_id=${this.client_id}`
  }

  xlArtwork(url){
    return url.replace(/large/, 't500x500');
  }

  togglePlay(){
    // Check current playing state
    if(this.state.playStatus === Sound.status.PLAYING){
      // Pause if playing
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      // Resume if paused
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }

  stop(){
    // Stop sound
   this.setState({playStatus: Sound.status.STOPPED});
  }

  forward(){
    this.setState({playFromPosition: this.state.playFromPosition+(1000*10)});
  }

  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-(1000*10)});
  }

  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item });
  }

  handleChange(event, value){
    // Update input box
    this.setState({autoCompleteValue: event.target.value});
    let _this = this;
    //Search for song with entered value
    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
      .then(function (response) {
        // Update track state
        _this.setState({tracks: response.data});
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  formatMilliseconds(milliseconds) {
     // minutes
     const ms_min = milliseconds % 3600000;
     const minutes = Math.floor(ms_min / 60000);

     // seconds
     const ms_seconds = ms_min % 60000;
     const seconds = Math.floor(ms_seconds / 1000);

     return (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;
  }

  handleSongPlaying(audio){
    localStorage.setItem("position",(audio.position / audio.duration))
    localStorage.setItem("elapsed_time",this.formatMilliseconds(audio.position))
     this.setState({  elapsed: this.formatMilliseconds(audio.position),
                      total: this.formatMilliseconds(audio.duration),
                      position: audio.position / audio.duration })
   }

  handleSongFinished () {
    this.randomTrack();
   }



  newWindow() {
    this.togglePlay();
    if (sessionStorage.status != "play") {                
      sessionStorage.status = "play";         
      var myWindow = window.open("", "popup", "width=150,height=200");
      myWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">');
      myWindow.document.write('<link href="https://fonts.googleapis.com/css?family=Exo+2:500" rel="stylesheet">');
      // myWindow.document.write('<link href="http://localhost/newplug/static/css/main.css" rel="stylesheet">');
      myWindow.document.write('<link href="https://s3.ap-south-1.amazonaws.com/musyfy/newplug-v01/static/css/main.css" rel="stylesheet">');
      myWindow.document.write("<p><div id='container'></div></p>");
      // myWindow.document.write('<script type="text/javascript" src="http://localhost/newplug/static/js/main.js"><\/script>');
      myWindow.document.write('<script type="text/javascript" src="http://s3.ap-south-1.amazonaws.com/musyfy/newplug-v01/static/js/main.js"><\/script>');
      
    }


    
  }

  randomTrack () {
    let _this = this;
    //Request for a playlist via Soundcloud using a client id
    Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
      .then(function (response) {
        // Store the length of the tracks
        const trackLength = response.data.tracks.length;
        // Pick a random number
        const randomNumber = 1;
        //Set the track state with a random track from the playlist
        _this.setState({track: response.data.tracks[randomNumber]});
      })
      .catch(function (err) {
        //If something goes wrong, let us know
        console.log(err);
      });
   }

  render () {
    const scotchStyle = {
      width: '500px',
      height: '500px',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),   url(${this.xlArtwork(this.state.track.artwork_url)})`
    }
    const player = {
      width: '100px',
      height: '100px'
    }
    return (
      <div>
      <div style={player}>
        
        <Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          openWindow={this.newWindow.bind(this)}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.randomTrack.bind(this)}
          backgroundImage = {this.state.track.artwork_url}
          />
          
        </div>
      </div>
    );
  }
}

export default App;
