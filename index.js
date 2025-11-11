
// Get a random word from the JSON file
function getword () {
    // Return the promise so callers can receive the random word
    return fetch('/words.json', { method: 'GET' })
        .then(function(response) { return response.json(); })
        .then(function(json) {
            const jsonArray = json.words; // Make json into array
            const randomIndex = Math.floor(Math.random() * jsonArray.length); // Get a random index
            const randomWord = jsonArray[randomIndex]; // Get the random word
            // Fix error that was happening sometimes (not 5 letters)
            if (randomWord.length != 5) {
                console.log('Retrying for 5 Letter')
                console.log(randomWord);
                return getword(); // Retry if not 5 letters
            }
            return randomWord;
        });
}
// Function to check if character is in word
function checkAgainstWord(char, word) {
    if (!word) return false;
    return word.toLowerCase().includes(char);
}

function setHTMLletters (char, mainword) {
    const collection = document.getElementsByClassName("letter"); 
    for (let x = 0; x < mainword.length; ) {
        if (char == mainword[x]) {
            collection[x].innerHTML = mainword[x];        } 
        console.log(mainword[x]);
        x++; 
    }
}

// Function to display character based on attempts left 
// FIX LATER
function displayCharacter(attemptsLeft) {
    const elements = document.getElementsByClassName('figure');
    // 'elements' is now an HTMLCollection, which is array-like.
    // You can iterate over it using a for loop or convert it to an array.
    console.log(elements)
}

// Start of everything
getword().then(function(word) {
    mainword = word;
    console.log(checkAgainstWord('', mainword));
    console.log(mainword);
    attemptlimit = 0

    document.addEventListener('click', function(event) {
        if (attemptlimit < 6 ) {
            if (event.target.tagName === 'BUTTON' || event.target.closest('BUTTON')) {
           const clickedButton = event.target.closest('BUTTON');
            console.log('Button pressed:', clickedButton);
            console.log('Button text:', clickedButton.textContent);
            if (checkAgainstWord(clickedButton.textContent.toLowerCase(), mainword)) {
                console.log('The letter', clickedButton.textContent, 'is in the word!')
                setHTMLletters(clickedButton.textContent.toLowerCase(), mainword);
            } else {
                attemptlimit = attemptlimit + 1
                console.log("lose one life", attemptlimit);
                displayCharacter(attemptlimit);
                if (attemptlimit == 6) {
                    console.log("Game Over");
          }
            } 

        }
    }
    });
});

