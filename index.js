
// Get a random word from the JSON file
function getword () {
    fetch('/words.json', { 
  method: 'GET'
})
    // Return the promise so callers can receive the random word
    return fetch('/words.json', { method: 'GET' })
        .then(function(response) { return response.json(); })
        .then(function(json) {
            const jsonArray = json.words; // Make json into array
            const randomIndex = Math.floor(Math.random() * jsonArray.length); // Get a random index
            const randomWord = jsonArray[randomIndex]; // Get the random word
            return randomWord;
        });
}
// Function to check if character is in word
function checkAgainstWord(char, word) {
    if (!word) return false;
    return word.toLowerCase().includes(char);
}


// Start of everything
getword().then(function(word) {
    mainword = word;
    console.log(checkAgainstWord('t', mainword));
    console.log(mainword);
    return mainword
});

