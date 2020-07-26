import React, { Component } from "react";
import './App.css';
import ReactBlinkText from 'react-blink-text';

let min = 0;
export default class Timer extends Component {
  state = {
      minutes: 0,
      seconds: 25,
  }

  

  setTime (min) {
    if (Math.sign(min) !== 1 ) {return (this.componentWillUnmount())}
    this.setState({ minutes: min , seconds: 0});
    this.componentWillUnmount();
    this.componentDidMount(1000);
  }

  componentDidMount(rate) {
    const { minutes } = this.state
    min = minutes;
      this.myInterval = setInterval(() => {
          const { seconds, minutes } = this.state
          if (seconds > 0) {
              this.setState(({ seconds }) => ({
                  seconds: seconds - 1
              }))
          }
          if (seconds === 0) {
              if (minutes === 0) {
                  clearInterval(this.myInterval)
              } else {
                  this.setState(({ minutes }) => ({
                      minutes: minutes - 1,
                      seconds: 59
                  }))
              }
          } 
      }, rate)
    }



  componentWillUnmount() {
      clearInterval(this.myInterval)
  }

  

  renderSwitch() {
    const {seconds, minutes } = this.state
       if (seconds < 21 && seconds > 10 && minutes === 0) {
         return <h1 style={{color: 'red'}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>;
       }
       else if (seconds < 11 && minutes === 0) {
         return <ReactBlinkText color='red' fontSize='2em' fontWeight='bold' text={seconds < 10 ? `0:0${seconds}` : `0:${seconds}`} />;
       }
       else {
         return <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>;
       }
  
    }

    changeSpeed(rate) {
      this.componentWillUnmount();
      this.componentDidMount(rate)
    }

    displayText() {
      const {seconds, minutes } = this.state
      if ((minutes * 60) + seconds < (min * 60) / 2 && seconds + minutes !== 0) {
       return  <span>More than halfway there!</span>;
      }
      else if (min === 0 && seconds < 30 && seconds > 0) {
        return  <span>More than halfway there!</span>;
      }
      else if (seconds === 0 && minutes === 0) {
        return <span>Time's up!</span>;
      }
      else {
        return null;
      }
    }

  render() {
      return (
          <div>
            <div className="left">
            <span>Countdown:</span><input type="text" id="myText" placeholder="Minutes" />
            <button className="myButton" onClick={() => this.setTime(document.getElementById("myText").value)}>Start</button>
            <button className="myButton" onClick={() => this.componentWillUnmount()}>Pause</button>
            <button className="myButton" onClick={() => this.changeSpeed(1000)}>Resume</button>
            </div>
            <div className="center">
            <span id="top">{this.displayText()}</span>
            <span id="bottom">{this.renderSwitch()}</span>
            </div>
            <div className="right">
            <button className="myButton" onClick={() => this.changeSpeed(1000)}>1x</button>
            <button className="myButton" onClick={() => this.changeSpeed(750)}>1.5x</button>
            <button className="myButton" onClick={() => this.changeSpeed(100)}>2x</button>
            </div>
          </div>
      )
  }
}
