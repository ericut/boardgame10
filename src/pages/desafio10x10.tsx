import { useMemo, useState, useContext } from 'react';
// chakra
import { Text, Box, ButtonGroup, Button, IconButton, Flex, Heading, Badge, HStack, Stack } from '@chakra-ui/react';
// componentes
import { Table, THeader, THead, THeadButtons, TBody, TRow, TColumn, TColumnButtons } from '../components/Table/Table';
import Popover from '../components/Popover/Popover';
// icones
import { GiMeeple } from 'react-icons/gi';
import { FaEdit, FaPlus, FaMinus, FaEye, FaEyeSlash, FaCog } from 'react-icons/fa';
import { AiTwotoneCrown } from 'react-icons/ai';
// context
import { ConfiguracoesContext } from '../context/ConfiguracoesContext';
import { ListagemCategoriasContext } from '../context/ListagemCategoriaContext';
import { ListagemJogosContext } from '../context/ListagemJogosContext';
import { EdicaoJogoContext } from '../context/EdicaoJogoContext';

const Desafio10x10 = () => {
  // contexts
  const { listagemJogosData, handleRetirarPartida, handleAcrescentarPartida } = useContext(ListagemJogosContext);
  const { listagemCategoriasData } = useContext(ListagemCategoriasContext);
  const { handleAbrirEdicaoJogo } = useContext(EdicaoJogoContext);
  const { jogosTotais, partidasTotais, handleAbrirConfiguracaoDesafio } = useContext(ConfiguracoesContext);

  const [showHUD, setShowHUD] = useState(true);

  // renderização da listagem de jogos
  const ListagemJogos = useMemo(() => {
    // render dos meeples de número de partidas
    const NumeroPartidas = (partidas: number) => {
      let partidasTotaisMontadas = Array.from({ length: partidasTotais }, (v, k) => k + 1);
      let partidasJogadas = partidasTotaisMontadas.map((item, index) => {
        return (
          <Text color={index + 1 <= partidas ? 'green.500' : '#DDDDDD22'} key={item}>
            <GiMeeple />
          </Text>
        );
      });
      return <>{partidasJogadas}</>;
    };
    // render listagem de categorias
    const ListagemCategorias = (categoria: number[]) => {
      function corPorCategoria(item: string) {
        if (item === 'Cooperativo') {
          return 'green';
        } else if (item === 'Duelo') {
          return 'red';
        }
      }
      return (
        <>
          {listagemCategoriasData
            .filter((item) => categoria.indexOf(item.id) > -1)
            .map((item) => {
              return (
                <Badge key={item.nome} fontSize="9px" mr="5px" colorScheme={corPorCategoria(item.nome)}>
                  {item.nome}
                </Badge>
              );
            })}
        </>
      );
    };

    return listagemJogosData.length !== 0 ? (
      listagemJogosData.slice(0, jogosTotais).map((item, index) => {
        return (
          <TRow key={item.id}>
            <TColumn w="30%" flexDirection="column" justifyContent="center">
              <Text fontSize={{ md: '22px', sm: '16px' }} fontWeight="bold" letterSpacing="-0.7px">
                {item.nome}
              </Text>
              <Stack display={{ md: 'flex', sm: 'none' }} shouldWrapChildren={true}>
                {showHUD ? ListagemCategorias(item.categoria) : ''}
              </Stack>
            </TColumn>
            <TColumn w="50%" alignItems="center">
              <Flex fontSize={{ md: '34px', sm: '22px' }} alignItems="center">
                {NumeroPartidas(+item.partidas)}
                {item.partidas === partidasTotais ? (
                  <Flex color="yellow.500" ml="10px" alignItems="center">
                    <AiTwotoneCrown />
                    <Text display={{ md: 'flex', sm: 'none' }} fontSize="10px" textTransform="uppercase">
                      Finalizado!
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
            </TColumn>
            <TColumnButtons w="20%" alignItems="center">
              {showHUD ? (
                <HStack
                  pt={{ md: '0px', sm: '5px' }}
                  spacing="20px"
                  justifyContent={{ md: 'center', sm: 'space-between' }}
                  w="100%"
                >
                  <Flex>
                    <ButtonGroup size="sm" isAttached>
                      <IconButton
                        aria-label="Retirar Jogada"
                        colorScheme="orange"
                        variant="ghost"
                        icon={<FaMinus />}
                        onClick={() => handleRetirarPartida(item)}
                        isDisabled={item.partidas === 0}
                      />
                      <Button w="52px" isDisabled>
                        {item.partidas}
                      </Button>
                      <IconButton
                        aria-label="Acrescentar Jogada"
                        colorScheme="green"
                        variant="ghost"
                        icon={<FaPlus />}
                        onClick={() => handleAcrescentarPartida(item)}
                        isDisabled={item.partidas >= partidasTotais}
                      />
                    </ButtonGroup>
                  </Flex>
                  <Flex>
                    <IconButton
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      aria-label="Editar Jogo"
                      icon={<FaEdit />}
                      onClick={() => handleAbrirEdicaoJogo(item)}
                    />
                  </Flex>
                </HStack>
              ) : (
                ''
              )}
            </TColumnButtons>
          </TRow>
        );
      })
    ) : (
      <TRow>
        <TColumn w="100%" color="gray.400" fontSize="12px">
          Nenhum jogo encontrado. Clique no botão "Adicionar Jogo" para cadastrar!
        </TColumn>
      </TRow>
    );
  }, [listagemJogosData, listagemCategoriasData, showHUD, partidasTotais, jogosTotais]);

  // renderização geral
  return (
    <>
      <Flex
        w={{ lg: '1300px', md: '100%', sm: '100%' }}
        maxW="100%"
        minH="60vh"
        alignItems="center"
        flexDirection="column"
        py={{ md: '20px', sm: '10px' }}
        m="0 auto"
      >
        <Flex justifyContent="space-between" align="center" w="100%">
          <Flex alignItems="center" w="60%">
            <Heading fontWeight="bold" fontSize={{ md: '32px', sm: '20px' }}>
              Desafio {jogosTotais}x{partidasTotais}
            </Heading>
            <Popover title={`O que é o Desafio ${jogosTotais}x${partidasTotais}?`}>
              Escolha <strong>{jogosTotais} jogos</strong> e jogue cada um deles <strong>{partidasTotais} vezes</strong>
              , o período padrão para as <strong>{jogosTotais * partidasTotais} partidas</strong> é de um ano. Avance na
              trilha dos meeples conforme finalizar as partidas de cada jogo.
              <br />O desafio pode ser feito de forma leve, podendo mudar qualquer um dos jogos, ou de forma pesada onde
              não poderá alterar a lista dos jogos no período ou até finalizar todas as partidas.
            </Popover>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" w="40%">
            <ButtonGroup>
              <Flex>
                <IconButton
                  aria-label="Adicionar Jogo"
                  icon={showHUD ? <FaEyeSlash /> : <FaEye />}
                  colorScheme="gray"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHUD(!showHUD)}
                />
              </Flex>
              <Flex>
                <IconButton
                  display={{ md: 'none', sm: 'flex' }}
                  aria-label="Configurações do Desafio"
                  icon={<FaCog />}
                  colorScheme="gray"
                  size="sm"
                  onClick={() => handleAbrirConfiguracaoDesafio()}
                />
                <Button
                  display={{ md: 'flex', sm: 'none' }}
                  leftIcon={<FaCog />}
                  colorScheme="gray"
                  size="sm"
                  onClick={() => handleAbrirConfiguracaoDesafio()}
                >
                  Configurações
                </Button>
              </Flex>
              <Flex>
                <ButtonGroup size="sm" isAttached>
                  <Button display={{ md: 'block', sm: 'none' }} size="sm" isDisabled>
                    {listagemJogosData.length}/{jogosTotais}
                  </Button>
                  <IconButton
                    display={{ md: 'none', sm: 'flex' }}
                    aria-label="Adicionar Jogo"
                    icon={<FaPlus />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAbrirEdicaoJogo()}
                    isDisabled={listagemJogosData.length >= jogosTotais}
                  />
                  <Button
                    display={{ md: 'flex', sm: 'none' }}
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAbrirEdicaoJogo()}
                    isDisabled={listagemJogosData.length >= jogosTotais}
                  >
                    Adicionar Jogo
                  </Button>
                </ButtonGroup>
              </Flex>
            </ButtonGroup>
          </Flex>
        </Flex>
        <Flex mt={{ md: '40px', sm: '10px' }} w="100%">
          <Box overflowX="auto" w="100%">
            <Table>
              <THeader display={{ md: 'flex', sm: 'none' }}>
                <THead w="30%">Jogos</THead>
                <THead w="50%">Partidas</THead>
                <THeadButtons w="20%">{showHUD ? 'Controle | Editar' : ''}</THeadButtons>
              </THeader>
              <TBody>{ListagemJogos}</TBody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Desafio10x10;
