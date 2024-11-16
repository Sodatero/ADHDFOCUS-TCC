const reminderList = document.getElementById("reminder-list");
const saveButton = document.getElementById("save-btn");
const titleInput = document.getElementById("reminder-title");
const descriptionInput = document.getElementById("reminder-description");
const datetimeInput = document.getElementById("reminder-datetime");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

// Função para renderizar a lista de lembretes
function renderReminders() {
  reminderList.innerHTML = "";
  reminders.forEach((reminder, index) => {
    const li = document.createElement("li");
    li.textContent = `${reminder.title} - ${reminder.dateTime}`;
    li.addEventListener("click", () => editReminder(index));
    reminderList.appendChild(li);
  });
}

// Função para editar um lembrete
function editReminder(index) {
  const reminder = reminders[index];
  titleInput.value = reminder.title;
  descriptionInput.value = reminder.description;
  datetimeInput.value = reminder.dateTime;
  saveButton.textContent = "Atualizar Lembrete";
  saveButton.onclick = () => updateReminder(index);
}

// Função para salvar um novo lembrete
saveButton.onclick = function () {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const dateTime = datetimeInput.value;

  if (!title || !description || !dateTime) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const newReminder = { title, description, dateTime };
  reminders.push(newReminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));

  // Agendar notificação
  scheduleNotification(newReminder);

  // Limpar campos e re-renderizar lista
  titleInput.value = "";
  descriptionInput.value = "";
  datetimeInput.value = "";
  saveButton.textContent = "Salvar Lembrete";
  renderReminders();
};

// Função para atualizar um lembrete existente
function updateReminder(index) {
  reminders[index] = {
    title: titleInput.value,
    description: descriptionInput.value,
    dateTime: datetimeInput.value,
  };
  localStorage.setItem("reminders", JSON.stringify(reminders));

  // Agendar notificação
  scheduleNotification(reminders[index]);

  // Limpar campos e re-renderizar lista
  titleInput.value = "";
  descriptionInput.value = "";
  datetimeInput.value = "";
  saveButton.textContent = "Salvar Lembrete";
  renderReminders();
}

// Função para agendar a notificação
function scheduleNotification(reminder) {
  const reminderDate = new Date(reminder.dateTime);
  const now = new Date();
  const timeDiff = reminderDate - now; // Diferença de tempo até o lembrete

  if (timeDiff > 0) {
    // Agendar a notificação para o horário do lembrete
    setTimeout(() => {
      // Verifica se a permissão para notificação foi concedida
      if (Notification.permission === "granted") {
        // Exibir a notificação
        new Notification(reminder.title, {
          body: reminder.description,
          icon: "icons/icon48.png", // Use um ícone da sua extensão
        });
      } else {
        // Solicitar permissão para notificações
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(reminder.title, {
              body: reminder.description,
              icon: "icons/icon48.png",
            });
          }
        });
      }
    }, timeDiff);
  }
}

// Inicializar a extensão
renderReminders();
