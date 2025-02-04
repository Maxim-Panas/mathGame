document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('background-music');
    var button = document.getElementById('mute-button');

    if (!audio || !button) return;

    // Перевіряємо стан звуку з localStorage
    var isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted;
    button.textContent = audio.muted ? '🔇' : '🔊';

    function playMusic() {
        let volume = 0;
        audio.volume = volume;
        audio.play().then(() => {
            let interval = setInterval(() => {
                volume += 0.05;
                if (volume >= 1) {
                    clearInterval(interval);
                }
                audio.volume = volume;
            }, 100);
        }).catch(() => console.log("Не вдалося відтворити музику."));
    }

    function waitForInteraction() {
        function interactionHandler() {
            playMusic();
            removeInteractionListeners();
        }

        function removeInteractionListeners() {
            document.removeEventListener('click', interactionHandler);
            document.removeEventListener('keydown', interactionHandler);
            document.removeEventListener('scroll', interactionHandler);
            document.removeEventListener('touchstart', interactionHandler);
            document.removeEventListener('mousemove', interactionHandler);
        }

        document.addEventListener('click', interactionHandler, { once: true });
        document.addEventListener('keydown', interactionHandler, { once: true });
        document.addEventListener('scroll', interactionHandler, { once: true });
        document.addEventListener('touchstart', interactionHandler, { once: true });
        document.addEventListener('mousemove', interactionHandler, { once: true });
    }

    // Якщо музика має грати після натискання "Почати"
    if (localStorage.getItem('startMusic') === 'true') {
        localStorage.removeItem('startMusic');
        playMusic();
    } else {
        // Чекаємо на взаємодію
        waitForInteraction();
    }

    // Обробник події для кнопки вимкнення/увімкнення звуку
    button.addEventListener('click', function () {
        audio.muted = !audio.muted;
        localStorage.setItem('isMuted', audio.muted);
        button.textContent = audio.muted ? '🔇' : '🔊';
    });
});