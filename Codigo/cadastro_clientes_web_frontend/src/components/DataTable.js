import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'Email', headerName: 'Email', width: 130 }
  ];
  
  const rows = [
    { id: 1, Name: 'Snow', Email: 'Jon'},
    { id: 2, Name: 'Lannister', Email: 'Cersei'},
    { id: 3, Name: 'Lannister', Email: 'Jaime'},
    { id: 4, Name: 'Stark', Email: 'Arya'},
    { id: 5, Name: 'Targaryen', Email: 'Daenerys'},
    { id: 6, Name: 'Melisandre', Email: null},
    { id: 7, Name: 'Clifford', Email: 'Ferrara'},
    { id: 8, Name: 'Frances', Email: 'Rossini'},
    { id: 9, Name: 'Roxie', Email: 'Harvey'},
  ];
  
  export default function DataTable() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    );
  }
