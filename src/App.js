import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './firebase-config';
import shuffle from './shuffle'
import { search_hand } from './shuffle'

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
    search_hand([1,2,3,4,5]);
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
