const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if (email === "admin" && senha === "1234") {
        window.location.href = "../html/TelaInicial.html";
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }
});
