import React, { Component } from 'react';
import Bug from "./components/Bug";
import Wrapper from "./components/Wrapper";
import bugs from "./bugs.json";
import './App.css';

class App extends Component {
  state = {
    bugs,
    clickedBugs: [],
    score: 0,
    topScore: 0,
    start: "Click an Image to Begin!"
  }



  //when you click on a card ... the bug is taken out of the array
  imageClick = event => {

    const currentBug = event.target.alt;
    const BugAlreadyClicked =
      this.state.clickedBugs.indexOf(currentBug) > -1;

    //if you click on a bug that has already been selected, the game is reset and cards reordered
    if (BugAlreadyClicked) {
      this.setState({
        bugs: this.state.bugs.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedBugs: [],
        score: 0,
        start: "You guessed Incorrectly :("
      });

      //if you click on an available bug, your score is increased and cards reordered
    } else {
      const newScore = this.state.score + 1;
      this.setState({
        score: newScore,
      });
      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }
      this.setState(
        {
          bugs: this.state.bugs.sort(function () {
            return 0.5 - Math.random();
          }),
          clickedBugs: this.state.clickedBugs.concat(
            currentBug
          ),
          score: this.state.score + 1,
          start: "You guessed Correctly!"
        },
        //if you get all 12 bugs correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              bugs: this.state.bugs.sort(function () {
                return 0.5 - Math.random();
              }),
              clickedBugs: [],
              score: 0
            });
          }
        }
      );
    }
  };



  render() {
    return (
      <>
        {console.log(this.state.bugs)}
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <p className="nav-link"><span>{this.state.start}</span></p>
          </li>
          <li className="nav-item">
            <p className="nav-link">Score: {this.state.score}</p>
          </li>
          <li className="nav-item">
            <p className="nav-link">Top Score: {this.state.topScore}</p>
          </li>
        </ul>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center">Clicky Game!</h1>
            <p className="lead text-center">Click on an image to earn points, but don't click on any more than once!</p>
          </div>
        </div>
        <Wrapper>
          {this.state.bugs.map(bug => (
            <Bug
              key={bug.id}
              id={bug.id}
              image={bug.image}
              imageClick={this.imageClick}
              handleIncrement={this.handleIncrement}
            />
          ))}
        </Wrapper>
      </>
    );
  }
}

export default App;
