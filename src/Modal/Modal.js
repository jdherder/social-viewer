import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  render() {
    const imgObj = this.props.imgObj;
    const caption = imgObj.caption || {};
    const date = imgObj.date || {};
    return (
      <div className={`modal ${this.props.modalClass}`}>
        <div className="close" onClick={this.props.closeDetailModal}>CLOSE</div>
        <img className="full-image" src={imgObj.imgUrl} alt={caption} />
        <div className="caption">{`${date.month}/${date.day}/${date.year}`} - {caption.text}</div>
      </div>
    );
  }
}

export default Modal;
