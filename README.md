## Joga BG <3 Mobile friendly

![Joga BG <3](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/00-logo.svg)

https://www.jogabg.com.br/

Com esta aplicação é possível criar o famoso desafio 10x10 no universo dos jogos de tabuleiro.
O desafio consiste em selecionar 10 jogos e jogar 10 partidas de cada um deles.

| ![Tela Inicial](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/01-tela-inicial.png) | ![Tela Adicionar Jogo](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/02-tela-adicao.png) | ![Tela Configurações do Desafio](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/03-tela-configuracoes.png) |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |

### Recursos

- Possibilidade de configurar o desafio para qualquer quantidade de jogos e partidas entre 1 a 10.
- Cadastro do jogo com categorias para o usuário ter uma visão geral dos tipos de jogos selecionados.
- Andamento do desafio com controles de adição de partida e subtração para eventual correção.
- Tema escuro e claro conforme o usuário preferir.

### Termos de uso

Esta aplicação utiliza "localStorage" do navegador para armezenar os dados cadastrados, estes dados podem ser perdidos caso seja feito uma limpeza no cache ou no armazenamento local do navegador utilizado.
Pode ser utilizada no celular normalmente, pois os navegadores mobile tem "localStorage" implementados.

### Ficha Técnica

- TypeScript
- NextJS
- ChakraUI
- Context API

### Implementações previstas para o projeto

#### Página: Desafio 10x10

- [✔] Controle de estado por Context API
- [❓] Selecionar período para o desafio, com um contador
- [❓] Adicionar dados referente à partida: jogadores e a data [em avaliação]

#### Página: Placar

- [✔] Quadro de ranking de partidas
- [✔] Controle da sessão de partidas
- [✔] Quadro de líderes (jogos vencidos, perdidos, total de jogos jogados)

#### Global

- [✔] Ordenação de tabela
- [❓] Seletor de temas

#### Página: Calculadora Pontuações [em avaliação]

- [❓] Quadro de pontuação de partida, com calculadora simplificada para auxiliar na contagem de pontuação

### Link do Projeto

[Versão Retail] https://www.jogabg.com.br/

[Versão Teste] https://jogabg.vercel.app/
