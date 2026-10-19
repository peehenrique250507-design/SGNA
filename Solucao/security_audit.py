"""
SGNA Security Audit
Modulo de auditoria de seguranca e integridade dos dados academicos.

Funcionalidades:
- Validar notas e medias.
- Identificar matriculas duplicadas.
- Detectar dados inconsistentes.
- Gerar um relatorio de auditoria.
"""

import json
from pathlib import Path
from collections import Counter


# ==========================================
# 1. CONFIGURACOES
# ==========================================

DIRETORIO = Path(__file__).resolve().parent
ARQUIVO_BANCO = DIRETORIO / "database.json"

MEDIA_MINIMA = 7.0
NOTA_MINIMA = 0.0
NOTA_MAXIMA = 10.0


# ==========================================
# 2. LEITURA DO BANCO DE DADOS
# ==========================================

def carregar_dados():
    """Carrega e verifica a estrutura do arquivo JSON."""

    if not ARQUIVO_BANCO.exists():
        raise FileNotFoundError(
            f"Arquivo nao encontrado: {ARQUIVO_BANCO}"
        )

    with ARQUIVO_BANCO.open("r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    if not isinstance(dados, dict):
        raise ValueError("A estrutura principal deve ser um objeto JSON.")

    if not isinstance(dados.get("alunos"), list):
        raise ValueError("O campo 'alunos' deve conter uma lista.")

    return dados


# ==========================================
# 3. VALIDACAO DE NOTAS
# ==========================================

def nota_valida(nota):
    """Aceita somente numeros entre zero e dez."""

    return (
        isinstance(nota, (int, float))
        and not isinstance(nota, bool)
        and nota == nota  # Rejeita NaN
        and NOTA_MINIMA <= nota <= NOTA_MAXIMA
        and abs(nota) != float("inf")
    )


# ==========================================
# 4. AUDITORIA DOS ALUNOS
# ==========================================

def auditar_alunos(dados):
    """Identifica inconsistencias nos registros academicos."""

    alunos = dados["alunos"]
    problemas = []

    matriculas = []

    # Verificar registros individuais.
    for indice, aluno in enumerate(alunos, start=1):
        if not isinstance(aluno, dict):
            problemas.append(
                f"Registro {indice}: formato de aluno invalido."
            )
            continue

        nome = aluno.get("nome")
        matricula = aluno.get("matricula")
        notas = aluno.get("notas")

        if not isinstance(nome, str) or len(nome.strip()) < 3:
            problemas.append(
                f"Registro {indice}: nome ausente ou invalido."
            )

        if not isinstance(matricula, str) or not matricula.strip():
            problemas.append(
                f"Registro {indice}: matricula ausente ou invalida."
            )
        else:
            matriculas.append(matricula.strip().casefold())

        if not isinstance(notas, dict):
            problemas.append(
                f"Registro {indice}: estrutura de notas invalida."
            )
            continue

        nota1 = notas.get("nota1")
        nota2 = notas.get("nota2")

        if not nota_valida(nota1) or not nota_valida(nota2):
            problemas.append(
                f"Registro {indice}: nota fora do intervalo de 0 a 10."
            )
            continue

        media_calculada = round((nota1 + nota2) / 2, 2)
        media_registrada = aluno.get("media")

        if (
            not isinstance(media_registrada, (int, float))
            or isinstance(media_registrada, bool)
            or not nota_valida(media_registrada)
            or round(media_registrada, 2) != media_calculada
        ):
            problemas.append(
                f"Registro {indice}: media registrada incorretamente. "
                f"Esperada: {media_calculada:.2f}."
            )

        situacao_esperada = (
            "Aprovado"
            if media_calculada >= MEDIA_MINIMA
            else "Reprovado"
        )

        if aluno.get("situacao") != situacao_esperada:
            problemas.append(
                f"Registro {indice}: situacao academica inconsistente. "
                f"Esperada: {situacao_esperada}."
            )

    # Verificar matriculas duplicadas.
    contagem = Counter(matriculas)

    for matricula, quantidade in contagem.items():
        if quantidade > 1:
            problemas.append(
                f"Matricula duplicada: {matricula} "
                f"aparece {quantidade} vezes."
            )

    return problemas


# ==========================================
# 5. RELATORIO DE AUDITORIA
# ==========================================

def executar_auditoria():
    """Executa as verificacoes e apresenta os resultados."""

    print("=" * 48)
    print("SGNA - RELATORIO DE SEGURANCA")
    print("=" * 48)

    try:
        dados = carregar_dados()
        problemas = auditar_alunos(dados)

        print(f"Arquivo analisado: {ARQUIVO_BANCO.name}")
        print(f"Registros encontrados: {len(dados['alunos'])}")
        print()

        if problemas:
            print(f"Problemas encontrados: {len(problemas)}")

            for numero, problema in enumerate(problemas, start=1):
                print(f"{numero}. {problema}")
        else:
            print("Nenhuma inconsistencia identificada.")

        print()
        print("Auditoria concluida.")

    except (OSError, json.JSONDecodeError, ValueError) as erro:
        print(f"Falha na auditoria: {erro}")


# ==========================================
# 6. EXECUCAO
# ==========================================

if __name__ == "__main__":
    executar_auditoria()
