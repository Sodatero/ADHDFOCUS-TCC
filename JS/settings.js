document.getElementById('save-settings').addEventListener('click', () => {
    const workTime = parseInt(document.getElementById('work-time').value, 10);
    const breakTime = parseInt(document.getElementById('break-time').value, 10);
    //verificar se foi colocado valores válidos
    if (isNaN(workTime) || workTime <= 0 || isNaN(breakTime) || breakTime <= 0) {
      alert('Por favor, insira valores válidos para o tempo de trabalho e pausa.');
      return;
    }
    //armazenar as informações na API e soltar o alerta
    chrome.storage.sync.set({
      workDuration: workTime,
      breakDuration: breakTime
    }, () => {
      alert('Configurações salvas!');
    });
  });
  