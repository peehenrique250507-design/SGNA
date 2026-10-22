# SGNA | Sistema de Gestão de Notas Acadêmicas

Sistema desenvolvido como parte do Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas, com foco em Programação Web, gerenciamento de notas acadêmicas e integridade dos dados.

## Sobre o projeto

O SGNA (Sistema de Gestão de Notas Acadêmicas) foi idealizado para auxiliar instituições de ensino no gerenciamento de notas, médias e situações acadêmicas dos alunos.

A proposta surgiu a partir de um cenário hipotético no qual uma instituição de ensino utiliza planilhas eletrônicas para registrar e acompanhar o desempenho acadêmico. Esse método pode dificultar a organização das informações, favorecer erros de preenchimento e tornar a conferência dos dados mais trabalhosa.

Como solução, o projeto propõe uma aplicação web básica, complementada por um módulo de auditoria em Python, para demonstrar como a programação pode contribuir para a organização e validação dos registros acadêmicos.

## Objetivos

- Desenvolver uma interface web para gerenciamento de informações acadêmicas.
- Aplicar tecnologias de desenvolvimento front-end.
- Organizar os dados dos alunos em formato JSON.
- Implementar verificações automatizadas de integridade dos dados utilizando Python.
- Identificar inconsistências em notas, médias, situações acadêmicas e matrículas duplicadas.
- Demonstrar testes de validação e identificação de falhas.

## Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|---|---|
| HTML5 | Estrutura da interface web. |
| CSS3 | Estilização e apresentação visual. |
| JavaScript | Interações e regras de funcionamento da interface. |
| JSON | Armazenamento local dos registros de alunos e configurações do sistema. |
| Python 3 | Auditoria e validação dos dados acadêmicos. |
| Git e GitHub | Controle de versão e hospedagem do código-fonte. |

## Estrutura dos arquivos

```text
Solução/
├── index.html
├── style.css
├── script.js
├── database.json
├── security_audit.py
├── package.json
└── README.md
```

O arquivo `package.json` está presente na estrutura inicial do repositório, mas o projeto atualmente não depende do Node.js para executar o módulo de auditoria em Python.

## Funcionalidades do módulo de auditoria

O arquivo `security_audit.py` implementa verificações automatizadas nos registros acadêmicos armazenados em `database.json`.

Entre as verificações previstas estão:

- Validação de notas entre zero e dez.
- Conferência da média calculada a partir das avaliações.
- Verificação da situação acadêmica conforme a média mínima definida.
- Identificação de matrículas duplicadas.
- Verificação da estrutura dos dados armazenados.
- Exibição de mensagens para os problemas identificados.

O módulo realiza uma auditoria de integridade e não modifica automaticamente os registros originais.

## Como executar o projeto

### 1. Requisitos

Para executar o módulo de auditoria, é necessário ter o Python 3 instalado.

A interface web pode ser aberta em um navegador compatível.

### 2. Executar a interface

1. Abra a pasta do projeto no Visual Studio Code.
2. Localize o arquivo `index.html`.
3. Abra-o no navegador. Se necessário, utilize a extensão Live Server do VS Code para facilitar a execução e a atualização da interface.

### 3. Executar a auditoria em Python

Abra o terminal integrado do VS Code na pasta que contém o arquivo `security_audit.py` e execute:

```bash
python security_audit.py
```

No Windows, caso o comando anterior não funcione, tente:

```bash
py security_audit.py
```

O programa analisará os registros de `database.json` e exibirá no terminal os problemas identificados ou uma mensagem informando que nenhuma inconsistência foi encontrada.

## Testes e validação

A auditoria pode ser testada com registros fictícios válidos e inválidos.

Um exemplo de teste consiste em alterar temporariamente uma nota para um valor superior a dez e executar novamente o programa. O resultado esperado é a identificação da nota fora do intervalo permitido.

Após o teste, o registro deve ser restaurado ao valor válido. Os resultados apresentados no relatório acadêmico devem corresponder aos testes efetivamente realizados.

## Segurança e limitações

O módulo Python contribui para a identificação de inconsistências nos dados acadêmicos, mas não substitui um sistema completo de segurança.

A versão atual não deve ser considerada uma aplicação pronta para produção. A autenticação de usuários, o controle de permissões, a proteção contra alterações não autorizadas e a persistência dos dados em um banco de dados apropriado são aspectos que podem ser desenvolvidos em versões futuras.

O arquivo JSON é utilizado como armazenamento local para fins didáticos. A auditoria em Python funciona como um módulo independente e não representa, por si só, um servidor web ou uma integração automática com a interface.

## Contexto acadêmico

Este projeto foi desenvolvido para fins educacionais, com o propósito de aplicar conceitos de Programação Web, organização de dados, validação de informações, testes de software e auditoria básica.

Os dados utilizados para demonstração devem ser fictícios, sem exposição de informações pessoais ou acadêmicas reais.

## Autores

Erica Machado
Giovanna Costa Buitoni
Juliana Soares
Pedro Henrique

Projeto Integrador | Programação Web

2026
