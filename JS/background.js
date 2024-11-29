let pomodoroInterval = null;
let timeRemaining = 1 * 60 * 1000; // Tempo inicial do Pomodoro (25 minutos)
let pausedTime = 0; // Variável para armazenar o tempo pausado

// Ouvindo mensagens enviadas pelo popup.js ou settings.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startPomodoro') {
    startPomodoro();
  }

  if (message.action === 'stopPomodoro') {
    stopPomodoro();
  }

  if (message.action === 'updateTimer') {
    sendResponse({ timeRemaining: timeRemaining });
  }

  if (message.action === 'updateSettings') {
    // Atualiza as configurações salvas no storage
    chrome.storage.sync.set({
      workDuration: message.workTime,
      breakDuration: message.breakTime
    });
  }
});

// Função para iniciar o Pomodoro com o tempo configurado
function startPomodoro() {
  chrome.storage.sync.get(['workDuration', 'breakDuration'], (settings) => {
    const workDuration = settings.workDuration || 25; // Default: 25 minutos
    const breakDuration = settings.breakDuration || 5; // Default: 5 minutos

    if (pomodoroInterval) {
      clearInterval(pomodoroInterval); // Para qualquer intervalo existente antes de começar um novo
    }

    if (pausedTime > 0) {
      timeRemaining = pausedTime; // Retoma de onde parou
    } else {
      timeRemaining = workDuration * 60 * 1000; // Define o tempo de trabalho configurado
    }

    // Inicia o contador do Pomodoro
    pomodoroInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining -= 1000; // Subtrai 1 segundo do tempo restante
        chrome.runtime.sendMessage({ action: 'updateTimer', timeRemaining: timeRemaining });
      }

      // Checa se o tempo chegou a zero
      if (timeRemaining <= 0) {
        clearInterval(pomodoroInterval); // Para o Pomodoro quando o tempo acabar
        pomodoroInterval = null;

        // Notifica o popup que o Pomodoro foi concluído
        chrome.runtime.sendMessage({ action: 'pomodoroFinished' });
      }
    }, 1000); // A cada 1 segundo
  });
}

// Função para parar o Pomodoro (pausar)
function stopPomodoro() {
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval); // Para o timer
    pomodoroInterval = null;
    pausedTime = timeRemaining; // Armazena o tempo restante no momento da pausa
    chrome.runtime.sendMessage({ action: 'pomodoroStopped', timeRemaining: timeRemaining });
  }
}
