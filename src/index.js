import chalk from 'chalk' 
import readlineSync from 'readline-sync'

const error = chalk.bold.red
const warning = chalk.hex('#FFA500')
const success = chalk.bold.green

const textsToType = ['hello this is a test', 'je mange de la salade', "j'aime les gens, c'est cool", 'je suis un poisson', "vers l'infini et l'au dela", "je vis dans l'ocean", "j'aime les algues"]  
let key
var letterPosition = 0
const textToType = textsToType[Math.floor(Math.random() * textsToType.length)];
var typedText = ''
var displayText = []
var startTime, endTime
var startedTyping = false;
var errorLine = []

for (var i = 0; i < textToType.length; i++)
{
  errorLine.push(' ')
}
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

for (var i = 0; i < textToType.length; i++) {
  displayText.push(textToType[i])
}

console.log('\x1B[1A\x1B[K' + textToType)

while (typedText != textToType) {
  
  key = readlineSync.keyIn('',
    {hideEchoBack: true, mask: ''});

  if (!startedTyping)
  {
    start()
    startedTyping = true
  }
  if (textToType[letterPosition] == key) {
    displayText[letterPosition] = success(key)
    typedText += key
    letterPosition++
  }
  else {
      displayText[letterPosition] = warning(textToType[letterPosition])
  }

  displayArray(displayText)
}


var finalTime = end()
console.log("TIME ELAPSED: " + warning(finalTime) + "s")
console.log(success(Math.round(textToType.length/5)/(finalTime/60) + warning(" WPM")))
console.log(success("WELL DONE !"))