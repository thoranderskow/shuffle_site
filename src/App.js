import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './firebase-config';
import shuffle from './shuffle'
import { search_hand } from './shuffle'
import { map_cards } from './shuffle'
import Image from './Image'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: [
        './0.png',
        './1.png',
        './2.png',
        './3.png',
        './4.png'
      ],
      total: 'Shuffle to find out!',
      total_matches: 'Shuffle to find out!'
   }; // <- set up react state
  }
  shuffleHand(e) {
    let _this = this;
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Create hand, just an array of integers */
    let arr = [1,2,3,4,5];
    /* look for match in database and push arr */
    search_hand(arr);
    let imgs = map_cards(arr);
    this.setState({hand: imgs});
    let matches_ref = fire.database().ref('total_matches');
    matches_ref.on('child_changed', function(snapshot) {
      let x = snapshot.val();
      _this.setState({total_matches: x});
    });
    let total_ref = fire.database().ref('totals');
    total_ref.once('value').then((dataSnapshot) => {
       let total_hands = dataSnapshot.val()['total_hands'];
       let total_matches = dataSnapshot.val()['total_matches'];
       this.setState({total: total_hands});
       this.setState({total_matches: total_matches});
     });
  }

  render() {
    return (
      <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style={{height: '10vh'}}>
              <h1 class="card-title" style={{color: 'white'}}>Shuffle-o</h1>
              Total Hands Shuffled: {this.state.total}
              Total Matches Found: {this.state.total_matches}
          </nav>
          <div id='show_cards'>
              {this.state.hand.map(image => (
                <Image source={image} key={image} />
              ))}
          </div>
          <form onSubmit={this.shuffleHand.bind(this)}>
              <input style={{borderRadius: '25px', width: '10%', outline: '0'}}value='Shuffle!' id='shuffle_cards' type="submit"/>
          </form>
          <div style={{marginLeft: '65%', width: '30%'}} class="card text-white bg-primary mb-3">
              <div className='card-header'>Did you know?</div>
              <p style={{margin: '2%'}}class="card-text">If you choose a hand of five cards from a standard deck, there are C(52, 5) combinations possible. C(52, 5) gives us a total of 2,598,960 different hands. This is what this website simulates. Press the 'shuffle' button to generate a random hand of 5 cards. Then the hand you generated will be attempted to match with all the other hands users have generated, stored in a database.</p>
          </div>
      </div>
    );
  }
}

export default App;
