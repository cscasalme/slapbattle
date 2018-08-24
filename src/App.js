import React, { Component } from 'react';
import Applicant from "./Applicant";
import Form from "./Form";

import logo from './hand-white.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    const candidates = [
      ["Name","Health","Damage"],
      ["Tom Cruise",136,6],
      ["Sponge Bob",110,4],
      ["James Earl Jones",175,8],
      ["Bob Barker",112,2],
      ["Tonya Harding",108,7],
      ["Charles Barkley",220,12],
      ["Peter Piper",116,4],
      ["Harry Potter",96,16],
      ["Shamu",280,24],
      ["Bill Gates",124,6],
    ];

    var applicantsArr = [];
    for (var i = 1; i < candidates.length; i++) {
      const c = candidates[i];
      applicantsArr.push(new Applicant({name:c[0], health:c[1], damage:c[2]}))
    }

    this.state = {
      applicants: applicantsArr,
      winners: [],
    };

    this.addApplicant = this.addApplicant.bind(this);
    this.clearApplicants = this.clearApplicants.bind(this);
    this.findWinners = this.findWinners.bind(this);
  }

  addApplicant(n, h, d) {
    this.setState({
      applicants: this.state.applicants.concat(new Applicant({name:n, health:h, damage:d})),
      winners: [],
    });
  }

  clearApplicants() {
    this.setState({
      applicants: [],
      winners: [],
    });
  }

  findWinners() {
    let winsDic = {};
    // Initialize Dictionary
    for (let i = 0; i < this.state.applicants.length; i++) {
      const candidate = this.state.applicants[i];
      winsDic[candidate.props.name] = 0;
    }

    const rand = Math.random() * 2;

    // Populate winsDic with number of wins that each candidate has gotten
    for (let i = 0; i < this.state.applicants.length; i++) {
      for (let j = i+1; j < this.state.applicants.length; j++) {
        if (i !== j) {
          const candidateA = this.state.applicants[i];
          const candidateB = this.state.applicants[j];

          // Check how many rounds each candidate survives
          // Candidate who would potentially last more rounds wins
          const roundsA = candidateA.props.health/candidateB.props.damage;
          const roundsB = candidateB.props.health/candidateA.props.damage;

          if (roundsA > roundsB) {
            winsDic[candidateA.props.name] += 1
          } else if (roundsB > roundsA) {
            winsDic[candidateB.props.name] += 1
          } else {
            if (rand >= 1) {
              winsDic[candidateA.props.name] += 1
            } else {
              winsDic[candidateB.props.name] += 1
            }
          }
        }
      }
    }

    var newWinners = [];

    for (var key in winsDic) {
      newWinners.push([ key, winsDic[key] ])
    }

    newWinners.sort(function compare(a, b) {
      return b[1] - a[1];
    })

    this.setState({
      applicants: this.state.applicants,
      winners: newWinners,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Slap Battle!</h1>
        </header>
        <div className="Form">
          <Form onSubmit={this.addApplicant}/>
        </div>
        <div className="Buttons">
          <button className={"clear"} onClick={this.clearApplicants}>Clear Applicants</button>
          <button className={"battle"} onClick={this.findWinners}>Start Battle</button>
        </div>
        <div className="Lists">
          <div className="Applicants">
            <h1>{"Applicants"}</h1>
            {this.state.applicants.map((applicant) => (
              <div key={applicant.props.name} className="Applicant">
                <Applicant name={applicant.props.name}
                  health={applicant.props.health}
                  damage={applicant.props.damage}/>
              </div>
            ))}
          </div>
          <div className="Winners">
            <h1>{"Winners"}</h1>
            {this.state.winners.map((winner) => (
              <h4>{winner[0]}</h4>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
