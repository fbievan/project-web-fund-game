const fs = require('fs'); // Import the File System module

// Get a random word from the JSON file
function getword () {
    const filePath = './words.json'; 
    const fileData = fs.readFileSync(filePath, 'utf8'); // Read the file 
    const jsonArray = JSON.parse(fileData).words; // Make json into array
    const randomIndex = Math.floor(Math.random() * jsonArray.length); // Get a random index
    console.log(jsonArray.length);
    const randomWord = jsonArray[randomIndex]; // Get the random word
    return(randomWord);
}
// Function to check if character is in word
function checkAgainstWord(char, word) {
    return(mainword.toLowerCase().includes(char));
}


const mainword = getword();

console.log(checkAgainstWord('t', mainword));

console.log(mainword);
