import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalDelete } from './Modals';
import { red, blue } from '@mui/material/colors';

export function DataTableClient({cols, fetchData, deleteEntity}) {
  const [rows, setRows] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0); // Estado para armazenar o número da página
  const [loading, setLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const newColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    flex: 2 ,
    sortable: false,
    renderCell: (params) => (
      <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.id)}
            sx={{ color: blue['A700'] }} 
          >
          <EditIcon />

          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteModal(params.row.id, params.row.name)}
            sx={{ color: red['A700'] }}
          >
          <DeleteIcon />
          </IconButton>
      </div>
    ),
  }

  cols.push(newColumn);

  const handleEdit = async (id) => {
    navigate(`/clients/edit/${id}`);
  };

  const handleDeleteModal = async (id, name) => {
      setSelectedClientId(id);
      setClientName(name);
      setOpenModal(true);
  };

  const updateRows = async () => {
    if (cachedData[page]) {
      const updatedCachedData = { ...cachedData };
      delete updatedCachedData[page];
      setCachedData(updatedCachedData);
    }
    fetchMoreData(true);
  }

  const handleDelete = async (id) => {
    try{
        if( await deleteEntity(id) ){
            console.log('Client deleted successfully.');
            updateRows();
        } else {
            console.log('Error when trying to delete client.');
        }
    } catch (error) {
        console.log('Error when trying to request delete client.');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedClientId(null);
  };


  const handlePageChange = (newpage) => {
    setPage(newpage['page']); // Atualiza o estado da página quando a página é alterada
  };

  const fetchMoreData = async (upadtePage) => {
    setLoading(true);
  
    if (cachedData[page] && !upadtePage) {
      setRows(cachedData[page]);
    } else {
      let newData = await fetchData(page + 1, 5, 'C');
      
      if (newData != null) {
        setRows(newData.clientes);
        setTotalRow(newData.total);
  
        // Armazene os novos dados em cache
        setCachedData(prevCachedData => ({
          ...prevCachedData,
          [page]: newData.clientes
        }));
      }
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, [page]); // Fetch data whenever page changes

  return (
    <>
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

    {selectedClientId && (
      <ModalDelete
          open={openModal} // Passando estado para controlar a abertura do modal
          onClose={handleCloseModal}
          onEdit={() => handleEdit(selectedClientId)}
          onDelete={() => {
              handleDelete(selectedClientId);
              handleCloseModal(); // Fechar o modal após excluir
          }}
          clientName = {clientName}
      />
    )}
    
  </>
  );
}

export function DataTableAddress({cols, fetchData, deleteEntity}) {
  const [rows, setRows] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressName, setAddressName] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const newColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    flex: 2 ,
    sortable: false,
    renderCell: (params) => (
      <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.id)}
            sx={{ color: blue['A700'] }} 
          >
          <EditIcon />

          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteModal(params.row.id, params.row.name)}
            sx={{ color: red['A700'] }}
          >
          <DeleteIcon />
          </IconButton>
      </div>
    ),
  }

  cols.push(newColumn);

  const handleEdit = async (id) => {
    navigate(`/logradouro/edit/${id}`);
  };

  const handleDeleteModal = async (id, name) => {
      setSelectedAddressId(id);
      setAddressName(name);
      setOpenModal(true);
  };

  const updateRows = async () => {
    if (cachedData[page]) {
      const updatedCachedData = { ...cachedData };
      delete updatedCachedData[page];
      setCachedData(updatedCachedData);
    }
    fetchMoreData(true);
  }

  const handleDelete = async (id) => {
    try{
        if( await deleteEntity(id) ){
            console.log('Address deleted successfully.');
            updateRows();
        } else {
            console.log('Error when trying to delete address.');
        }
    } catch (error) {
        console.log('Error when trying to request delete address.');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAddressId(null);
  };


  const handlePageChange = (newpage) => {
    setPage(newpage['page']);
  };

  const fetchMoreData = async (upadtePage) => {
    setLoading(true);
  
    if (cachedData[page] && !upadtePage) {
      setRows(cachedData[page]);
    } else {
      let newData = await fetchData(page + 1, 5, 'C');
      
      if (newData != null) {
        setRows(newData.addresses);
        setTotalRow(newData.total);
  
        // Armazene os novos dados em cache
        setCachedData(prevCachedData => ({
          ...prevCachedData,
          [page]: newData.addresses
        }));
      }
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, [page]); // Fetch data whenever page changes

  return (
    <>
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

    {selectedAddressId && (
      <ModalDelete
          open={openModal} // Passando estado para controlar a abertura do modal
          onClose={handleCloseModal}
          onEdit={() => handleEdit(selectedAddressId)}
          onDelete={() => {
              handleDelete(selectedAddressId);
              handleCloseModal(); // Fechar o modal após excluir
          }}
          clientName = {addressName}
      />
    )}
    
  </>
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