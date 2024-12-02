let pomodoroInterval = null;
let timeRemaining = 1 * 60 * 1000;
let pausedTime = 0;

// conexão do popup.js e settings.js
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
    chrome.storage.sync.set({
      workDuration: message.workTime,
      breakDuration: message.breakTime
    });
  }
});

// Função para alterar o timer do pomodoro com ajustes do usuario
function startPomodoro() {
  chrome.storage.sync.get(['workDuration', 'breakDuration'], (settings) => {
    const workDuration = settings.workDuration || 25;
    const breakDuration = settings.breakDuration || 5; 

    if (pomodoroInterval) {
      clearInterval(pomodoroInterval);
    }

    if (pausedTime > 0) {
      timeRemaining = pausedTime; // Retoma de onde parou
    } else {
      timeRemaining = workDuration * 60 * 1000;
    }
    
    pomodoroInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining -= 1000;
        chrome.runtime.sendMessage({ action: 'updateTimer', timeRemaining: timeRemaining });
      }
      if (timeRemaining <= 0) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        chrome.runtime.sendMessage({ action: 'pomodoroFinished' });
      }
    }, 1000);
  });
}
function stopPomodoro() {
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    pausedTime = timeRemaining;
    chrome.runtime.sendMessage({ action: 'pomodoroStopped', timeRemaining: timeRemaining });
  }
}
