import * as React from 'react';
import styled from '@emotion/styled';
import { Flex, Icon, Text } from '@chakra-ui/core';
import {
  useTable,
  usePagination,
} from 'react-table';

export function ExpensesTablePagination({
  instance
}) {
    const {
      page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex, pageSize },
  } = instance;
  return (
    <Flex width="fit-content" margin="3rem auto" alignItems="center">
      <Flex alignItems="center">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <Icon name="chevron-left" />
        </button>
        <Text fontSize="sm" opacity={Number(0.2)} fontWeight="medium">
          Prev
        </Text>
      </Flex>
      <Flex
        margin="0 0.5rem"
        background="#eee"
        borderRadius="2px"
        padding="0.09rem 0.2rem"
        alignItems="center"
      >
        <Text color="#6554c0" fontWeight="medium" fontSize="0.7rem">
          {pageIndex + 1}
        </Text>
      </Flex>
      <Flex alignItems="center" marginLeft="0.5rem">
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <Icon name="chevron-right" />
        </button>
        <Text fontSize="sm" opacity={Number(0.2)} fontWeight="medium">
          Next
        </Text>
      </Flex>
    </Flex>
  );
}

export function ExpensesTable({
   columns,
 data,
  loading,
    fetchExpenses,
  filterExpenses,
  pageCount: controlledPageCount,
}) {
     const initialState = {};
     // Destructure these values from the useTable hook
     const tableInstance = useTable(
       {
         columns,
         data,
         initialState,
       },
       usePagination
     );

     const {
       page,
       getTableProps,
       getTableBodyProps,
       headerGroups,
       prepareRow,
     } = tableInstance;

     console.log(tableInstance)
     return (
       <TableStyles>
         <table {...getTableProps()}>
           <thead>
             {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map((column) => (
                   <th {...column.getHeaderProps()}>
                     {column.render("Header")}
                   </th>
                 ))}
               </tr>
             ))}
           </thead>
           <tbody {...getTableBodyProps()}>
             {page &&
               page.map((row, i) => {
                 prepareRow(row);
                 return (
                   <tr key={i} {...row.getRowProps()}>
                     {row.cells.map((cell) => {
                       return (
                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                       );
                     })}
                   </tr>
                 );
               })}
           </tbody>
         </table>
         {/* Use Pagination here */}
         {data.length > 20 && (
           <ExpensesTablePagination instance={tableInstance} />
         )}
       </TableStyles>
     );
   }

export const TableStyles = styled.div`
  width: 100%;
  padding: 1rem;
  overflow-x: auto;

  table {
    border-spacing: 0;
    border: none;
    color: #212242;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tr th {
      text-align: left;
      background: #f6f8fc;
      padding: 0.5rem 1rem;
    }

    tr td {
      padding: 0.5rem 1rem;
    }

    th,
    td {
      margin: 0;
      font-size: 0.875rem;
      border-right: none;
      border-bottom: 1px solid #eee;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

export const TableRender = styled.p`
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
