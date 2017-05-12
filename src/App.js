import React, { Component } from 'react';
import Instagram from './Instagram/Instagram';
import Modal from './Modal/Modal';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accounts: ['jdherder', 'herderfamilyadventure', 'kaitlynherder', 'jherder79'],
      modalOpen: false,
      modalImgData: {},
    };
  }

  render() {
    const modalClass = this.state.modalOpen ? 'open' : '';
    return (
      <div className="App">
        <Instagram accounts={this.state.accounts} showDetailModal={this.showDetailModal.bind(this)} />
        <Modal modalClass={modalClass} imgObj={this.state.modalImgData} closeDetailModal={this.closeDetailModal.bind(this)} />
      </div>
    );
  }

  showDetailModal(imgObj) {
    this.setState({
      modalOpen: true,
      modalImgData: imgObj
    });
  }

  closeDetailModal() {
    this.setState({
      modalOpen: false,
    });
  }
}

export default App;
