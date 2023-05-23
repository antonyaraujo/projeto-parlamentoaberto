import { useState, useEffect, SetStateAction } from 'react';
import {
  Box,
  Select,
  Input,
  Flex,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Image,
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, WarningIcon } from '@chakra-ui/icons';
import api from '../../services/api';
import {
  ButtonSearch,
  InsideContainer,
  MenuOption,
  SearchPanel,
  Content,
} from './style';

interface Projeto {
  id: string;
  nome: string;
  assunto: string;
  autores: string;
  tipo: string;
}

export default function Pesquisar() {
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [projectData, setProjectData] = useState<any[]>([]);
  const [type, setType] = useState<string>('id');
  const [valorPesquisa, setValorPesquisa] = useState<string>('');

  // Modals controllers
  const {
    isOpen: isOpenSubject,
    onOpen: onOpenSubject,
    onClose: onCloseSubject,
  } = useDisclosure(); // Detalhes do Projeto
  const {
    isOpen: isOpenAutores,
    onOpen: onOpenAutores,
    onClose: onCloseAutores,
  } = useDisclosure(); // Autores do Projeto
  const [currentProject, setCurrentProject] = useState<any>({ assunto: '' });

  useEffect(() => {
    api
      .get('', { params: { tipo: '', valor: '' } })
      .then((response) => setProjectData(response.data))
      .then((response) => console.log(response))
      .catch((err) => setProjectData([err]));
  }, []);

  useEffect(() => {
    setCurrentData(projectData);
    console.log(projectData);
  }, [projectData]);

  function filter(busca: any) {
    const resultado: Projeto[] = [];
    projectData.map((projeto: any) => {
      if (`${projeto[type]}`.includes(busca)) {
        return resultado.push(projeto);
      }
      return resultado;
    });

    if (resultado.length !== 0) {
      setCurrentData(resultado);
    }
  }

  const handleChangeValue = (event: { target: { value: string } }) => {
    setValorPesquisa(event.target.value);
  };

  const handleChangeTipo = (event: { target: { value: string } }) => {
    setType(event?.target?.value);
  };

  function handleSubmit() {
    console.log(type);
    console.log(valorPesquisa);
    api
      .get('', { params: { tipo: type, valor: valorPesquisa } })
      .then((response) => setProjectData(response.data))
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  function showSubject(project: any) {
    setCurrentProject(project);
    onOpenSubject();
  }

  function showAuthors(project: any) {
    setCurrentProject(project);
    onOpenAutores();
  }

  return (
    <Box>
      <Modal onClose={onCloseSubject} size="xl" isOpen={isOpenSubject}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Detalhes do Projeto {currentProject?.numero} de{' '}
            {currentProject?.ano}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{currentProject?.assunto}</ModalBody>
          <ModalFooter>
            <Button onClick={onCloseSubject}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseAutores} size="xl" isOpen={isOpenAutores}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Autores do Projeto {currentProject?.numero} de {currentProject?.ano}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ol style={{ marginLeft: '25px' }}>
              {currentProject.autores &&
                currentProject?.autores?.map((autor: any) => (
                  <li
                    key={autor}
                    style={{
                      fontWeight: autor.includes(valorPesquisa) ? 600 : 0,
                    }}
                  >
                    {autor}
                  </li>
                ))}
            </ol>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseAutores}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box width="100%" bg="black" top="0" left="0" position="relative">
        <InsideContainer>
          <Content>
            <Box maxW="30%">
              <Image src="assets/logobranca.png" />
            </Box>
            <MenuOption>Pesquisar</MenuOption>
            <MenuOption>Gráficos</MenuOption>
          </Content>
        </InsideContainer>
      </Box>
      <Box width="100%" mt="48px">
        <InsideContainer justifyContent="center" alignContent="center">
          <Content flexDir="column">
            <Box textAlign="left" w="100%" alignItems="left">
              <Text>Realize a busca do seu projeto</Text>
            </Box>
            <Card bgColor="#E6E6E6" w="100%">
              <CardBody minH="10%">
                <form>
                  <SearchPanel gap="24px">
                    <Select
                      placeholder="Select option"
                      width="10%"
                      minWidth="10%"
                      value={type}
                      variant="filled flushed"
                      border="2px solid black"
                      onChange={(e) => setType(e.target.value)}
                      name="tipo"
                    >
                      <option value="id">ID</option>
                      <option value="autores">Autor</option>
                      <option value="ano">Ano</option>
                      <option value="tipo">Tipo</option>
                      <option value="numero">Número</option>
                      <option value="assunto">Assunto</option>
                    </Select>
                    <Input
                      placeholder="Insira o valor que deseja"
                      name="valor_pesquisa"
                      width="70%"
                      variant="filled flushed"
                      border="2px solid black"
                      value={valorPesquisa}
                      onChange={(e) => setValorPesquisa(e.target.value)}
                    />
                    <ButtonSearch
                      colorScheme="black"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      Pesquisar
                    </ButtonSearch>
                  </SearchPanel>
                </form>
              </CardBody>
            </Card>
            <Box>
              <TableContainer mt="24px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Ano</Th>
                      <Th>Tipo</Th>
                      <Th>Numero</Th>
                      <Th>Assunto</Th>
                      <Th>Autores</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentData ? (
                      currentData.map((projeto) => (
                        <Tr key={projeto?.id}>
                          <Td>{projeto?.id}</Td>
                          <Td>{projeto?.ano}</Td>
                          <Td>{projeto?.tipo}</Td>
                          <Td>{projeto?.numero}</Td>
                          <Td gap="5px">
                            <Box
                              maxWidth={{ sm: '100px', md: '400px' }}
                              overflow="hidden"
                            >
                              {projeto?.assunto}
                            </Box>
                            <ButtonSearch
                              size="sm"
                              width="30px"
                              onClick={() => showSubject(projeto)}
                            >
                              <AddIcon />
                            </ButtonSearch>
                          </Td>
                          <Td gap="5px">
                            <Box
                              maxWidth={{ sm: '100px', md: '200px' }}
                              overflow="hidden"
                            >
                              {projeto?.autores}
                            </Box>
                            <ButtonSearch
                              size="sm"
                              width="30px"
                              onClick={() => showAuthors(projeto)}
                            >
                              <AddIcon />
                            </ButtonSearch>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr key="0">
                        <Td>
                          <SkeletonText
                            noOfLines={1}
                            spacing="4"
                            skeletonHeight="2"
                            isLoaded={currentData}
                          />
                        </Td>
                        <Td>
                          <SkeletonText
                            noOfLines={1}
                            spacing="4"
                            skeletonHeight="2"
                            isLoaded={currentData}
                          />
                        </Td>
                        <Td>
                          <SkeletonText
                            noOfLines={1}
                            spacing="10"
                            skeletonHeight="2"
                          />
                        </Td>
                        <Td>
                          <SkeletonText
                            noOfLines={1}
                            spacing="10"
                            skeletonHeight="2"
                          />
                        </Td>
                        <Td>
                          <Skeleton height="20px" w="20px" />
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Content>
        </InsideContainer>
      </Box>
    </Box>
  );
}
