import chalk from 'chalk' 
import readlineSync from 'readline-sync'
import fs from 'fs'
import hideCursor from 'hide-terminal-cursor'
 

var wordList = []
try {
    const data = fs.readFileSync('wordlist_en.txt', 'UTF-8');

    const words = data.split(/\r?\n/);

    words.forEach((word) => {
      wordList.push(word)
    });

} catch (err) {
    console.error(err);
}

const warning = chalk.hex('#FFA500')
const success = chalk.bold.green
const underline = chalk.underline

var textToType = ''
var letterPosition = 0
var typedText = ''
var displayText = []
var startTime, endTime, key
var startedTyping = false

function start() {
  startTime = performance.now()
};

function end() {
  endTime = performance.now()
  var timeDiff = endTime - startTime
  timeDiff /= 1000
  var seconds = timeDiff
  return seconds
}

function displayArray(textArray){
  var textToDisplay = ''

  for (var i = 0; i < textArray.length; i++) {
    textToDisplay += textArray[i]
  }
  
  console.log('\x1B[1A\x1B[K' + textToDisplay)
}


for (var i = 0; i < 15; i++) {
  textToType += wordList[Math.floor(Math.random() * wordList.length)] + " "
}
textToType += wordList[Math.floor(Math.random() * wordList.length)]


displayText.push(underline(textToType[0]))
for (var i = 1; i < textToType.length; i++) {
  displayText.push(textToType[i])
}

hideCursor()

console.log("\x1B[1A\x1B[KPress a key to start the timer")
displayArray(displayText)


while (typedText != textToType) {
  key = readlineSync.keyIn('', {hideEchoBack: true, mask: ''})

  if (!startedTyping)
  {
    start()
    startedTyping = true
  }

  if (textToType[letterPosition] == key) {
    displayText[letterPosition] = success(key)
    typedText += key

    if (letterPosition < textToType.length - 1) {
      letterPosition++
      displayText[letterPosition] = underline(displayText[letterPosition])
    }
  }
  else {
      displayText[letterPosition] = underline(warning(textToType[letterPosition]))
  }

  displayArray(displayText)
}

var finalTime = end()

console.log(warning("* TIME ELAPSED: ") + success(finalTime) + " seconds")
console.log(warning("* WPM: ") + success((textToType.length / 5) / (finalTime / 60)))
