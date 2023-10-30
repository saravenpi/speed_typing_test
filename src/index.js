import chalk from 'chalk'
import readlineSync from 'readline-sync'
import fs from 'fs'
import hideCursor from 'hide-terminal-cursor'

const warning = chalk.hex("#FFA500")
const success = chalk.bold.green
const underline = chalk.underline

function loadWordList() {
  var wordList = [];
  try {
    const data = fs.readFileSync("wordlist_en.txt", "UTF-8");
    const words = data.split(/\r?\n/);

    words.forEach((word) => wordList.push(word));

    return wordList;
  } catch (error) {
    console.log(error);
  }
}

function getEndTime(startTime) {
  var endTime = performance.now();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var seconds = timeDiff;

  return seconds;
}

function displayArray(textArray) {
  var textToDisplay = "";

  for (var i = 0; i < textArray.length; i++) textToDisplay += textArray[i];
  console.log("\x1B[1A\x1B[K" + textToDisplay);
}

function generateTypingTest(wordList) {
  var typingTest = {
    textToType: "",
    displayText: [],
  };

  for (var i = 0; i < 15; i++)
    typingTest.textToType +=
      wordList[Math.floor(Math.random() * wordList.length)] + " ";
  typingTest.textToType +=
    wordList[Math.floor(Math.random() * wordList.length)];
  typingTest.displayText.push(underline(typingTest.textToType[0]));
  for (var i = 1; i < typingTest.textToType.length; i++)
    typingTest.displayText.push(typingTest.textToType[i]);

  return typingTest;
}

function speedTypingTest() {
  var wordList = loadWordList();
  var typingTest = generateTypingTest(wordList);
  var letterPosition = 0;
  var typedText = "";
  var startTime;
  var startedTyping = false;
  var key = "";

  hideCursor();
  console.log("\x1B[1A\x1B[KPress a key to start the timer");
  displayArray(typingTest.displayText);
  while (typedText != typingTest.textToType) {
    key = readlineSync.keyIn("", { hideEchoBack: true, mask: "" });
    if (!startedTyping) {
      startTime = performance.now()
      startedTyping = true;
    }
    if (typingTest.textToType[letterPosition] == key) {
      typingTest.displayText[letterPosition] = success(key);
      typedText += key;
      if (letterPosition < typingTest.textToType.length - 1) {
        letterPosition++;
        typingTest.displayText[letterPosition] = underline(
          typingTest.displayText[letterPosition]
        );
      }
    } else
      typingTest.displayText[letterPosition] = underline(
        warning(typingTest.textToType[letterPosition])
      );
    displayArray(typingTest.displayText);
  }
  var finalTime = getEndTime(startTime);
  console.log(warning("* TIME ELAPSED: ") + success(finalTime) + " seconds");
  console.log(
    warning("* WPM: ") +
      success(typingTest.textToType.length / 5 / (finalTime / 60))
  );
}

speedTypingTest();
