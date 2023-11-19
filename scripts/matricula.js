const urlParams = new URLSearchParams(window.location.search);
const cpf_url = urlParams.get("cpf");
document.addEventListener("DOMContentLoaded", function () {
    // Obtenha o CPF da URL (assumindo que você já tenha essa lógica)
   
    // Faça a requisição para obter a matrícula
    fetch(`http://localhost:8080/matricula/${cpf_url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(matricula => {
            // Verifica se a matrícula está vazia
            if (!matricula) {
                document.getElementById("sem_matricula").style.display = "block";
                
            } else {
                document.getElementById("titulo").style.display = "block";
                document.getElementById("formulario").style.display = "block";
                document.getElementById("adicionar").style.display = "block";
                document.getElementById("sem_matricula").style.display = "none";

                preencherFormulario(matricula);
            }
        })
        .catch(error => {
            console.error(`Erro na requisição: ${error.message}`);
        });
});
function preencherFormulario(matricula) {
    const selectElement = document.getElementById('turmasListar');
    // Preencher os campos do formulário com os dados da matrícula
    document.getElementById("nrMatricula").value = matricula.nrMatricula;
    document.getElementById("aluno").value = matricula.aluno.nomeAluno;
    const date = new Date(matricula.dataMat);
    document.getElementById("dataMat").value = date.toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              });;
    
    document.getElementById("valorTotal").value = "R$ "+matricula.valorTotal;
    document.getElementById("valorMensal").value = "R$ "+matricula.valorMensal;
    document.getElementById("nrParcelas").value = matricula.nrParcelas;
    document.getElementById("dataVencimentoPag").value = matricula.dataVencimentoPag;
    document.getElementById("statusMatricula").value = matricula.statusMatricula ? 'Ativa' : 'Inativa';
    matricula.turmas.forEach(
        turma=>{
            const option = document.createElement('option');
            option.value = turma.atividade.nomeAtv; 
            option.text = turma.atividade.nomeAtv; 
            selectElement.appendChild(option);
        }
    )
    
}
