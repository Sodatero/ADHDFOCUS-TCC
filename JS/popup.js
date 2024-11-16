document.getElementById('start-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startPomodoro' });
  });
  
  document.getElementById('ajuda-btn').addEventListener('click', () => {
    window.open(chrome.runtime.getURL('help.html'), '_blank');
  });
  
  document.getElementById('configuracoes-btn').addEventListener('click', () => {
    window.open(chrome.runtime.getURL('settings.html'), '_blank');
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
  