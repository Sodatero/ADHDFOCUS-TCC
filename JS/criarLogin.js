document.getElementById('criarLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrnome = document.getElementById('sobrnome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }
    if (!validarEmail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    console.log('Conta criada com sucesso!');
    alert('Conta criada com sucesso!');
    window.location.href = '../html/Login.html'; 
});
