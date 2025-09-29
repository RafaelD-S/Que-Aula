<div align="center">

# Changelog

### Versão atual: 2.6.1

</div>

## 2.6.1 - 29/09/2025

- Criação de Pipeline para rodar testes e coverage no projeto em todas as pull requests.
- Correção de bug que não mostrava o dia da semana nos sábados e domingos.
- Equalizar footer com o figma

## 2.6.0 - 26/08/2025

- Mudança da lógica de porcentagem do fluxograma de quantidade de aulas completadas para quantas horas cada matéria representa
- Corrigido bug do formulário em que dados eram substituídos mesmo após ja serem consumidos
- Melhora no consumo do fluxograma para não carregar caso não tenham novos dados
- Desenvolvido testes unitários para todo o projeto

## 2.5.0 - 26/08/2025

- Criação de um preview na página do Form para poder prever as aulas selecionadas antes de gerar um calendário
- Criação de uma versão desktop para a página do fluxograma
- Criação de uma barra de progresso no fluxograma
- Troca do consumo de dados a partir da Railway para Vercel

## 2.4.0 - 14/07/2025

- Mudança do consumo de todas as aulas e aulas do fluxograma de json's estáticos para API
- Refatoração das rotas. Agora quando sem aulas registradas, sempre irá para o forms, e caso não haja página indique isso.
- Refatoração do código para melhores práticas e organização de pastas
- Melhor configuração de eslint para evitar problemas futuros no código

## 2.3.0 - 14/05/2025

- Criação de nova página para mosrar o Fluxograma e controle de matérias ja feitas
- Atualizar readme para informar melhor sobre a página
- Adicionar um warning quando salvar a imagem do calendário para evitar confusão

## 2.2.0 - 08/04/2025

- Adicionar animação aos componentes
- Correções de bug

## 2.1.2 - 08/04/2025

- Atualizar localização de sala
- Trocar imagem de visualização em links

## 2.1.1 - 03/04/2025

- Corrigir bug na verificação de versão

## 2.1.0 - 02/04/2025

- Criar função de atualização da página ao verificar novas versões

## 2.0.0 - 30/03/2025

- Inicio do versionamento
- Criação da página de Calendário
- Criação do componente Warning
- Criação do componente Aside
- Adição de Rotas
- Refatoração geral do código
- Correção de Bugs
