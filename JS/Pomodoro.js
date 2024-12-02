document.addEventListener('DOMContentLoaded', function () {
  // Evento para começar o Pomodoro
  document.getElementById('start-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startPomodoro' });
  });

  // Evento para pausar o Pomodoro
  document.getElementById('stop-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopPomodoro' });
  });

  // Evento para abrir as configurações
  document.getElementById('configuracoes-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('../html/settings.html') });
  });
});

// Função para atualizar a exibição do tempo restante
function updateTimerDisplay(timeRemaining) {
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  document.getElementById('timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Recebe mensagens de atualização de tempo
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateTimer') {
    updateTimerDisplay(message.timeRemaining);
  }

  if (message.action === 'pomodoroFinished') {
    alert("🍅 Tempo de Pomodoro concluído. Faça uma pausa curta ou inicie a próxima sessão.");
  }

  if (message.action === 'pomodoroStopped') {
    alert("Pomodoro pausado! Você pode continuar de onde parou.");
  }

  // Recebe a atualização das configurações
  if (message.action === 'updateSettings') {
    // Atualiza o timer com os novos tempos de trabalho e pausa
    chrome.storage.sync.get(['workDuration', 'breakDuration'], (settings) => {
      const workDuration = settings.workDuration || 25;
      const breakDuration = settings.breakDuration || 5;
      // Atualiza o display ou qualquer outro componente que precise dessas informações
      alert(`Configurações Atualizadas! Trabalho: ${workDuration} minutos, Pausa: ${breakDuration} minutos`);
    });
  }
});
