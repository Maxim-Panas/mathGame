let words = [
    { word: "піраміда", fact: "Піраміди будувалися як гробниці для фараонів Стародавнього Єгипту." },
    { word: "сонце", fact: "Сонце – це зірка, яка знаходиться в центрі нашої Сонячної системи." },
    { word: "місяць", fact: "Місяць – єдиний природний супутник Землі." },
    { word: "океан", fact: "Світовий океан займає близько 71% поверхні Землі." },
    { word: "гравітація", fact: "Гравітація на Місяці приблизно в 6 разів слабша, ніж на Землі." },
    { word: "кактус", fact: "Колючки кактуса – це його видозмінене листя, яке допомагає зберігати вологу." },
    { word: "джунглі", fact: "Амазонські джунглі виробляють понад 20% кисню на Землі." },
    { word: "корабель", fact: "Найбільший корабель у світі – супертанкер Knock Nevis, довший за Ейфелеву вежу." },
    { word: "каміння", fact: "Вік найстарішого знайденого каменю на Землі – понад 4 мільярди років." },
    { word: "електрика", fact: "Мозок людини виробляє достатньо електрики, щоб запалити маленьку лампочку." },
    { word: "магніт", fact: "Земля діє як величезний магніт із власним магнітним полем." },
    { word: "вулкан", fact: "Вулкан Олімп на Марсі – найбільший вулкан у Сонячній системі, він утричі вищий за Еверест." },
    { word: "корабель", fact: "Перший у світі підводний човен був винайдений у 1620 році." },
    { word: "бібліотека", fact: "Найбільша бібліотека світу – Бібліотека Конгресу США, що містить понад 170 мільйонів книг." },
    { word: "метелик", fact: "Метелик-монарх може пролітати до 4800 км під час міграції." },
    { word: "пустеля", fact: "Антарктида – найбільша пустеля у світі, хоч вона і вкрита льодом." },
    { word: "гейзер", fact: "Гейзер Строккур в Ісландії вивергається кожні 5-10 хвилин." },
    { word: "алмаз", fact: "На Юпітері та Сатурні можуть йти дощі з алмазів." },
    { word: "спрут", fact: "Спрути мають три серця та синю кров." },
    { word: "міраж", fact: "Міражі виникають через заломлення світла в шарах повітря різної температури." },
    { word: "павук", fact: "Павутина міцніша за сталь такої ж товщини." },
    { word: "вітер", fact: "Найшвидший вітер у Сонячній системі зафіксовано на Нептуні – понад 2000 км/год." },
    { word: "льодовик", fact: "Льодовики зберігають 75% всієї прісної води на Землі." },
    { word: "соняшник", fact: "Соняшники можуть очищати ґрунт від радіації та токсинів." },
    { word: "електрон", fact: "Електрон обертається навколо ядра атома зі швидкістю, близькою до швидкості світла." },
    { word: "камера", fact: "Перша фотографія у світі була зроблена у 1826 році й експонувалася 8 годин." },
    { word: "картина", fact: "Найдорожча картина у світі – 'Спаситель світу' да Вінчі, продана за 450 млн доларів." },
    { word: "музика", fact: "Класична музика може стимулювати розвиток мозку у немовлят." },
    { word: "молоко", fact: "Кити годують своїх дитинчат молоком, яке за густотою нагадує зубну пасту." },
    { word: "слон", fact: "Слони можуть впізнавати себе у дзеркалі, що рідкість серед тварин." },
    { word: "глобус", fact: "Найстаріший глобус у світі був зроблений у 1492 році." },
    { word: "вогонь", fact: "Вогонь не може горіти у космосі через відсутність кисню." },
    { word: "лазер", fact: "Найпотужніший лазер у світі може створювати температуру, вищу за центр Сонця." },
    { word: "вірус", fact: "Деякі віруси можуть виживати в екстремальних умовах, навіть у космосі." },
    { word: "екосистема", fact: "Тропічні ліси займають лише 6% Землі, але містять понад 50% усіх видів живих організмів." },
    { word: "телескоп", fact: "Телескоп Джеймса Вебба може бачити галактики, які утворилися понад 13 мільярдів років тому." },
    { word: "бджола", fact: "Бджоли можуть запам’ятовувати обличчя людей." },
    { word: "кава", fact: "Кава – другий за популярністю напій у світі після води." },
    { word: "корал", fact: "Коралові рифи – це живі організми, які можуть жити тисячі років." },
    { word: "чорна діра", fact: "Чорні діри викривляють простір і час настільки, що світло не може вирватися з них." },
    { word: "парфум", fact: "Найдорожчий парфум у світі коштує понад 1 млн доларів за пляшку." },
    { word: "штучний інтелект", fact: "Штучний інтелект вже навчився створювати мистецтво, писати книги та керувати автомобілями." },
    { word: "супутник", fact: "На орбіті Землі знаходиться понад 6000 супутників." },
    { word: "гейзер", fact: "Вода у гейзерах може досягати температури понад 200°C." },
    { word: "пінгвін", fact: "Пінгвіни можуть затримувати дихання до 20 хвилин під водою." },
    { word: "тесла", fact: "Нікола Тесла передбачив появу смартфонів ще у 1926 році." }
    // Додай ще більше слів, якщо потрібно
];


let usedWords = [];
let currentWordData = {};
let currentWord = "";
let shuffledLetters = [];
let score = localStorage.getItem("score") || 0;
let allFacts = JSON.parse(localStorage.getItem("allFacts")) || [];

document.getElementById("score").textContent = "Відгадані слова: " + score;
document.getElementById("view-facts-btn").addEventListener("click", viewFacts);
document.getElementById("view-facts-btn").style.display = allFacts.length ? "block" : "none";
document.getElementById("popup").classList.add("hidden");

generateNewWord();

function generateNewWord() {
    let unusedWords = words.filter(word => !usedWords.includes(word.word));
    if (unusedWords.length === 0) {
        usedWords = [];
        unusedWords = words;
    }
    currentWordData = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    currentWord = currentWordData.word;
    shuffledLetters = shuffleArray(currentWord.split(""));

    usedWords.push(currentWord);
    renderWordCells();
    renderLetterCells();
}

function renderWordCells() {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    currentWord.split("").forEach((_, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);
        cell.addEventListener("dragover", allowDrop);
        cell.addEventListener("drop", drop);
        wordContainer.appendChild(cell);
    });
}

function renderLetterCells() {
    const lettersContainer = document.getElementById("letters-container");
    lettersContainer.innerHTML = "";
    shuffledLetters.forEach(letter => {
        let letterElement = document.createElement("div");
        letterElement.classList.add("letter");
        letterElement.textContent = letter;
        letterElement.draggable = true;
        letterElement.addEventListener("dragstart", dragStart);

        // Додаємо сенсорні події для мобільних пристроїв
        letterElement.addEventListener("touchstart", handleTouchStart, false);
        letterElement.addEventListener("touchmove", handleTouchMove, false);
        letterElement.addEventListener("touchend", handleTouchEnd, false);

        lettersContainer.appendChild(letterElement);
    });
}

// Події для миші
let draggedLetter = null;

function dragStart(event) {
    draggedLetter = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let targetIndex = event.target.getAttribute("data-index");

    if (!event.target.textContent && draggedLetter) {
        let correctLetter = currentWord[targetIndex]; // Отримуємо правильну літеру

        if (draggedLetter.textContent === correctLetter) { // Перевіряємо відповідність
            event.target.textContent = draggedLetter.textContent;
            draggedLetter.remove();
            checkWordCompletion();
        } else {
            // Візуальний ефект для неправильної букви
            draggedLetter.style.backgroundColor = "red";
            setTimeout(() => {
                draggedLetter.style.backgroundColor = "blue";
            }, 500);
        }
    }
}


let originalX, originalY;

function handleTouchStart(e) {
    draggedLetter = e.target;
    draggedLetter.style.position = 'absolute';
    draggedLetter.style.zIndex = '1000';

    let touch = e.touches[0];
    let rect = draggedLetter.getBoundingClientRect();
    originalX = rect.left;
    originalY = rect.top;

    draggedLetter.offsetX = touch.clientX - rect.left;
    draggedLetter.offsetY = touch.clientY - rect.top;
}

function handleTouchMove(e) {
    e.preventDefault(); 
    if (draggedLetter) {
        let touch = e.touches[0];
        let x = touch.clientX - draggedLetter.offsetX;
        let y = touch.clientY - draggedLetter.offsetY;
        draggedLetter.style.left = `${x}px`;
        draggedLetter.style.top = `${y}px`;
    }
}

function handleTouchEnd(e) {
    if (!draggedLetter) return;
    let touch = e.changedTouches[0];

    // Знаходимо елемент під пальцем
    draggedLetter.style.display = 'none'; 
    let dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    draggedLetter.style.display = 'block';

    if (dropTarget && dropTarget.classList.contains("cell") && !dropTarget.textContent) {
        let targetIndex = dropTarget.getAttribute("data-index");
        let correctLetter = currentWord[targetIndex];

        if (draggedLetter.textContent === correctLetter) {
            dropTarget.textContent = draggedLetter.textContent;
            draggedLetter.remove();
            checkWordCompletion();
        } else {
            returnToOriginalPosition();
        }
    } else {
        returnToOriginalPosition();
    }
    draggedLetter = null;
}

// Функція для повернення літери, якщо вона не встала
function returnToOriginalPosition() {
    draggedLetter.style.left = `${originalX}px`;
    draggedLetter.style.top = `${originalY}px`;
    draggedLetter.style.position = '';
    draggedLetter.style.zIndex = '';
}

// Додаємо обробники подій до літер після їх створення
function addTouchEvents() {
    document.querySelectorAll(".letter").forEach(letter => {
        letter.addEventListener("touchstart", handleTouchStart);
        letter.addEventListener("touchmove", handleTouchMove);
        letter.addEventListener("touchend", handleTouchEnd);
    });
}

// Викликаємо після створення нових літер
renderLetterCells();
addTouchEvents();


// Функція для повернення букви на місце, якщо вона вставлена неправильно
function resetDraggedLetter() {
    draggedLetter.style.position = '';
    draggedLetter.style.left = '';
    draggedLetter.style.top = '';
    draggedLetter.style.zIndex = '';
    draggedLetter.style.backgroundColor = "red";
    setTimeout(() => {
        draggedLetter.style.backgroundColor = "blue";
    }, 500);
}

// Додаємо обробники подій до літер
document.querySelectorAll(".letter").forEach(letter => {
    letter.addEventListener("touchstart", handleTouchStart);
    letter.addEventListener("touchmove", handleTouchMove);
    letter.addEventListener("touchend", handleTouchEnd);
});



function checkWordCompletion() {
    let correctCount = 0;
    document.querySelectorAll(".cell").forEach((cell, index) => {
        if (cell.textContent === currentWord[index]) {
            cell.style.backgroundColor = "#444";
            cell.draggable = false;
            correctCount++;
        }
    });

    if (correctCount === currentWord.length) {
        setTimeout(displayPopup, 500);
    }
}

function displayPopup() {
    score++;
    localStorage.setItem("score", score);
    document.getElementById("score").textContent = "Відгадані слова: " + score;
    saveFact();

    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
    popup.style.display = "block";

    popup.innerHTML = `
        <div class="popup-content">
            <h2>Правильно!</h2>
            <p>${currentWordData.fact}</p>
            <button id="continue-btn">Продовжити</button>
        </div>
    `;
    document.getElementById("continue-btn").addEventListener("click", continueGame);
}

function saveFact() {
    if (!allFacts.includes(currentWordData.fact)) {
        allFacts.push(currentWordData.fact);
        localStorage.setItem("allFacts", JSON.stringify(allFacts));
    }
    document.getElementById("view-facts-btn").style.display = "block";
}

function viewFacts() {
    const allFactsContainer = document.getElementById("all-facts");
    
    // Додаємо всі факти
    allFactsContainer.innerHTML = allFacts.join("<br><br>");

    // Додаємо кнопку "Закрити"
    if (!document.getElementById("close-facts-btn")) {
        let closeButton = document.createElement("button");
        closeButton.id = "close-facts-btn";
        closeButton.textContent = "Закрити";
        closeButton.style.display = "block";
        closeButton.style.marginTop = "10px";
        closeButton.addEventListener("click", () => {
            allFactsContainer.classList.add("hidden");
        });
        allFactsContainer.appendChild(closeButton);
    }

    allFactsContainer.classList.toggle("hidden");
}


function continueGame() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
    popup.style.display = "none";
    generateNewWord();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
