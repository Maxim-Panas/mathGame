document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('background-music');
    var button = document.getElementById('mute-button');

    if (!audio || !button) return; // Перевірка, чи існують елементи

    // Завантажуємо стан mute з localStorage
    var isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted;

    // Встановлюємо правильний смайлик на кнопці відповідно до стану звуку
    button.textContent = audio.muted ? '🔇' : '🔊';

    // Додаємо плавне збільшення гучності
    function fadeInMusic() {
        let volume = 0;
        audio.volume = volume;
        audio.play().then(() => {
            let interval = setInterval(() => {
                volume += 0.05;
                if (volume >= 1) {
                    clearInterval(interval); // Зупиняємо інтервал, коли досягнута максимальна гучність
                }
                audio.volume = volume;
            }, 100); // Кожні 100 мс збільшуємо гучність на 0.05
        }).catch(() => console.log("Щось пішло не так з відтворенням."));
    }

    // Функція для запуску музики після взаємодії з користувачем
    function playOnUserInteraction() {
        fadeInMusic();
        removeInteractionListeners(); // Видаляємо обробники після першого спрацьовування
    }

    // Видалення обробників після першого взаємодії
    function removeInteractionListeners() {
        document.removeEventListener('click', playOnUserInteraction);
        document.removeEventListener('keydown', playOnUserInteraction);
        document.removeEventListener('scroll', playOnUserInteraction);
        document.removeEventListener('touchstart', playOnUserInteraction);
        document.removeEventListener('mousemove', playOnUserInteraction);
    }

    // Якщо музика не грає, намагаємось запустити з fade-in ефектом
    if (audio.paused && !audio.muted) {
        fadeInMusic();
    }

    // Додаємо обробник події на кнопку для перемикання гучності
    button.addEventListener('click', function () {
        audio.muted = !audio.muted;
        localStorage.setItem('isMuted', audio.muted);
        button.textContent = audio.muted ? '🔇' : '🔊'; // Зміна смайлика на кнопці
    });

    // Спроба запустити музику одразу
    var playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Автовідтворення заблоковано. Чекаємо на взаємодію...");
            // Якщо браузер блокує — чекаємо на будь-яку взаємодію
            document.addEventListener('click', playOnUserInteraction, { once: true });
            document.addEventListener('keydown', playOnUserInteraction, { once: true });
            document.addEventListener('scroll', playOnUserInteraction, { once: true });
            document.addEventListener('touchstart', playOnUserInteraction, { once: true });
            document.addEventListener('mousemove', playOnUserInteraction, { once: true });
        });
    }
});
