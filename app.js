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

const cursor = document.getElementById("cursor");
        const amount = 20;
        const sineDots = Math.floor(amount * 0.3);
        const width = 26;
        const idleTimeout = 150;
        let lastFrame = 0;
        let mousePosition = { x: 0, y: 0 };
        let dots = [];
        let timeoutID;
        let idle = false;

        let hoverTL;

        class Dot {
            constructor(index = 0) {
                this.index = index;
                this.anglespeed = 0.05;
                this.x = 0;
                this.y = 0;
                this.scale = 1 - 0.05 * index;
                this.range = width / 2 - (width / 2) * this.scale + 2;
                this.limit = width * 0.75 * this.scale;
                this.element = document.createElement("span");
                TweenMax.set(this.element, { scale: this.scale });
                cursor.appendChild(this.element);
            }

            lock() {
                this.lockX = this.x;
                this.lockY = this.y;
                this.angleX = Math.PI * 2 * Math.random();
                this.angleY = Math.PI * 2 * Math.random();
            }

            draw(delta) {
                if (!idle || this.index <= sineDots) {
                    TweenMax.set(this.element, { x: this.x, y: this.y });
                } else {
                    this.angleX += this.anglespeed;
                    this.angleY += this.anglespeed;
                    this.y = this.lockY + Math.sin(this.angleY) * this.range;
                    this.x = this.lockX + Math.sin(this.angleX) * this.range;
                    TweenMax.set(this.element, { x: this.x, y: this.y });
                }
            }
        }

        class Circle {
            constructor(id) {
                const el = document.getElementById(id);
                const parent = el.parentElement;
                parent.removeChild(el);
                const chars = el.innerText.split("");
                chars.push(" ");
                for (let i = 0; i < chars.length; i++) {
                    const span = document.createElement("span");
                    span.innerText = chars[i];
                    span.className = `char${i + 1}`;
                    parent.appendChild(span);
                }
            }
        }

        function init() {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove);

            // eslint-disable-next-line no-new
            new Circle("circle-content");
            lastFrame += new Date();
            buildDots();
            render();
        }

        /*function limit(value, min, max) {
            return Math.min(Math.max(min, value), max);
        }*/

        function startIdleTimer() {
            timeoutID = setTimeout(goInactive, idleTimeout);
            idle = false;
        }

        function resetIdleTimer() {
            clearTimeout(timeoutID);
            startIdleTimer();
        }

        function goInactive() {
            idle = true;
            for (let dot of dots) {
                dot.lock();
            }
        }

        function buildDots() {
            for (let i = 0; i < amount; i++) {
                let dot = new Dot(i);
                dots.push(dot);
            }
        }

        const onMouseMove = (event) => {
            mousePosition.x = event.clientX - width / 2;
            mousePosition.y = event.clientY - width / 2;
            resetIdleTimer();
        };

        const onTouchMove = () => {
            mousePosition.x = event.touches[0].clientX - width / 2;
            mousePosition.y = event.touches[0].clientY - width / 2;
            resetIdleTimer();
        };

        const render = (timestamp) => {
            const delta = timestamp - lastFrame;
            positionCursor(delta);
            lastFrame = timestamp;
            requestAnimationFrame(render);
        };

        const positionCursor = (delta) => {
            let x = mousePosition.x;
            let y = mousePosition.y;
            dots.forEach((dot, index, dots) => {
                let nextDot = dots[index + 1] || dots[0];
                dot.x = x;
                dot.y = y;
                dot.draw(delta);
                if (!idle || index <= sineDots) {
                    const dx = (nextDot.x - dot.x) * 0.35;
                    const dy = (nextDot.y - dot.y) * 0.35;
                    x += dx;
                    y += dy;
                }
            });
        };

        init();