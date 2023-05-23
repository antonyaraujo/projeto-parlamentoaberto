// @/src/components/Table/index.jsx
import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import styles from './Table.module.css';
import TableFooter from './TableFooter/index.page';
import useTable from '../../hooks/useTable';
import { ButtonSearch } from '../../pages/Pesquisar/style';

export default function Table({
  data,
  rowsPerPage,
  setCurrentProject,
  currentProject,
  onOpenSubject,
  onOpenAutores,
}: any) {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function showSubject(project: any) {
    setCurrentProject(project);
    onOpenSubject();
  }

  function showAuthors(project: any) {
    setCurrentProject(project);
    onOpenAutores();
  }

  return (
    <Box display="flex">
      <table className={styles.table} style={{ maxWidth: '70%' }}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th>ID</th>
            <th>Ano</th>
            <th>Tipo</th>
            <th>Numero</th>
            <th>Assunto</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el: any) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.id}</td>
              <td className={styles.tableCell}>{el.ano}</td>
              <td className={styles.tableCell}>{el.tipo}</td>
              <td className={styles.tableCell}>{el.numero}</td>
              <td className={styles.tableCell}>
                <Box maxWidth={{ sm: '100px', md: '400px' }} overflow="hidden">
                  {el?.assunto}
                </Box>
                <ButtonSearch
                  size="sm"
                  width="30px"
                  type="button"
                  onClick={() => showSubject(el)}
                >
                  <AddIcon />
                </ButtonSearch>
              </td>
              <td className={styles.tableCell}>{el.autores}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box display="flex" maxWidth="50%">
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </Box>
    </Box>
  );
}
