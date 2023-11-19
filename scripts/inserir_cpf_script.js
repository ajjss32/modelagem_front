const cpf = document.getElementById("cpf_input")
const botaoBuscar =document.getElementById("buscar")
botaoBuscar.addEventListener('click', function () {
    window.location.href = "./matricula.html" + "?cpf=" + encodeURIComponent(cpf.value);
});