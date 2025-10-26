import { useState, useCallback } from 'react';
import type { ColumnConfig } from '../types';

export const useColumnVisibility = (columns: ColumnConfig[]) => {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => {
      acc[col.field] = col.defaultVisible;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [showColumnFilter, setShowColumnFilter] = useState(false);

  const handleColumnToggle = useCallback((field: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);

  // Select all columns
  const handleSelectAll = useCallback(() => {
    setVisibleColumns(
      columns.reduce((acc, col) => {
        acc[col.field] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );
  }, [columns]);

  // Deselect all columns
  const handleDeselectAll = useCallback(() => {
    setVisibleColumns(
      columns.reduce((acc, col) => {
        acc[col.field] = false;
        return acc;
      }, {} as Record<string, boolean>)
    );
  }, [columns]);

  const toggleColumnFilter = useCallback(() => {
    setShowColumnFilter(prev => !prev);
  }, []);

  const closeColumnFilter = useCallback(() => {
    setShowColumnFilter(false);
  }, []);

  return {
    visibleColumns,
    showColumnFilter,
    handleColumnToggle,
    handleSelectAll,
    handleDeselectAll,
    toggleColumnFilter,
    closeColumnFilter
  };
};