// Employee data types
export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}

// Column configuration types
export interface ColumnConfig {
  field: string;
  headerName: string;
  defaultVisible: boolean;
  valueFormatter?: (params: any) => string;
  cellRenderer?: (params: any) => any;
  cellStyle?: any;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
}

// Search and filter types
export interface DashboardState {
  showColumnFilter: boolean;
  searchText: string;
  quickFilterText: string;
  visibleColumns: Record<string, boolean>;
}

// Grid configuration types
export interface GridConfig {
  paginationPageSize: number;
  paginationPageSizeOptions: number[];
  rowHeight: number;
  headerHeight: number;
}

// Component props types
export interface DashboardProps {
  employees?: Employee[];
  defaultPageSize?: number;
  defaultVisibleColumns?: string[];
}