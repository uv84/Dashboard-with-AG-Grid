import { useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz, type RowClassParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { CustomCellRendererProps } from "ag-grid-react";
import { FiDollarSign } from "react-icons/fi";
import type { ColumnConfig, Employee } from '../types';

ModuleRegistry.registerModules([AllCommunityModule]);

// Status Cell Renderer Component
const StatusCellRenderer = (params: CustomCellRendererProps) => {
  const isActive = params.value;
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        padding: '6px 12px',
        borderRadius: '20px',
        
        width: 'fit-content',
        color: isActive ? '#059669' : '#dc2626',
       
      }}
    >
      <span>{isActive ? '✓ Active' : '✗ Inactive'}</span>
    </div>
  );
};

// Department Badge Renderer
const DepartmentRenderer = (params: CustomCellRendererProps) => {
  const department = params.value;
  
  const getDepartmentStyle = (dept: string) => {
    switch (dept) {
      case 'Engineering':
        return { color: '#1e40af'  };
      case 'Marketing':
        return { color: '#7c2d12'};
      case 'Sales':
        return { color: '#059669' };
      case 'HR':
        return { color: '#7c3aed' };
      default:
        return { color: '#374151' };
    }
  };
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '12px',
   
        fontWeight: '600',
        width: 'fit-content',
        ...getDepartmentStyle(department)
      }}
    >
      {department}
    </div>
  );
};

// Performance Rating Renderer
const PerformanceRenderer = (params: CustomCellRendererProps) => {
  const rating = params.value;
  
  const getRatingStyle = (rating: number) => {
    if (rating >= 4.5) {
      return { color: '#059669'};
    } else if (rating >= 3.5) {
      return { color: '#d97706' };
    } else {
      return { color: '#dc2626'};
    }
  };
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: '600',
        padding: '4px 8px',
        borderRadius: '12px',
       
        width: 'fit-content',
        ...getRatingStyle(rating)
      }}
    >
      <span>⭐ {rating}/5</span>
    </div>
  );
};

// Salary Renderer with green color
const SalaryRenderer = (params: CustomCellRendererProps) => {
  const salary = params.value;
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: '600',
        color: '#059669',
        fontSize: '14px'
      }}
    >
      <FiDollarSign size={14} />
      <span>{salary.toLocaleString()}</span>
    </div>
  );
};

// Email Renderer for better visibility
const EmailRenderer = (params: CustomCellRendererProps) => {
  const email = params.value;
  
  return (
    <div 
      style={{
        color: '#3b82f6',
        fontSize: '13px',
        textDecoration: 'none'
      }}
    >
      {email}
    </div>
  );
};

// Default column configurations
// Default visible columns (10): firstName, lastName, email, department, position, salary, hireDate, age, location, status
export const getDefaultColumns = (): ColumnConfig[] => [
  { field: "firstName", headerName: "First Name", defaultVisible: true, flex: 1, minWidth: 120 },
  { field: "lastName", headerName: "Last Name", defaultVisible: true, flex: 1, minWidth: 120 },
  { 
    field: "email", 
    headerName: "Email", 
    defaultVisible: true,
    cellRenderer: EmailRenderer,
    flex: 2,
    minWidth: 250
  },
  { 
    field: "department", 
    headerName: "Department", 
    defaultVisible: true,
    cellRenderer: DepartmentRenderer,
    flex: 1,
    minWidth: 130
  },
  { field: "position", headerName: "Position", defaultVisible: true, flex: 1.2, minWidth: 150 },
  { 
    field: "salary", 
    headerName: "Salary", 
    defaultVisible: true,
    cellRenderer: SalaryRenderer,
    flex: 1,
    minWidth: 120
  },
  { field: "hireDate", headerName: "Hire Date", defaultVisible: true, flex: 1, minWidth: 120 },
  { field: "age", headerName: "Age", defaultVisible: true, flex: 0.8, minWidth: 80 },
  { field: "location", headerName: "Location", defaultVisible: true, flex: 1, minWidth: 120 },
  { 
    field: "performanceRating", 
    headerName: "Performance", 
    defaultVisible: false,
    cellRenderer: PerformanceRenderer,
    flex: 1,
    minWidth: 130
  },
  { field: "projectsCompleted", headerName: "Projects", defaultVisible: false, flex: 0.9, minWidth: 100 },
  { 
    field: "isActive", 
    headerName: "Status", 
    defaultVisible: true,
    cellRenderer: StatusCellRenderer,
    flex: 1,
    minWidth: 110
  },
  { 
    field: "skills", 
    headerName: "Skills", 
    defaultVisible: false,
    flex: 3,
    minWidth: 280
  },
  { field: "manager", headerName: "Manager", defaultVisible: false, flex: 1, minWidth: 130 },
];

// Grid default configuration
export const gridConfig = {
  defaultColDef: {
    filter: true,
    sortable: true,
    resizable: true,
    editable: true,
    cellStyle: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '14px',
      color: '#1e293b',
      borderRight: '1px solid #f1f5f9'
    },
    headerClass: 'custom-header'
  },
  rowHeight: 52,
  headerHeight: 48,
};

// Row styling function
export const getRowStyle = (params: RowClassParams<Employee>) => {
  if (params.node.rowIndex !== null && params.node.rowIndex % 2 === 0) {
    return { background: '#fafbfc' };
  }
  return { background: '#ffffff' };
};

// Generate column definitions for AG Grid
export const generateColumnDefs = (columns: ColumnConfig[], visibleColumns: Record<string, boolean>) => {
  return columns
    .filter(col => visibleColumns[col.field])
    .map(col => ({
      field: col.field,
      headerName: col.headerName,
      filter: true,
      sortable: true,
      resizable: true,
      ...(col.valueFormatter && { valueFormatter: col.valueFormatter }),
      ...(col.cellRenderer && { cellRenderer: col.cellRenderer }),
      ...(col.cellStyle && { cellStyle: col.cellStyle }),
      ...(col.width && { width: col.width }),
      ...(col.minWidth && { minWidth: col.minWidth }),
      ...(col.maxWidth && { maxWidth: col.maxWidth }),
      ...(col.flex && { flex: col.flex })
    }));
};


// AG Grid Component Props
interface AgGridComponentProps {  
  rowData: Employee[];
  visibleColumns: Record<string, boolean>;
}

// AG Grid Component
export const AgGridComponent = ({visibleColumns, rowData}: AgGridComponentProps) => {
  const allColumns = useMemo(() => getDefaultColumns(), []);
  
  // column definitions
  const colDefs = useMemo(() => {
    return generateColumnDefs(allColumns, visibleColumns);
  }, [allColumns, visibleColumns]);


  const defaultColDef = useMemo(() => ({
    ...gridConfig.defaultColDef
  }), []);

  const rowSelection = {
    mode: "multiRow" as const,
    headerCheckbox: true,
  };

  return (
    <div className="dashboard-grid-wrapper">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 50, 100]}
        theme={themeQuartz}
        rowHeight={49}
        headerHeight={50}
        enableCellTextSelection={true}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};


export default AgGridComponent;