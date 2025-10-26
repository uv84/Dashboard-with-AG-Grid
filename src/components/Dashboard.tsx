import { useMemo, useState, useRef, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";

// Import CSS styles - better approach than programmatic injection
import '../styles/dashboard.css';
import '../styles/dropdown.css';

// Import components and utilities
import { AgGridComponent, getDefaultColumns } from './ag-grid';
import { useColumnVisibility } from '../hooks/useColumnVisibility';
import data from '../data/data.json';

function Dashboard() {
  const [rowData] = useState(data.employees);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Initialize columns and hooks
  const allColumns = useMemo(() => getDefaultColumns(), []);
  const { 
    visibleColumns, 
    showColumnFilter, 
    handleColumnToggle, 
    handleSelectAll, 
    handleDeselectAll, 
    toggleColumnFilter, 
    closeColumnFilter 
  } = useColumnVisibility(allColumns);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeColumnFilter();
      }
    };

    if (showColumnFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnFilter, closeColumnFilter]);



  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="dashboard-container">
      {/* Main Container */}
      <div className="dashboard-main-card">
        {/* Header with Column Filter Controls */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Employee Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Manage and analyze your workforce data
            </p>
          </div>
        
        <div className="dashboard-controls-container">
          {/* Column Filter Button */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={toggleColumnFilter}
            className="dashboard-filter-button"
          >
            <FiFilter size={18} />
            Columns ({Object.values(visibleColumns).filter(Boolean).length})
          </button>

          {/* Column Filter Dropdown */}
          {showColumnFilter && (
            <div className="dropdown">
              <div className="dropdown-header">
                <h4 className="dropdown-title">
                  Select Columns
                </h4>
                <button
                  onClick={closeColumnFilter}
                  className="dropdown-close-button"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Select All / Deselect All buttons */}
              <div className="dropdown-button-container">
                <button
                  onClick={handleSelectAll}
                  className="dropdown-select-all-button"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="dropdown-deselect-all-button"
                >
                  Deselect All
                </button>
              </div>

              <div className="dropdown-column-list">
                {allColumns.map(col => (
                  <label
                    key={col.field}
                    className="dropdown-column-item"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.field]}
                      onChange={() => handleColumnToggle(col.field)}
                      className="dropdown-column-checkbox"
                    />
                    <span className="dropdown-column-label">
                      {col.headerName}
                    </span>
                  </label>
                ))}
              </div>

              <div className="dropdown-summary">
                {Object.values(visibleColumns).filter(Boolean).length} of {allColumns.length} columns selected
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* AG Grid Container */}
      <div className="dashboard-grid-container">
        <AgGridComponent 
          rowData={rowData} 
          visibleColumns={visibleColumns} 
        />
      </div>
      </div>
    </div>
  );
}

export default Dashboard;