import React, { Component } from 'react';

import './Applicant.css';

class Applicant extends Component {

  render() {
    return (
      <div className="Applicant">
      <h4>{this.props.name + ", " + this.props.health + ", " + this.props.damage}</h4>
      </div>
    );
  }
}
export default Applicant;
