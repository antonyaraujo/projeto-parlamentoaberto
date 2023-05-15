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
} from '@chakra-ui/react';
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
  const [valorPesquisa, setValorPesquisa] = useState<string>();

  useEffect(() => {
    api
      .get('', { params: { tipo: 'assunto', valor: '' } })
      .then((response) => setProjectData(response.data))
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

  const handleChangeValue = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setValorPesquisa(event.target.value);
  };

  const handleChangeTipo = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setType(event.target.value);
  };

  function handleSubmit() {
    useEffect(() => {
      api
        .get('', { params: { tipo: type, valor: valorPesquisa } })
        .then((response) => setProjectData(response.data))
        .catch((err) => console.log(err));
    }, []);
  }

  return (
    <Box>
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
                <form onSubmit={handleSubmit(event)}>
                  <SearchPanel gap="24px">
                    <Select
                      placeholder="Select option"
                      width="10%"
                      minWidth="48px"
                      value={type}
                      variant="filled flushed"
                      border="2px solid black"
                      onChange={handleChangeTipo}
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
                      onChange={handleChangeValue}
                    />
                    <ButtonSearch colorScheme="black" type="submit">
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
                          <Td
                            maxWidth={{ sm: '100px', md: '400px' }}
                            overflow="hidden"
                          >
                            {projeto?.assunto}
                          </Td>
                          <Td
                            maxWidth={{ sm: '100px', md: '300px' }}
                            overflow="hidden"
                          >
                            {projeto?.autores}
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
