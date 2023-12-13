import chalk from 'chalk'
import readlineSync from 'readline-sync'
import fs from 'fs'
import hideCursor from 'hide-terminal-cursor'

const warningStyle = chalk.hex("#FFA500")
const successStyle = chalk.bold.green
const underlineStyle = chalk.underline
const wordListPath = "wordlist_en.txt"

function loadWordList() {
	var wordList = [];
	try {
		const data = fs.readFileSync(wordListPath, "UTF-8");
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
	typingTest.displayText.push(underlineStyle(typingTest.textToType[0]));
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
			typingTest.displayText[letterPosition] = successStyle(key);
			typedText += key;
			if (letterPosition < typingTest.textToType.length - 1) {
				letterPosition++;
				typingTest.displayText[letterPosition] = underlineStyle(
					typingTest.displayText[letterPosition]
				);
			}
		} else
			typingTest.displayText[letterPosition] = underlineStyle(
				warningStyle(typingTest.textToType[letterPosition])
			);
		displayArray(typingTest.displayText);
	}
	var finalTime = getEndTime(startTime);
	console.log(warningStyle("* TIME ELAPSED: ") + successStyle(finalTime) + " seconds");
	console.log(
		warningStyle("* WPM: ") +
		successStyle(typingTest.textToType.length / 5 / (finalTime / 60))
	);
}

speedTypingTest();
