import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      damage: 0,
      health: 0,
      name: "",
    };

    this.handleDamageChange = this.handleDamageChange.bind(this);
    this.handleHealthChange = this.handleHealthChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleNameChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      damage: this.state.damage,
      health: this.state.health,
      name: target.value,
    });
  }

  handleHealthChange(event) {
    event.preventDefault();
    const target = event.target;

    this.setState({
      damage: this.state.damage,
      health: target.value,
      name: this.state.name,
    });
  }

  handleDamageChange(event) {
    event.preventDefault();
    const target = event.target;

    this.setState({
      damage: target.value,
      health: this.state.health,
      name: this.state.name,
    });
  }

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.health, this.state.damage);
  }

  render() {
    return (
      <form>
        <label>
          Name:
          <input
            name="Name"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange} />
        </label>
        <br />
        <label>
          Health:
          <input
            name="Health"
            type="number"
            value={this.state.health}
            onChange={this.handleHealthChange} />
        </label>
        <br />
        <label>
          Damage:
          <input
            name="Damage"
            type="number"
            value={this.state.damage}
            onChange={this.handleDamageChange} />
        </label>
        <div className="Button">
          <button className={"submit"} onClick={this.submit}>Add Applicant</button>
        </div>
      </form>
    );
  }

}
export default Form;
