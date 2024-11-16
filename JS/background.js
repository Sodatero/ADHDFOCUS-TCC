let pomodoroTimer;
let breakTimer;
let timerIntervalId;

let workDuration = 30 * 60 * 1000; // Default 30 minutos
let breakDuration = 10 * 60 * 1000; // Default 10 minutos
let timeRemaining = workDuration;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startPomodoro') {
    startPomodoro();
  }
});

function startPomodoro() {
  if (pomodoroTimer) clearTimeout(pomodoroTimer);
  if (breakTimer) clearTimeout(breakTimer);
  if (timerIntervalId) clearInterval(timerIntervalId);

  chrome.action.setBadgeText({ text: 'Pomodoro' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

  chrome.notifications.create('', {
    type: 'basic',
    iconUrl: 'logopequeno.png',
    title: 'ADHDFOCUS',
    message: `Iniciando Pomodoro de ${workDuration / 60000} minutos!`
  });

  timeRemaining = workDuration;
  updatePopupTimer();

  pomodoroTimer = setTimeout(() => {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: 'logopequeno.png',
      title: 'ADHDFOCUS',
      message: `Tempo de trabalho concluído. Hora da pausa de ${breakDuration / 60000} minutos!`
    });

    chrome.action.setBadgeText({ text: 'Pausa' });
    chrome.action.setBadgeBackgroundColor({ color: '#00FF00' });

    timeRemaining = breakDuration;
    updatePopupTimer();

    breakTimer = setTimeout(() => {
      chrome.notifications.create('', {
        type: 'basic',
        iconUrl: 'logopequeno.png',
        title: 'ADHDFOCUS',
        message: `Pausa concluída. Hora de voltar ao trabalho!`
      });

      chrome.action.setBadgeText({ text: '' });
      chrome.action.setBadgeBackgroundColor({ color: '#000000' });

      // Restart the cycle if desired
      startPomodoro();

    }, breakDuration);

  }, workDuration);
}

function updatePopupTimer() {
  if (timerIntervalId) clearInterval(timerIntervalId);

  timerIntervalId = setInterval(() => {
    timeRemaining -= 1000;
    chrome.runtime.sendMessage({ action: 'updateTimer', timeRemaining: timeRemaining });

    if (timeRemaining <= 0) {
      clearInterval(timerIntervalId);
    }
  }, 1000);
}

// Load settings
chrome.storage.sync.get(['workDuration', 'breakDuration'], (items) => {
  if (items.workDuration) workDuration = items.workDuration * 60 * 1000;
  if (items.breakDuration) breakDuration = items.breakDuration * 60 * 1000;
});
