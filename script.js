// Отримуємо елементи кнопок і блоку для гри
const examplesBtn = document.getElementById("examples-btn");
const tableBtn = document.getElementById("table-btn");
const gameDiv = document.getElementById("game");

// Додаємо події для кнопок
examplesBtn.addEventListener("click", () => {
    loadExamplesGame();
});

tableBtn.addEventListener("click", () => {
    showTableGameMenu();
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
    let timer = 30; // Час гри

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
    let timer = 30;

    // Очищуємо блок гри та додаємо елементи
    gameDiv.innerHTML = `
        <div class="game-content">
            <h2 class="game-title">Нестандартні вирази</h2>
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
    customExpressionsBtn.textContent = "Нестандартні вирази";
    customExpressionsBtn.className = "menu-button";
    customExpressionsBtn.addEventListener("click", loadCustomExpressionsGame);
    
    document.getElementById("menu").appendChild(customExpressionsBtn);
    
    document.getElementById("non-btn").addEventListener("click", function() {
        window.location.href = "gameMain.html";
    });
    
