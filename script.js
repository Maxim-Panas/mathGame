// Отримуємо елементи кнопок і блоку для гри
const examplesBtn = document.getElementById("examples-btn");
const gameDiv = document.getElementById("game");

// Додаємо події для кнопок
examplesBtn.addEventListener("click", () => {
    loadExamplesGame();
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
        location.reload(); // Перезавантаження сторінки для повернення до меню
    });
}

// Функція для завантаження гри "Рішення прикладів"
function loadExamplesGame() {
    let score = 0; // Рейтинг користувача
    let timer = 60; // Час гри

    // Очищуємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Рішення прикладів</h2>
            <p><strong>Час:</strong> <span id="time" class="game-info">${timer}</span> секунд</p>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <div id="example" class="example-box"></div>
            <div id="answer-options" class="answer-options"></div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const timeSpan = document.getElementById("time");
    const scoreSpan = document.getElementById("score");
    const exampleDiv = document.getElementById("example");
    const answerOptionsDiv = document.getElementById("answer-options");
    document.getElementById("end-game").addEventListener("click", () => {
        endGame("Гру завершено!", score);
    });

    // Функція для генерації прикладу
    function generateExample() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operations = ["+", "-", "*", "/"];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let correctAnswer;
        switch (operation) {
            case "+":
                correctAnswer = num1 + num2;
                break;
            case "-":
                correctAnswer = num1 - num2;
                break;
            case "*":
                correctAnswer = num1 * num2;
                break;
            case "/":
                correctAnswer = parseFloat((num1 / num2).toFixed(2));
                break;
        }

        exampleDiv.textContent = `${num1} ${operation} ${num2}`;

        // Генеруємо варіанти відповідей
        const answers = [
            correctAnswer,
            correctAnswer + Math.floor(Math.random() * 5) + 1,
            correctAnswer - Math.floor(Math.random() * 5) - 1,
            correctAnswer + Math.floor(Math.random() * 10) - 5
        ];
        answers.sort(() => Math.random() - 0.5); // Перемішуємо відповіді

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
        }
        correctAnswer = generateExample();
    }

    let correctAnswer = generateExample();

    // Таймер гри
    const timerInterval = setInterval(() => {
        timer--;
        timeSpan.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame("Гру завершено!", score);
        }
    }, 1000);
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
tableNumbersBtn.addEventListener("click", showTableGameRules);

document.getElementById("menu").appendChild(tableNumbersBtn);

// Функція для завантаження гри "Таблиця чисел"
function loadTableGame(maxNumber) {
    let score = 0; // Рейтинг користувача
    let numbersArray = []; // Массив для чисел
    let currentNumber = 1; // Початкове число для пошуку
    let startTime = Date.now(); // Час початку гри

    // Очищаємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Таблиця чисел</h2>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Час:</strong> <span id="time" class="game-info">0</span> секунд</p>
            <div id="table-container" class="table-container"></div>
            <p class="game-instructions">Знайди числа від 1 до ${maxNumber} у порядку зростання!</p>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const scoreSpan = document.getElementById("score");
    const timeSpan = document.getElementById("time");
    const tableContainer = document.getElementById("table-container");
    document.getElementById("end-game").addEventListener("click", () => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        endGame("Гру завершено!", score, elapsedTime);
    });

    // Функція для оновлення часу
    const updateTime = setInterval(() => {
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
            endGame("Вітаємо, ви виграли!", score, elapsedTime);
        }
    });

    // Генеруємо таблицю
    generateTable();
}

// Функція для гри "Нестандартні вирази"
function loadCustomExpressionsGame() {
    let score = 0;
    let timer = 60;

    // Очищуємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Вирази</h2>
            <p><strong>Час:</strong> <span id="time" class="game-info">${timer}</span> секунд</p>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <div id="expression" class="example-box"></div>
            <div id="answer-options" class="answer-options"></div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const timeSpan = document.getElementById("time");
    const scoreSpan = document.getElementById("score");
    const expressionDiv = document.getElementById("expression");
    const answerOptionsDiv = document.getElementById("answer-options");
    document.getElementById("end-game").addEventListener("click", () => {
        endGame("Гру завершено!", score);
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
        }
        generateExpression();
    }
    
    let timerInterval = setInterval(() => {
        timer--;
        timeSpan.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame("Час вийшов!", score);
        }
    }, 1000);
    
    generateExpression();
    }
    
    // Додаємо кнопку для запуску гри "Нестандартні вирази" в меню
    const customExpressionsBtn = document.createElement("button");
    customExpressionsBtn.textContent = "Вирази";
    customExpressionsBtn.className = "menu-button";
    customExpressionsBtn.addEventListener("click", loadCustomExpressionsGame);
    
    document.getElementById("menu").appendChild(customExpressionsBtn);
    
// Додаємо кнопку для показу правил гри 2048
const game2048RulesBtn = document.createElement("button");
game2048RulesBtn.textContent = "Гра 2048";
game2048RulesBtn.className = "menu-button";
game2048RulesBtn.addEventListener("click", show2048GameRules);
document.getElementById("menu").appendChild(game2048RulesBtn);

// Функція для показу правил гри 2048
function show2048GameRules() {
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
}

// Функція для переходу на файл mainGame.html
function start2048Game() {
    window.location.href = "GameMain.html";  // Перенаправляє на файл mainGame.html
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

// Функція для гри "Шалений рахунок"
function loadCrazyMathGame() {
    let score = 0;
    let currentNumber = 1;
    let targetNumber = getRandomTarget();
    let interval;

    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Шалений рахунок</h2>
            <p><strong>Рейтинг:</strong> <span id="score" class="game-info">${score}</span></p>
            <p><strong>Ціль:</strong> <span id="target-number" class="game-info">${targetNumber}</span></p>
            <p><strong>Число:</strong> <span id="current-number" class="game-info">${currentNumber}</span></p>
            <div class="button-container">
                <button class="math-button" data-operation="multiply">×2</button>
                <button class="math-button" data-operation="add">+5</button>
                <button class="math-button" data-operation="subtract">-3</button>
                <button class="math-button" data-operation="divide">÷2</button>
            </div>
            <button id="end-game" class="end-button">Завершити гру</button>
        </div>
    `;

    const currentNumberSpan = document.getElementById("current-number");
    const targetNumberSpan = document.getElementById("target-number");
    const scoreSpan = document.getElementById("score");
    document.getElementById("end-game").addEventListener("click", () => {
        clearInterval(interval);
        endGame("Гру завершено!", score);
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
            targetNumber = getRandomTarget();
            targetNumberSpan.textContent = targetNumber;
            currentNumber = 1;
            currentNumberSpan.textContent = currentNumber;
        } else if (currentNumber <= 0 || currentNumber > 1000) {
            clearInterval(interval);
            endGame("Число вийшло за межі!", score);
        }
    }

    function getRandomTarget() {
        return Math.floor(Math.random() * 100) + 10;
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
crazyMathBtn.addEventListener("click", showRulesAndStartGame);
document.getElementById("menu").appendChild(crazyMathBtn);
