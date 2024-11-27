let pomodoroInterval = null;
let timeRemaining = 25 * 60 * 1000; // 25 minutos em milissegundos (tempo inicial do Pomodoro)

// Ouvindo mensagens enviadas pelo popup.js
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
});

// Função para iniciar o Pomodoro
function startPomodoro() {
  // Impede de iniciar múltiplos timers ao mesmo tempo
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval); // Para qualquer intervalo existente antes de começar um novo
  }

  timeRemaining = 25 * 60 * 1000; // Resetando o timer para 25 minutos
  pomodoroInterval = setInterval(() => {
    timeRemaining -= 1000;
    if (timeRemaining <= 0) {
      clearInterval(pomodoroInterval); // Para o Pomodoro quando o tempo acabar
      pomodoroInterval = null;
      chrome.runtime.sendMessage({ action: 'pomodoroFinished' }); // Notifica o popup
    } else {
      chrome.runtime.sendMessage({ action: 'updateTimer', timeRemaining: timeRemaining });
    }
  }, 1000);
}

// Função para parar o Pomodoro
function stopPomodoro() {
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval); // Para o timer
    pomodoroInterval = null;
    chrome.runtime.sendMessage({ action: 'pomodoroStopped' }); // Notifica o popup
  }
}
