import fire from './firebase-config';

/* creates a random array representing a hand */
function shuffle() {
  let arr = Array.from(Array(52).keys())
  let retarr = [];
  /* following code ensures there are no duplicates */
  for (let i = 0; i < 5; i++) {
    let key = Math.floor(Math.random() * (52 - i));
    retarr.push(arr[key]);
    arr.splice(key, 1);
  }
  return retarr;
}

/* function that maps all numbers in an array to a png file */
/* returns an array of names of image files of cards */

/* function that takes an array and searches for it in the database */
/* returns 1 on found, and 0 on failure to find */
export function search_hand(hand) {
  let hands = fire.database().ref('hands');
  let totals = fire.database().ref('totals');
  let total_matches = fire.database().ref('total_matches');
  let flag = 0;
  const isMatch = (currentValue) => currentValue == 1;
  hands.once("value").then(function(snapshot) {
    snapshot.forEach(function(data) {
      let checkarr = data.val();
      let check = [0, 0, 0, 0, 0];
      for (let i = 0; i < 5; i++) {
        let temp = hand[i];
        for (let j = 0; j < 5; j++) {
          if (temp == checkarr[j]) {
            check[i] = 1;
          }
        }
      }
      /* if all numbers were matched */
      if (check.every(isMatch)) {
        flag = 1;
        let curr = data.val().count["matched"];
        let k = data.key;
        let update = {};
        curr += 1;
        update[k + '/count'] = {matched: curr};
        hands.update(update);
        total_matches.once('value').then(function(snapshot) {
          let x = snapshot.val()['matches'];
          total_matches.child('matches').set(x+1);
        })
        totals.once('value').then(function(snapshot) {
          let x = snapshot.val()['total_matches'];
          totals.child('total_matches').set(x+1);
        });
        alert('You got a match!');
        return 0;
      }
    });
    if (!flag) {
      hands.push(hand).child("count").set({matched: 0});
      totals.once('value').then(function(snapshot) {
        let x = snapshot.val()['total_hands'];
        totals.child('total_hands').set(x+1);
      })
    }
  });
}

/* function that turns array of ints into array of image names */
/* refers to images found in ./public/cards/ */
export function map_cards(arr) {
  let ret_arr = [];
  for (let i = 0; i < 5; i++) {
    ret_arr[i] = './' + arr[i].toString() + '.png';
  }
  return ret_arr;
}

export default shuffle;
