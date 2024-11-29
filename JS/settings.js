document.getElementById('save-settings').addEventListener('click', () => {
    const workTime = parseInt(document.getElementById('work-time').value, 10);
    const breakTime = parseInt(document.getElementById('break-time').value, 10);
  
    if (isNaN(workTime) || workTime <= 0 || isNaN(breakTime) || breakTime <= 0) {
      alert('Por favor, insira valores válidos para o tempo de trabalho e pausa.');
      return;
    }
  
    chrome.storage.sync.set({
      workDuration: workTime,
      breakDuration: breakTime
    }, () => {
      alert('Configurações salvas!');
      // Optionally: Close the settings tab after saving
      //window.close();
    });
  });
  