shuffle = function (array) {

  let shuffledArray = [];
    for (let i = 0; i < array.length; i++) {
      // Math.floor(Math.random() * (array.length - 1))
      let counter = 0;
      let shuffledValue = Math.floor(Math.random() * (array.length));

      if (shuffledArray[shuffledValue] === undefined) {

        shuffledArray[shuffledValue] = array[i];

      } else if (shuffledArray[shuffledValue] !== undefined) {

        shuffledValue = Math.floor(Math.random() * (array.length));

        let loop = true;

        while (loop) {

          shuffledValue = Math.floor(Math.random() * (array.length));

          if (shuffledArray[shuffledValue] === undefined) {

            console.log("found unfilled index: " + shuffledArray[shuffledValue])
            console.log("index location is: " + shuffledValue);

            shuffledArray[shuffledValue] = array[i];

            loop = false;
          }

        }

      }
    }
    return shuffledArray;

}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));