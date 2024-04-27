import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({cols, rows}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        autoPageSize
      />
    </div>
  );
}
