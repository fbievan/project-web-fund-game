
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
        x++; 
    }
}

// Function to display character based on attempts left 
function displayCharacter(attempts) {
    const elements = document.getElementById('figure');
    child = elements.children[attempts - 1];
    console.log(elements.children[attempts - 1]);
    child.setAttribute('style', 'display: inline;');
}

// Handles any input
function handleInput(key, attempts, mainword) {
            if (checkAgainstWord(key.toLowerCase(), mainword)) {
                console.log('The letter', key, 'is in the word!')
                setHTMLletters(key.toLowerCase(), mainword);
                return attempts;
            } else {
                attempts = attempts + 1
                console.log("lose one life", attempts);
                displayCharacter(attempts);
                if (attempts == 6) {
                    console.log("Game Over");
                    alert("Game Over! The word was: " + mainword);
                    return attempts;
          }
             return attempts;
        } 
}

// Start of everything
getword().then(function(word) {
    mainword = word;
    attemptlimit = 0
    // Button input
    document.addEventListener('click', function(event) {
        if (attemptlimit < 6 ) {
            if (event.target.tagName === 'BUTTON' || event.target.closest('BUTTON')) {
                const clickedButton = event.target.closest('BUTTON');
                attemptlimit = handleInput(clickedButton.textContent, attemptlimit, mainword);
                console.log(attemptlimit)
            }
        }
    });
    // Key input    
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        const keyCode = event.keyCode; 
        console.log(`Key pressed: ${keyName}, Key Code: ${keyCode}`);
        attemptlimit = handleInput(keyName, attemptlimit, mainword);
    });
});

