import ReactDOM from 'react-dom';
import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia, S3Upload } from '../AppUtils.jsx';
import Webcam from './Webcam.react.jsx';


const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class SoundIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false,
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false
    };

  this.requestUserMedia = this.requestUserMedia.bind(this);
  this.startRecord = this.startRecord.bind(this);
  this.stopRecord = this.stopRecord.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    console.log('requestUserMedia')
     captureUserMedia().then((stream) => {
      this.setState({src: window.URL.createObjectURL(stream) });
     }).catch((err) => console.log(err));

    // captureUserMedia((stream) => {
    //   this.setState({ src: window.URL.createObjectURL(stream) });
    //   console.log('setting state', this.state)
    // });
  }  

  startRecord() {
    captureUserMedia().then((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'audio'});
      this.state.recordVideo.startRecording();
    })


    // captureUserMedia((stream) => {
    //   this.state.recordVideo = RecordRTC(stream, { type: 'audio' });
    //   this.state.recordVideo.startRecording();
    // });

    // setTimeout(() => {
    //   this.stopRecord();
    // }, 4000);
  }

  stopRecord() {
    this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'audio',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }

      // this.setState({ uploading: true });

      S3Upload(params)
      .then((success) => {
        console.log('enter then statement')
        if(success) {
          console.log(success)
          this.setState({ uploadSuccess: true, uploading: false });
        }
      }, (error) => {
        alert(error, 'error occurred. check your aws settings and try again.')
      })
    });
  }

  playRecord() {
    var self = this;
    var superBuffer = new Blob(self.state.recordVideo.blob, { type: 'audio',
        bufferSize:  16384 
      });
    this.setState({url: window.URL.createObjectURL(superBuffer)});
  }


  handlePress() {
    this.setState({listening: !this.state.listening})
  }

  render() {
    var style = {            
      'backgroundColor': this.state.listening ? 'green': ''
    };

    return (
      <div>
        <div><Webcam src={this.state.src}/></div>
        <img style={style} onClick={this.startRecord} src="assets/soundIcon.png" />  
        <div><button onClick={this.stopRecord}>Stop Record</button></div>
        <div><button onClick={this.playRecord}>Play Record</button></div>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
      </div>
    )
  }
}

export default SoundIcon;