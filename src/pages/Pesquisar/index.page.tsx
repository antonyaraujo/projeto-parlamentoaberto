import { useState, useEffect } from 'react';
import {
  Box,
  Select,
  Input,
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Image,
} from '@chakra-ui/react';
import api from '../../services/api';
import { InsideContainer, MenuOption } from './style';

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
  const [type, setType] = useState('id');
  const [valorPesquisa, setValorPesquisa] = useState('');

  useEffect(() => {
    api
      .get('')
      .then((response) => setProjectData(response.data.plan1))
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(`ops! ocorreu um erro${err}`);
      });
  }, []);

  useEffect(() => {
    setCurrentData(projectData);
  }, [projectData]);

  function filter(busca: string) {
    const resultado: Projeto[] = [];
    const map = projectData.map((projeto: Projeto) => {
      if (`${projeto[type]}`.includes(busca)) {
        resultado.push(projeto);
      }
    });

    if (resultado.length !== 0) {
      setCurrentData(resultado);
    }
    console.log(resultado);
  }
  return (
    <>
      <Box width="100%" bg="black" top="0" left="0" position="relative">
        <InsideContainer>
          <Flex
            flexDir="row"
            minH="100%"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <Box maxW="30%">
              <Image src="assets/logobranca.png" />
            </Box>
            <MenuOption>Pesquisar</MenuOption>
            <MenuOption>Gráficos</MenuOption>
          </Flex>
        </InsideContainer>
      </Box>
      <Box maxWidth="1440px" padding="32px 32px">
        <Text>Realize a busca do seu projeto</Text>
        <Flex flexDir="row">
          <Select
            placeholder="Select option"
            width="15%"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="idProposicao">ID</option>
            <option value="autores">Autor</option>
            <option value="tipo">Tipo</option>
            <option value="numero">Número</option>
            <option value="assunto">Assunto</option>
          </Select>
          <Input
            placeholder="Insira o valor que deseja"
            name="valor_pesquisa"
            width="70%"
            value={valorPesquisa}
            onChange={(event) => {
              setValorPesquisa(event.target.value);
            }}
          />
          <Button onClick={() => filter(valorPesquisa)}>Pesquisar</Button>
        </Flex>
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
                {currentData &&
                  currentData.map((projeto) => (
                    <Tr key={projeto?.idProposicao}>
                      <Td>{projeto?.idProposicao}</Td>
                      <Td>{projeto?.ano}</Td>
                      <Td>{projeto?.tipo}</Td>
                      <Td>{projeto?.numero}</Td>
                      <Td maxWidth="30%" overflow="hidden">
                        {projeto?.assunto}
                      </Td>
                      <Td>{projeto?.autores}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
