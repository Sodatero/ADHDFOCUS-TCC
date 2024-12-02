document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".lista-tarefas");
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => addTaskToList(task));
    function addTaskToList(task) {
        const li = document.createElement("li");
        li.className = "tarefa";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => updateTaskStatus(task.title, checkbox.checked));
        const label = document.createElement("label");
        label.textContent = task.title;
        li.appendChild(checkbox);
        li.appendChild(label);
        taskList.appendChild(li);
    }
    function updateTaskStatus(title, completed) {
        const taskIndex = storedTasks.findIndex(task => task.title === title);
        if (taskIndex !== -1) {
            storedTasks[taskIndex].completed = completed;
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }
    }
});
