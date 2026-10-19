/*

 * Funcionalidades:
 * - Validar os dados dos alunos
 * - Impedir matrículas duplicadas
 * - Calcular médias
 * - Identificar a situação acadêmica
 * - Exibir os alunos cadastrados
 * - Apresentar mensagens de erro e sucesso
 */

"use strict";

// ==========================================
// 1. CONFIGURAÇÕES DO SISTEMA
// ==========================================

// Média mínima para aprovação.
const MEDIA_MINIMA = 7;

// Limites permitidos para as notas.
const NOTA_MINIMA = 0;
const NOTA_MAXIMA = 10;

// Elementos da página HTML.
const formulario = document.getElementById("form-notas");
const campoNome = document.getElementById("nome");
const campoMatricula = document.getElementById("matricula");
const campoNota1 = document.getElementById("nota1");
const campoNota2 = document.getElementById("nota2");
const listaAlunos = document.getElementById("lista-alunos");
const campoMensagem = document.getElementById("mensagem");

// Lista temporária de alunos.
// Nesta etapa, os dados ficam apenas na memória do navegador.
const alunos = [];

// ==========================================
// 2. FUNÇÕES DE VALIDAÇÃO
// ==========================================

/**
 * Verifica se uma nota é numérica e está entre 0 e 10.
 * @param {number} nota
 * @returns {boolean}
 */
function validarNota(nota) {
    return (
        Number.isFinite(nota) &&
        nota >= NOTA_MINIMA &&
        nota <= NOTA_MAXIMA
    );
}

/**
 * Verifica se o nome contém texto válido.
 * @param {string} nome
 * @returns {boolean}
 */
function validarNome(nome) {
    return typeof nome === "string" && nome.trim().length >= 3;
}

/**
 * Verifica se a matrícula foi informada corretamente.
 * @param {string} matricula
 * @returns {boolean}
 */
function validarMatricula(matricula) {
    return (
        typeof matricula === "string" &&
        /^[a-zA-Z0-9-]{3,20}$/.test(matricula.trim())
    );
}

/**
 * Verifica se a matrícula já está cadastrada.
 * A comparação não diferencia letras maiúsculas e minúsculas.
 * @param {string} matricula
 * @returns {boolean}
 */
function matriculaExiste(matricula) {
    const matriculaNormalizada = matricula.trim().toLowerCase();

    return alunos.some(
        aluno => aluno.matricula.toLowerCase() === matriculaNormalizada
    );
}

// ==========================================
// 3. CÁLCULO DA MÉDIA
// ==========================================

/**
 * Calcula a média aritmética de duas notas.
 * @param {number} nota1
 * @param {number} nota2
 * @returns {number}
 */
function calcularMedia(nota1, nota2) {
    if (!validarNota(nota1) || !validarNota(nota2)) {
        throw new Error("As notas devem estar entre 0 e 10.");
    }

    return Number(((nota1 + nota2) / 2).toFixed(2));
}

/**
 * Define a situação acadêmica do aluno.
 * Média igual ou superior a 7: aprovado.
 * Média inferior a 7: reprovado.
 * @param {number} media
 * @returns {string}
 */
function obterSituacao(media) {
    return media >= MEDIA_MINIMA ? "Aprovado" : "Reprovado";
}

// ==========================================
// 4. MENSAGENS DO SISTEMA
// ==========================================

/**
 * Exibe uma mensagem de sucesso ou erro.
 * @param {string} texto
 * @param {"sucesso"|"erro"} tipo
 */
function exibirMensagem(texto, tipo) {
    campoMensagem.textContent = texto;

    campoMensagem.classList.remove(
        "mensagem-sucesso",
        "mensagem-erro"
    );

    campoMensagem.classList.add(
        tipo === "sucesso" ? "mensagem-sucesso" : "mensagem-erro"
    );
}

// ==========================================
// 5. CADASTRO DE ALUNOS
// ==========================================

/**
 * Lê os campos, valida os dados e cadastra o aluno.
 */
function cadastrarAluno() {
    const nome = campoNome.value.trim();
    const matricula = campoMatricula.value.trim();

    // A validação numérica precisa rejeitar campos vazios.
    // Number("") retorna 0, por isso verificamos os campos antes.
    if (
        campoNota1.value.trim() === "" ||
        campoNota2.value.trim() === ""
    ) {
        exibirMensagem("Informe as duas notas do aluno.", "erro");
        return;
    }

    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);

    // Validar o nome.
    if (!validarNome(nome)) {
        exibirMensagem(
            "O nome deve conter pelo menos 3 caracteres.",
            "erro"
        );
        campoNome.focus();
        return;
    }

    // Validar a matrícula.
    if (!validarMatricula(matricula)) {
        exibirMensagem(
            "A matrícula deve conter de 3 a 20 letras, números ou hífens.",
            "erro"
        );
        campoMatricula.focus();
        return;
    }

    // Impedir matrículas duplicadas.
    if (matriculaExiste(matricula)) {
        exibirMensagem(
            "Já existe um aluno cadastrado com essa matrícula.",
            "erro"
        );
        campoMatricula.focus();
        return;
    }

    // Validar as notas.
    if (!validarNota(nota1) || !validarNota(nota2)) {
        exibirMensagem(
            "As notas devem ser números entre 0 e 10.",
            "erro"
        );
        return;
    }

    // Calcular a média e a situação acadêmica.
    const media = calcularMedia(nota1, nota2);
    const situacao = obterSituacao(media);

    // Criar o objeto do aluno.
    const aluno = {
        nome: nome,
        matricula: matricula,
        nota1: nota1,
        nota2: nota2,
        media: media,
        situacao: situacao
    };

    // Armazenar temporariamente na lista.
    alunos.push(aluno);

    // Atualizar a tabela.
    renderizarAlunos();

    // Informar que o cadastro foi realizado.
    exibirMensagem(
        `Aluno ${nome} cadastrado com sucesso. Média: ${media.toFixed(2)}. Situação: ${situacao}.`,
        "sucesso"
    );

    // Limpar os campos após o cadastro.
    formulario.reset();
    campoNome.focus();
}

// ==========================================
// 6. EXIBIÇÃO DOS ALUNOS
// ==========================================

/**
 * Atualiza a tabela de alunos cadastrados.
 */
function renderizarAlunos() {
    // Limpar o conteúdo anterior da tabela.
    listaAlunos.replaceChildren();

    // Exibir mensagem quando não houver alunos.
    if (alunos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.textContent = "Nenhum aluno cadastrado.";

        linha.appendChild(celula);
        listaAlunos.appendChild(linha);

        return;
    }

    // Criar uma linha para cada aluno.
    alunos.forEach(aluno => {
        const linha = document.createElement("tr");

        const valores = [
            aluno.nome,
            aluno.matricula,
            aluno.nota1.toFixed(1),
            aluno.nota2.toFixed(1),
            aluno.media.toFixed(2)
        ];

        // Inserir os dados como texto, sem interpretar HTML.
        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        // Criar a célula da situação.
        const celulaSituacao = document.createElement("td");
        celulaSituacao.textContent = aluno.situacao;

        celulaSituacao.classList.add(
            aluno.situacao === "Aprovado"
                ? "status-aprovado"
                : "status-reprovado"
        );

        linha.appendChild(celulaSituacao);
        listaAlunos.appendChild(linha);
    });
}

// ==========================================
// 7. EVENTOS DO FORMULÁRIO
// ==========================================

// Impedir que o formulário recarregue a página.
// Em seguida, executar o cadastro do aluno.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    cadastrarAluno();
});

// ==========================================
// 8. INICIALIZAÇÃO
// ==========================================

// Garantir que a tabela comece no estado correto.
renderizarAlunos();

console.log("SGNA iniciado com sucesso.");
