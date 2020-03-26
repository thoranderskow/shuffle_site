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

/* function that takes an array and searches for it in the database */
/* returns 1 on found, and 0 on failure to find */
export function search_hand(hand) {
  let hands = fire.database().ref('hands');
  let flag = 0;
  const isMatch = (currentValue) => currentValue == 1;
  hands.once("value").then(function(snapshot) {
    snapshot.forEach(function(data) {
      console.log("NEW DATA");
      let checkarr = data.val();
      let check = [0, 0, 0, 0, 0];
      for (let i = 0; i < 5; i++) {
        let temp = hand[i];
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
        flag = 1;
        console.log("Match!");
        let curr = data.val().count["matched"];
        let k = data.key;
        let update = {};
        curr += 1;
        update[k + '/count'] = {matched: curr};
        hands.update(update);
        return 1;
      }
    });
    if (!flag) {
      hands.push(hand).child("count").set({matched: 0});
      return 0;
    }
  });
}

export default shuffle;
