import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './firebase-config';
import shuffle from './shuffle'
import check from './shuffle'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: [] }; // <- set up react state
  }
  shuffleHand(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Create hand, just an array of integers */
    let arr = shuffle();
    this.state.hand = arr;
    let hands = fire.database().ref('hands');
    let flag = 0;
    const isMatch = (currentValue) => currentValue == 1;
    hands.once("value").then(function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("NEW DATA");
        let checkarr = data.val();
        let check = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
          let temp = arr[i];
          console.log("temp is" + temp)
          for (let j = 0; j < 5; j++) {
            console.log("inner loop" + temp, checkarr[j]);
            if (temp == checkarr[j]) {
              console.log("match found" + temp, checkarr[j]);
              check[i] = 1;
              console.log("check array after match is" + check)
            }
          }
        }
        /* if all numbers were matched */
        if (check.every(isMatch)) {
          console.log("Match!");
        } else { /* push hand to database */
          hands.push(arr);
        }
      });
    });
  }
  render() {
    return (
      <form onSubmit={this.shuffleHand.bind(this)}>
        <input type="submit"/>
      </form>
    );
  }
}

export default App;
