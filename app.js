console.log ("Hello people");

// random characters


$(document).ready(documentReady);

function documentReady() {

    var characterCollection = ["A", "a", "1", "2", "3", "b", "c", "d", "B", "4", "5", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    var currentText = $(".effect-text-container p").text();

    var currentTextCollection = new Array();

    var characterCount = 0;

    var characterSpeed = 90;

    pushCurrentTextChrachters();

    function pushCurrentTextChrachters() {

        for (var i = 0; i < currentText.length; i++) {

            var currentCharacter = currentText.slice(i, i + 1);

            currentTextCollection.push(currentCharacter);

        }

    }

    var characterCountIncreaseInterval = setInterval(characterCountIncrease, characterSpeed);

    function characterCountIncrease() {

        if (characterCount == currentTextCollection.length) {

            clearInterval(characterCountIncreaseInterval);

            clearInterval(setRandomTextInterval);

        }

        characterCount++;

    }

    function getRandomText() {

        var result = "";

        if (characterCount == 0) {

            for (var i = 0; i < currentTextCollection.length; i++) {

                var randomCharacter = characterCollection[Math.floor(Math.random() * characterCollection.length)];

                result += randomCharacter;

            }

        }
        else {

            result = currentText.slice(0, characterCount);

            for (var i = 0; i < currentTextCollection.length - characterCount; i++) {

                var randomCharacter = characterCollection[Math.floor(Math.random() * characterCollection.length)];

                result += randomCharacter;

            }

        }

        return result;

    }

    var setRandomTextInterval = setInterval(setRandomText, 50);

    function setRandomText() {

        console.log(getRandomText());

        $(".effect-text-container p").text(getRandomText());
        var elements = $(".effect-text-container p").text(getRandomText());
    }


    Array.prototype.forEach.call(elements, function (el) {

        documentReady.init();
        el.addEventListener('mouseover', function () {
            documentReady.init();
        });
    });
}


// blob cursor
