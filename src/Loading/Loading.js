import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loader">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
      </div>
    );
  }
}

export default Loading;
