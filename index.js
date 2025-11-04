const fs = require('fs'); // Import the File System module

// Get a random word from the JSON file
function getword () {
    const filePath = './words.json'; // Replace with the actual path to your file
    const fileData = fs.readFileSync(filePath, 'utf8'); // Read the file content synchronously
    const jsonArray = JSON.parse(fileData).words; // Parse the JSON string into a JavaScript array
    const randomIndex = Math.floor(Math.random() * jsonArray.length);
    console.log(jsonArray.length);
    const randomWord = jsonArray[randomIndex]; // Get the random word
    return(randomWord);
}

const mainword = getword();

console.log(mainword);
