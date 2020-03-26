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

function check(element, arr) {
  for (let i = 0; i < arr.length(); i++){
    if (element == arr[i]) {
      return 1;
    }
  }
  return 0;
}

export default shuffle;
