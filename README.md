# Employee Dashboard with AG Grid
A dashboard built with React, TypeScript, and AG Grid Community.

# Quick look
- **link**: https://dashboard-with-ag-grid-n2i9.vercel.app/

## 🚀 Features

### Core Functionality

### Data Display
- **10 Default Columns**: Optimized selection of essential employee information
- **Custom Cell Renderers**: Specialized rendering for different data types
- **Zebra Striping**: Alternating row colors for better readability

### User Interface
- **Column Visibility Controls**: Toggle any column on/off via dropdown filter
- **Pagination**: Configurable page sizes (10, 50, 100 items)

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard component
│   └── ag-grid.tsx           # AG Grid configuration and cell renderers
├── data/
│   └── data.json             # Employee data
├── hooks/
│   └── useColumnVisibility.ts # Column visibility management
├── styles/
│   ├── dashboard.css         # Dashboard layout styles
│   ├── dropdown.css          # Column filter dropdown styles
├── types/
│   └── index.ts             # TypeScript interfaces

```

## 🎨 Design Features

### Custom Cell Renderers
- **Status Renderer**: Color-coded active/inactive status with checkmarks
- **Department Renderer**: Color-coded department badges
- **Performance Renderer**: Star rating system with color-coded performance levels
- **Salary Renderer**: Currency formatted display with dollar icon
- **Email Renderer**: Styled email addresses for better visibility


## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/uv84/Dashboard-with-AG-Grid.git
   cd Fact-wise-ag-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎯 Key Components

### Dashboard.tsx
- Main application component
- Manages column visibility state
- Renders header controls and grid container

### ag-grid.tsx
- AG Grid configuration and setup
- Custom cell renderer definitions
- Column definitions and defaults

### useColumnVisibility.ts
- Custom hook for managing column visibility
- Handles select all/deselect all functionality
- Manages dropdown open/close state
