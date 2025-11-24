// Get a random word from the JSON file
function getword () {
    const jsond = '{"words":["arbys","count","tart","sweet","pulse"]}'
    const json = JSON.parse(jsond)
    const jsonArray = json.words; // Make json into array
    const randomIndex = Math.floor(Math.random() * jsonArray.length); // Get a random index
    const randomWord = jsonArray[randomIndex]; // Get the random word
    // // Fix error that was happening sometimes (not 5 letters)
    if (randomWord.length != 5) {
        console.log('Retrying for 5 Letter')
        return getword(); // Retry if not 5 letters (will fetch json again but works fine)
           }
        return randomWord;
        };
// Function to check if character is in word
function checkAgainstWord(char, word) {
    if (!word) return false;
    return word.toLowerCase().includes(char);
}

function setHTMLletters (char, mainword, correctletters) {
    const collection = document.getElementsByClassName("letter");
    for (let x = 0; x < mainword.length; ) {
        if (char == mainword[x]) {
            collection[x].innerHTML = mainword[x];
        }
        x++;
    }
    return correctletters;
}

// Function to display character based on attempts left
function displayCharacter(attempts) {
    const elements = document.getElementById('figure');
    child = elements.children[attempts - 1];
    console.log(elements.children[attempts - 1]);
    child.setAttribute('style', 'display: inline;');
}
// Function to hide character
function hideChar(char) {
    const buttons = document.getElementsByTagName('button');
    console.log(buttons)
    for ( x in buttons ) {
        if (buttons[x].innerHTML.includes(char.toUpperCase())) {
            var element = buttons[x];
            console.log(element)
            break;
        }
    }
    element.setAttribute('style', 'visibility: hidden;');
}

// Sets the number of correct letters
function setCorrectLetters(correctletters, mainword) {
        const collection = document.getElementsByClassName("letter");
        for (let x = 0; x < mainword.length; ) {
                if (collection[x].innerHTML == mainword[x]) {
                    correctletters = correctletters + 1;
                }
                x++;
            }
    return correctletters;
}

// Handles any input
function handleInput(key, attempts, mainword) {
            if (attempts >= 6) {
                return attempts;
            }
            if (checkAgainstWord(key.toLowerCase(), mainword)) {
                correctletters = 0
                console.log('The letter', key, 'is in the word!')
                hideChar(key);
                setHTMLletters(key.toLowerCase(), mainword);
                correctletters = setCorrectLetters(correctletters, mainword);
                if (correctletters == 5) {
                    console.log("You Win!");
                    alert("Congratulations! You've guessed the word: " + mainword);
                    return attempts = 6; // End game
                }

                console.log("Correct Letters:", correctletters);
                return attempts;
            } else {
                attempts = attempts + 1
                console.log("lose one life", attempts);
                displayCharacter(attempts);
                hideChar(key);
                if (attempts == 6) {
                    console.log("Game Over");
                    alert("Game Over! The word was: " + mainword);
                    return attempts;
          }
             return attempts;
        }
}

// Start of everything
   word = getword()
   mainword = word;
   attemptlimit = 0
   correctletters = 0
   console.log(word)
   // Button input
   document.addEventListener('click', function(event) {
           if (event.target.tagName === 'BUTTON' || event.target.closest('BUTTON')) {
               const clickedButton = event.target.closest('BUTTON');
               attemptlimit, correctletters = handleInput(clickedButton.textContent, attemptlimit, mainword, correctletters);
               // console.log(correctletters)
          //     console.log(attemptlimit)
       }
   });
   // Key input
   document.addEventListener("keydown", (event) => {
       const keyName = event.key;
       // console.log(`Key pressed: ${keyName}`);
       attemptlimit = handleInput(keyName, attemptlimit, mainword, correctletters);
   });
