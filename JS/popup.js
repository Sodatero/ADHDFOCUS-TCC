document.addEventListener('DOMContentLoaded', function() {
  // Evento para iniciar o Pomodoro
  document.getElementById('start-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startPomodoro' });
  });

  // Evento para parar o Pomodoro
  document.getElementById('stop-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopPomodoro' });
  });

  // Evento para abrir as configurações
document.getElementById('configuracoes-btn').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('../html/settings.html') });
});

});

  
  function updateTimerDisplay(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    document.getElementById('timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateTimer') {
      updateTimerDisplay(message.timeRemaining);
    }
  });
  