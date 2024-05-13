import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export function DataTable({cols, fetchData}) {
  const [rows, setRows] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0); // Estado para armazenar o número da página
  const [loading, setLoading] = useState(false);


  const handlePageChange = (newpage) => {
    setPage(newpage['page']); // Atualiza o estado da página quando a página é alterada
  };

  const fetchMoreData = async () => {
    setLoading(true);
  
    if (cachedData[page]) {
      setRows(cachedData[page].clientes);
      setTotalRow(cachedData[page].total);

      
    } else {
      // Caso contrário, faça a busca
      let newData = await fetchData(page + 1, 5, 'C');
      console.log('consultando data')
  
      if (newData != null) {
        // Atualize o estado com os novos dados
        setRows(newData.clientes);
        setTotalRow(newData.total);
  
        // Armazene os novos dados em cache
        setCachedData(prevCachedData => ({
          ...prevCachedData,
          [page]: newData
        }));
      }
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, [page]); // Fetch data whenever page changes

  return (
    <div style={{ height: 371, width: '100%' }}>
      <DataGrid
        paginationModel={{ pageSize: 5, page: page }}
        paginationMode='server'
        autoPageSize
        pagination
        rows={rows}
        columns={cols}
        onPaginationModelChange={handlePageChange}
        loading={loading}
        rowCount={totalRow}
      />
    </div>
  );
}

export function DataTableHome({cols, rows}) {
  return (
    <div style={{ height: 371, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        hideFooterPagination
        autoPageSize
        rowsLoadingMode="server"
      />
    </div>
  );
}