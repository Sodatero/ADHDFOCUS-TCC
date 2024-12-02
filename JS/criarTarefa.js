document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const taskInput = document.querySelector('input[type="text"]');
    const descriptionInput = document.querySelector("textarea");
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    form.addEventListener("submit", event => {
        event.preventDefault();
        const taskTitle = taskInput.value.trim();
        const taskDescription = descriptionInput.value.trim();
        if (taskTitle) {
            const newTask = {
                title: taskTitle,
                description: taskDescription,
                completed: false,
            };
            storedTasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
            window.location.href = "ListaDeTarefas.html";
        } else {
            alert("O título da tarefa não pode estar vazio.");
        }
    });
});

