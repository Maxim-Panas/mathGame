// Отримуємо елементи кнопок і блоку для гри
const examplesBtn = document.getElementById("game-btn");
const gameDiv = document.getElementById("game");

// Додаємо події для кнопок
examplesBtn.addEventListener("click", () => {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію
    chooseDifficulty(); // Відкриваємо вибір рівня тільки при натисканні кнопки
});

// Функція для завершення гри
function endGame(message, score, time = null) {
    gameDiv.innerHTML = `
        <h2 class="game-over">${message}</h2>
        <p class="game-result">Ваш рейтинг: ${score}</p>
        ${time !== null ? `<p class="game-result">Час: ${time} секунд</p>` : ""}
        <button id="back-to-menu" class="end-button">Назад до меню</button>
    `;

    document.getElementById("back-to-menu").addEventListener("click", () => {
        // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
            location.reload(); // Перезавантаження сторінки для повернення до меню
        });
    });
    
}


// Функція для вибору рівня складності та завантаження гри
function chooseDifficulty() {
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Оберіть рівень складності</h2>
            
            <button class="difficulty-button" data-level="easy">Легкий</button>
            <button class="difficulty-button" data-level="medium">Середній</button>
            <button class="difficulty-button" data-level="hard">Важкий</button>
        </div>
    `;
    document.querySelectorAll(".difficulty-button").forEach(button => {
        button.addEventListener("click", () => loadExamplesGame(button.dataset.level));
    });
}

// Функція для завантаження гри "Рішення прикладів"
function loadExamplesGame(difficulty) {
    let score = 0;
    let timer = 60;
    let storageKey = `bestScoreExamples_${difficulty}`;

    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Рішення прикладів (${difficulty})</h2>
            <p><strong>Час:</strong> <span id="time" class="game-info">${timer}</span> секунд</p>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Найкращий рейтинг:</strong> <span id="best-score" class="game-info">${localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)).score : 0}</span></p>
            <div id="example" class="example-box"></div>
            <div id="answer-options" class="answer-options"></div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const timeSpan = document.getElementById("time");
    const scoreSpan = document.getElementById("score");
    const bestScoreSpan = document.getElementById("best-score");
    const exampleDiv = document.getElementById("example");
    const answerOptionsDiv = document.getElementById("answer-options");
    document.getElementById("end-game").addEventListener("click", () => {
        endExamplesGame("Гру завершено!", score, storageKey);
    });

    function generateExample() {
        let num1, num2, operation, correctAnswer;
        const operationsEasy = ["+", "-"];
        const operationsMedium = ["+", "-", "×"];
        const operationsHard = ["+", "-", "×", "÷"];
    
        if (difficulty === "easy") {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operation = operationsEasy[Math.floor(Math.random() * operationsEasy.length)];
        } else if (difficulty === "medium") {
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operation = operationsMedium[Math.floor(Math.random() * operationsMedium.length)];
            if (operation === "÷") {
                num1 = num1 * num2;
            }
        } else {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            let num3 = Math.floor(Math.random() * 10) + 1;
            let num4 = Math.floor(Math.random() * 5) + 1;
            exampleDiv.textContent = `${num1} × (${num2} + ${num3}) + (${num4} ÷ ${num4})`;
            correctAnswer = num1 * (num2 + num3) + (num4 / num4);
        }
    
        if (difficulty !== "hard") {
            switch (operation) {
                case "+": correctAnswer = num1 + num2; break;
                case "-": correctAnswer = num1 - num2; break;
                case "×": correctAnswer = num1 * num2; break;
                case "÷": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
            }
    
            exampleDiv.textContent = `${num1} ${operation} ${num2}`;
        }
    
        // Створення варіантів відповідей
        const answers = [
            correctAnswer,
            correctAnswer + Math.floor(Math.random() * 5) + 1,
            correctAnswer - Math.floor(Math.random() * 5) - 1,
            correctAnswer + Math.floor(Math.random() * 10) - 5
        ];
        answers.sort(() => Math.random() - 0.5);
    
        answerOptionsDiv.innerHTML = "";
        answers.forEach(answer => {
            const button = document.createElement("button");
            button.className = "answer-button";
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(answer, correctAnswer));
            answerOptionsDiv.appendChild(button);
        });
    
        return correctAnswer;
    }
    

    function checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer === correctAnswer) {
            score++;
            scoreSpan.textContent = score;
            const bestScore = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)).score : 0;
            if (score > bestScore) {
                localStorage.setItem(storageKey, JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
                bestScoreSpan.textContent = score;
            }
        }
        correctAnswer = generateExample();
    }

    let correctAnswer = generateExample();
    const timerInterval = setInterval(() => {
        timer--;
        timeSpan.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endExamplesGame("Гру завершено!", score, storageKey);
        }
    }, 1000);
}

// Функція для завершення гри
function endExamplesGame(message, score, storageKey) {
    const bestScore = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)).score : 0;
    if (score > bestScore) {
        localStorage.setItem(storageKey, JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
    }
    gameDiv.innerHTML = `
        <h2 class="game-over">${message}</h2>
        <p class="game-result">Ваш рейтинг: ${score}</p>
        <p class="game-result">Найкращий рейтинг: ${localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)).score : 0}</p>
        <button id="back-to-menu" class="end-button">Назад до меню</button>
    `;
    document.getElementById("back-to-menu").addEventListener("click", () => {
        // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
        });
    });
    
}




// Меню вибору рівнів для гри "Таблиця чисел"
function showTableGameMenu() {
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Виберіть рівень складності</h2>
            <button class="level-button" data-level="50">Від 1 до 50</button>
            <button class="level-button" data-level="100">Від 1 до 100</button>
            <button class="level-button" data-level="200">Від 1 до 200</button>
        </div>
    `;

    const levelButtons = document.querySelectorAll(".level-button");
    levelButtons.forEach(button => {
        button.addEventListener("click", () => {
            const level = parseInt(button.getAttribute("data-level"));
            loadTableGame(level);
        });
    });
}

// Функція для показу вікна з правилами гри "Таблиця чисел"
function showTableGameRules() {
    gameDiv.innerHTML = `
        <div class="rules-modal">
            <h2>Правила гри "Таблиця чисел"</h2>
            <p>1️⃣ Ваша мета — знайти числа від 1 до вибраного числа у порядку зростання.</p>
            <p>2️⃣ Числа будуть перемішані випадковим чином у таблиці, і ви повинні натискати на них у правильному порядку.</p>
            <p>3️⃣ Кожен раз, коли ви натискаєте правильне число, воно змінює колір на зелений, а ви отримуєте 1 бал.</p>
            <p>4️⃣ Якщо ви натискаєте неправильне число, воно змінює колір на червоний.</p>
            <p>5️⃣ Гра триває, поки ви не знайдете всі числа.</p>
            <p>⏳ Поки вікно правил відкрите, гра не починається.</p>
            <button id="start-table-game" class="start-button">Почати гру</button>
        </div>
    `;
    document.getElementById("start-table-game").addEventListener("click", () => {
        showTableGameMenu(); // Перехід до вибору рівня складності
    });
}

// Додаємо кнопку для запуску гри "Таблиця чисел" в меню
const tableNumbersBtn = document.createElement("button");
tableNumbersBtn.textContent = "Таблиця чисел";
tableNumbersBtn.className = "menu-button";
tableNumbersBtn.addEventListener("click", showTableGameRulesWithAnimation);

document.getElementById("menu").appendChild(tableNumbersBtn);

// Функція для показу вікна з правилами гри "Таблиця чисел" з анімацією
function showTableGameRulesWithAnimation() {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію
    
    showTableGameRules(); // Викликаємо функцію, що показує правила гри
}
// Функція для завантаження гри "Таблиця чисел"
function loadTableGame(maxNumber) {
    let score = 0; // Рейтинг користувача
    let numbersArray = []; // Массив для чисел
    let currentNumber = 1; // Початкове число для пошуку
    let startTime = Date.now(); // Час початку гри
    const bestTimeKey = `bestTimeTable_${maxNumber}`;
    const bestScoreKey = `bestScoreTable_${maxNumber}`;
    const bestTime = localStorage.getItem(bestTimeKey) ? JSON.parse(localStorage.getItem(bestTimeKey)).time : Infinity;
    const bestScore = localStorage.getItem(bestScoreKey) ? JSON.parse(localStorage.getItem(bestScoreKey)).score : 0;

    // Очищаємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Таблиця чисел</h2>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Час:</strong> <span id="time" class="game-info">0</span> секунд</p>
            ${bestTime !== Infinity ? `<p><strong>Найкращий час:</strong> <span id="best-time" class="game-info">${bestTime}</span> секунд</p>` : ""}
            ${bestScore > 0 ? `<p><strong>Найкращий рейтинг:</strong> <span id="best-score" class="game-info">${bestScore}</span></p>` : ""}
            <div id="table-container" class="table-container"></div>
            <p class="game-instructions">Знайди числа від 1 до ${maxNumber} у порядку зростання!</p>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const scoreSpan = document.getElementById("score");
    const timeSpan = document.getElementById("time");
    const tableContainer = document.getElementById("table-container");
    let updateTime;

    document.getElementById("end-game").addEventListener("click", () => {
        clearInterval(updateTime);
        endTableGame("Гру завершено примусово. Результати не збережено.", score, null, maxNumber);
    });

    // Функція для оновлення часу
    updateTime = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeSpan.textContent = elapsedTime;
    }, 1000);

    // Функція для генерації таблиці з випадковими числами
    function generateTable() {
        numbersArray = Array.from({ length: maxNumber }, (_, i) => i + 1); // Масив чисел від 1 до maxNumber
        numbersArray.sort(() => Math.random() - 0.5); // Перемішуємо числа випадковим чином

        // Створюємо таблицю
        let tableHTML = "<table class=\"number-table\"><tr>";
        numbersArray.forEach((num, index) => {
            tableHTML += `<td id="cell-${index}" class="cell">${num}</td>`;
            if ((index + 1) % 10 === 0) tableHTML += "</tr><tr>"; // Розділяємо на рядки
        });
        tableHTML += "</tr></table>";
        tableContainer.innerHTML = tableHTML;
    }

    // Функція для завершення гри "Таблиця чисел"
    function endTableGame(message, score, time = null, maxNumber) {
        const bestScoreKey = `bestScoreTable_${maxNumber}`;
        const bestTimeKey = `bestTimeTable_${maxNumber}`;
        const bestScore = localStorage.getItem(bestScoreKey) ? JSON.parse(localStorage.getItem(bestScoreKey)).score : 0;
        const bestTime = localStorage.getItem(bestTimeKey) ? JSON.parse(localStorage.getItem(bestTimeKey)).time : Infinity;
        let comparisonMessage = "";

        if (time !== null) {
            if (time < bestTime) {
                localStorage.setItem(bestTimeKey, JSON.stringify({ time: time, timestamp: new Date().toISOString() }));
                comparisonMessage = `Сьогодні ви швидші на ${bestTime - time} секунд!`;
            } else {
                comparisonMessage = `Сьогодні ви повільніші на ${time - bestTime} секунд.`;
            }
        }

        if (score > bestScore) {
            localStorage.setItem(bestScoreKey, JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
        }

        gameDiv.innerHTML = `
            <h2 class="game-over">${message}</h2>
            <p class="game-result">Ваш рейтинг: ${score}</p>
            ${time !== null ? `<p class="game-result">Час: ${time} секунд</p>` : ""}
            ${bestTime !== Infinity ? `<p class="game-result">Найкращий час: ${bestTime} секунд</p>` : ""}
            ${bestScore > 0 ? `<p class="game-result">Найкращий рейтинг: ${bestScore}</p>` : ""}
            ${comparisonMessage ? `<p class="game-comparison">${comparisonMessage}</p>` : ""}
            <button id="back-to-menu" class="end-button">Назад до меню</button>
        `;

        document.getElementById("back-to-menu").addEventListener("click", () => {
            // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
            location.reload(); // Перезавантаження сторінки для повернення до меню
        });
    });
    }

    // Обробка кліку на клітинку таблиці
    tableContainer.addEventListener("click", (event) => {
        const cell = event.target;
        if (cell.classList.contains("cell")) {
            const cellNumber = parseInt(cell.textContent);

            if (cellNumber === currentNumber) {
                cell.style.backgroundColor = "green"; // Зелений колір для правильного числа
                currentNumber++; // Переходимо до наступного числа
                score++; // Збільшуємо рейтинг
                scoreSpan.textContent = score; // Оновлюємо рейтинг на екрані
            } else {
                cell.style.backgroundColor = "red"; // Червоний колір для неправильного числа
            }
        }

        if (currentNumber > maxNumber) {
            clearInterval(updateTime); // Зупиняємо таймер
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            endTableGame("Вітаємо, ви виграли!", score, elapsedTime, maxNumber);
        }
    });

    // Генеруємо таблицю
    generateTable();
}




// Додаємо кнопку для запуску гри "Нестандартні вирази" в меню
const customExpressionsBtn = document.createElement("button");
customExpressionsBtn.textContent = "Вирази";
customExpressionsBtn.className = "menu-button";
customExpressionsBtn.addEventListener("click", showCustomExpressionsGameWithAnimation);

document.getElementById("menu").appendChild(customExpressionsBtn);

// Функція для показу вікна з грою "Нестандартні вирази" з анімацією
function showCustomExpressionsGameWithAnimation() {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію

    loadCustomExpressionsGame(); // Викликаємо функцію, що завантажує гру
}

// Функція для гри "Нестандартні вирази"
function loadCustomExpressionsGame() {
    let score = 0;
    let timer = 60;

    // Очищаємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Вирази</h2>
            <p><strong>Час:</strong> <span id="time" class="game-info">${timer}</span> секунд</p>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Найкращий рейтинг:</strong> <span id="best-score" class="game-info">${localStorage.getItem('bestScoreCustomExpressions') ? JSON.parse(localStorage.getItem('bestScoreCustomExpressions')).score : 0}</span></p>
            <div id="expression" class="example-box"></div>
            <div id="answer-options" class="answer-options"></div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const timeSpan = document.getElementById("time");
    const scoreSpan = document.getElementById("score");
    const bestScoreSpan = document.getElementById("best-score");
    const expressionDiv = document.getElementById("expression");
    const answerOptionsDiv = document.getElementById("answer-options");
    document.getElementById("end-game").addEventListener("click", () => {
        endCustomExpressionsGame("Гру завершено!", score);
    });

    function generateExpression() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const result = num1 + num2;

        const missingPart = Math.random() < 0.5 ? "num1" : "num2";
        let correctAnswer;

        if (missingPart === "num1") {
            expressionDiv.textContent = `? + ${num2} = ${result}`;
            correctAnswer = num1;
        } else {
            expressionDiv.textContent = `${num1} + ? = ${result}`;
            correctAnswer = num2;
        }

        const answers = [
            correctAnswer,
            correctAnswer + Math.floor(Math.random() * 5) + 1,
            correctAnswer - Math.floor(Math.random() * 5) - 1,
            correctAnswer + Math.floor(Math.random() * 10) - 5
        ];
        answers.sort(() => Math.random() - 0.5);

        answerOptionsDiv.innerHTML = "";
        answers.forEach(answer => {
            const button = document.createElement("button");
            button.className = "answer-button";
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(answer, correctAnswer));
            answerOptionsDiv.appendChild(button);
        });
    }

    function checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer === correctAnswer) {
            score++;
            scoreSpan.textContent = score;
            const bestScore = localStorage.getItem('bestScoreCustomExpressions') ? JSON.parse(localStorage.getItem('bestScoreCustomExpressions')).score : 0;
            if (score > bestScore) {
                localStorage.setItem('bestScoreCustomExpressions', JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
                bestScoreSpan.textContent = score;
            }
        }
        generateExpression();
    }

    // Функція для завершення гри "Нестандартні вирази"
    function endCustomExpressionsGame(message, score) {
        const bestScore = localStorage.getItem('bestScoreCustomExpressions') ? JSON.parse(localStorage.getItem('bestScoreCustomExpressions')).score : 0;

        if (score > bestScore) {
            localStorage.setItem('bestScoreCustomExpressions', JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
        }

        gameDiv.innerHTML = `
            <h2 class="game-over">${message}</h2>
            <p class="game-result">Ваш рейтинг: ${score}</p>
            ${bestScore > 0 ? `<p class="game-result">Найкращий рейтинг: ${bestScore}</p>` : ""}
            <button id="back-to-menu" class="end-button">Назад до меню</button>
        `;

        document.getElementById("back-to-menu").addEventListener("click", () => {
            // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
            location.reload(); // Перезавантаження сторінки для повернення до меню
        });
    });
    }

    let timerInterval = setInterval(() => {
        timer--;
        timeSpan.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endCustomExpressionsGame("Час вийшов!", score);
        }
    }, 1000);

    generateExpression();
}

    
// Функція для показу вікна з правилами
function showRulesAndStartGame() {
    gameDiv.innerHTML = `
        <div class="rules-modal">
            <h2>Правила гри "Шалений рахунок"</h2>
            <p>1️⃣ Ваша мета — отримати цільове число, використовуючи математичні операції.</p>
            <p>2️⃣ Початкове число — 1. Ви можете змінювати його за допомогою кнопок:</p>
            <ul>
                <li>✖ ×2 — множить число на 2</li>
                <li>➕ +5 — додає 5</li>
                <li>➖ -3 — віднімає 3</li>
                <li>➗ ÷2 — ділить число на 2 (округлюється вниз)</li>
            </ul>
            <p>3️⃣ Кожну секунду число автоматично збільшується на 1.</p>
            <p>4️⃣ Якщо ваше число співпадає з цільовим, ви отримуєте +1 бал, і гра продовжується з новою ціллю.</p>
            <p>5️⃣ Якщо число виходить за межі (≤0 або >1000) — гра завершується.</p>
            <p>⏳ Поки вікно правил відкрите, гра не починається.</p>
            <button id="start-game" class="start-button">Почати гру</button>
        </div>
    `;
    document.getElementById("start-game").addEventListener("click", () => {
        loadCrazyMathGame();
    });
}


// Додаємо кнопку для показу правил гри 2048
const game2048RulesBtn = document.createElement("button");
game2048RulesBtn.textContent = "Гра 2048";
game2048RulesBtn.className = "menu-button";
game2048RulesBtn.addEventListener("click", show2048GameRulesWithAnimation);

document.getElementById("menu").appendChild(game2048RulesBtn);

// Функція для показу вікна з правилами гри 2048 з анімацією
function show2048GameRulesWithAnimation() {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію

    show2048GameRules(); // Викликаємо функцію, що показує правила гри
}
    // Створюємо модальне вікно для правил
    gameDiv.innerHTML = `
        <div class="rules-modal">
            <h2>Правила гри 2048</h2>
            <p><strong>Мета гри:</strong> З’єднати плитки з однаковими числами до досягнення плитки зі значенням 2048.</p>
            <p><strong>Управління:</strong></p>
            <p>Використовуйте стрілки на клавіатурі або свайпи на мобільних пристроях (вліво, вправо, вгору, вниз).</p>
            <p><strong>Як об'єднувати плитки:</strong></p>
            <p>Коли плитки з однаковими числами зіштовхуються, вони зливаються в одну плитку з подвоєним числом (наприклад, 2 + 2 = 4).</p>
            <p>Продовжуйте зливати плитки, поки не досягнете плитки з числом 2048 або поки не заповниться весь ігровий майданчик.</p>
            <p><strong>Кінець гри:</strong></p>
            <p>Гра закінчується, коли поле заповнене і не можна зробити жодного ходу.</p>
            <p><strong>Система оцінки:</strong></p>
            <p>Ви отримуєте бали за кожне злиття плиток. Чим більше плитка, тим більше балів ви отримуєте.</p>
            <button id="start-game" class="start-button">Почати гру</button>
        </div>
    `;

    // Додаємо функціонал кнопки для початку гри
    document.getElementById("start-game").addEventListener("click", start2048Game);


// Функція для переходу на файл mainGame.html
function start2048Game() {
    window.location.href = "gameMain.html";  // Перенаправляє на файл mainGame.html
}



//Шалений рахуно гра
function loadCrazyMathGame() {
    let score = 0;
    let currentNumber = 1;
    let targetNumber = getRandomTarget();
    let interval;
    const bestScore = localStorage.getItem('bestScoreCrazyMath') ? JSON.parse(localStorage.getItem('bestScoreCrazyMath')).score : 0;

    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Шалений рахунок</h2>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Ціль:</strong> <span id="target-number" class="game-info">${targetNumber}</span></p>
            <p><strong>Число:</strong> <span id="current-number" class="game-info">${currentNumber}</span></p>
            <p><strong>Найкращий рейтинг:</strong> <span id="best-score" class="game-info">${bestScore}</span></p>
            <div class="button-container">
                <button class="math-button answer-button" data-operation="multiply">×2</button>
                <button class="math-button answer-button" data-operation="add">+5</button>
                <button class="math-button answer-button" data-operation="subtract">-3</button>
                <button class="math-button answer-button" data-operation="divide">÷2</button>
            </div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const currentNumberSpan = document.getElementById("current-number");
    const targetNumberSpan = document.getElementById("target-number");
    const scoreSpan = document.getElementById("score");
    const bestScoreSpan = document.getElementById("best-score");
    document.getElementById("end-game").addEventListener("click", () => {
        clearInterval(interval);
        endCrazyMathGame("Гру завершено!", score);
    });

    document.querySelectorAll(".math-button").forEach(button => {
        button.addEventListener("click", () => {
            const operation = button.getAttribute("data-operation");
            if (operation === "multiply") {
                currentNumber *= 2;
            } else if (operation === "add") {
                currentNumber += 5;
            } else if (operation === "subtract") {
                currentNumber -= 3;
            } else if (operation === "divide") {
                currentNumber = Math.floor(currentNumber / 2);
            }
            
            currentNumberSpan.textContent = currentNumber;
            checkWin();
        });
    });

    function checkWin() {
        if (currentNumber === targetNumber) {
            score += 1;
            scoreSpan.textContent = score;
            const bestScore = localStorage.getItem('bestScoreCrazyMath') ? JSON.parse(localStorage.getItem('bestScoreCrazyMath')).score : 0;
            if (score > bestScore) {
                localStorage.setItem('bestScoreCrazyMath', JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
                bestScoreSpan.textContent = score;
            }
            targetNumber = getRandomTarget();
            targetNumberSpan.textContent = targetNumber;
            currentNumber = 1;
            currentNumberSpan.textContent = currentNumber;
        } else if (currentNumber <= 0 || currentNumber > 1000) {
            clearInterval(interval);
            endCrazyMathGame("Число вийшло за межі!", score);
        }
    }

    function getRandomTarget() {
        return Math.floor(Math.random() * 100) + 10;
    }

    // Функція для завершення гри "Шалений рахунок"
function endCrazyMathGame(message, score) {
    const bestScore = localStorage.getItem('bestScoreCrazyMath') ? JSON.parse(localStorage.getItem('bestScoreCrazyMath')).score : 0;

    if (score > bestScore) {
        localStorage.setItem('bestScoreCrazyMath', JSON.stringify({ score: score, timestamp: new Date().toISOString() }));
        bestScore = score; // Оновлюємо bestScore, щоб відобразити його коректно
    }

    gameDiv.innerHTML = `
        <h2 class="game-over">${message}</h2>
        <p class="game-result">Ваш рейтинг: ${score}</p>
        ${bestScore > 0 ? `<p class="game-result">Найкращий рейтинг: ${bestScore}</p>` : ""}
        <button id="back-to-menu" class="end-button">Назад до меню</button>
    `;

    document.getElementById("back-to-menu").addEventListener("click", () => {
        // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
            location.reload(); // Перезавантаження сторінки для повернення до меню
        });
    });
}


    interval = setInterval(() => {
        currentNumber += 1;
        currentNumberSpan.textContent = currentNumber;
        checkWin();
    }, 1000);
}



// Додаємо кнопку для запуску гри "Шалений рахунок" у меню
const crazyMathBtn = document.createElement("button");
crazyMathBtn.textContent = "Шалений рахунок";
crazyMathBtn.className = "menu-button";
crazyMathBtn.addEventListener("click", showCrazyMathGameWithAnimation);

document.getElementById("menu").appendChild(crazyMathBtn);

// Функція для показу вікна з грою "Шалений рахунок" з анімацією
function showCrazyMathGameWithAnimation() {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію

    loadCrazyMathGame(); // Викликаємо функцію, що завантажує гру
}
 


// Додаємо кнопку "Інші Ігри" у меню
const otherGamesBtn = document.createElement("button");
otherGamesBtn.textContent = "Інші Ігри";
otherGamesBtn.className = "menu-button";
otherGamesBtn.addEventListener("click", function () {
    window.location.href = "word.html"; // Перехід на game.html
});
document.getElementById("menu").appendChild(otherGamesBtn);

// Додаємо кнопку для показу рекордів
const recordsBtn = document.createElement("button");
recordsBtn.textContent = "Мої рекорди 🏆";
recordsBtn.className = "menu-button new-class"; // Додаємо новий клас тут
recordsBtn.addEventListener("click", showRecordsScreenWithAnimation);
document.getElementById("menu").appendChild(recordsBtn);

// Функція для показу вікна з рекордами з анімацією
function showRecordsScreenWithAnimation() {
    gameDiv.style.display = 'block'; // Робимо елемент видимим
    gameDiv.offsetHeight; // Додаємо це для перезапуску анімації
    gameDiv.style.animation = 'none'; // Вимикаємо анімацію на короткий час
    gameDiv.offsetHeight; // Знову викликаємо цю властивість, щоб зафіксувати зміни
    gameDiv.style.animation = 'fadeIn 1s ease-in-out forwards'; // Знову запускаємо анімацію

    showRecordsScreen(); // Викликаємо функцію, що показує рекорди
}

function showRecordsScreen() {
    gameDiv.innerHTML = `
          <div class="game-content">
            <h2 class="game-title">🏅 Найкращі результати</h2>
            <p><strong>Рішення прикладів:</strong></p>
            <p><strong>Легкий:</strong> ${getBestScore('bestScoreExamples_easy')}</p>
            <p><strong>Середній:</strong> ${getBestScore('bestScoreExamples_medium')}</p>
            <p><strong>Важкий:</strong> ${getBestScore('bestScoreExamples_hard')}</p>
            <p><strong>Шалений рахунок:</strong> ${getBestScore('bestScoreCrazyMath')}</p>
            <p><strong>Вирази:</strong> ${getBestScore('bestScoreCustomExpressions')}</p>
            <p><strong>Таблиця Чисел:</strong></p>
            <p><strong>1-50:</strong></p>
            <p>Час: ${getBestTime('bestTimeTable_50')} секунд</p>
            <p><strong>1-100:</strong></p>
            <p>Час: ${getBestTime('bestTimeTable_100')} секунд</p>
            <p><strong>1-200:</strong></p>
            <p>Час: ${getBestTime('bestTimeTable_200')} секунд</p>
            <button id="back-to-menu" class="end-button">Назад до меню</button>
        </div>
    `;

    document.getElementById("back-to-menu").addEventListener("click", () => {
        // Додаємо анімацію зникнення вікна
        gameDiv.style.animation = 'fadeOut 1s ease-in-out forwards'; // Застосовуємо анімацію на зникнення
    
        // Після завершення анімації, приховуємо елемент
        gameDiv.addEventListener("animationend", () => {
            gameDiv.style.display = 'none'; // Приховуємо елемент після завершення анімації
            location.reload(); // Перезавантаження сторінки для повернення до меню
        });
    });
}

// Функція для отримання найкращого часу
function getBestTime(key) {
    const record = localStorage.getItem(key);
    return record ? JSON.parse(record).time : "Немає";
}

function getBestScore(key) {
    const record = localStorage.getItem(key);
    return record ? JSON.parse(record).score : "Немає";
}



