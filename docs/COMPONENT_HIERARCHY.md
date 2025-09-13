# Component Hierarchy & Folder Structure

## Entry Point Flow
```
main.jsx
├── Provider (Redux)
├── BrowserRouter
└── App.jsx
    ├── Routes
    ├── LoginBox (/)
    ├── Layout + Protected Routes
    │   ├── Dashboard (/dashboard)
    │   ├── Network (/network)
    │   └── Administration (/administration)
    ├── Standalone Routes
    │   ├── AllToolContainer (/network/allToolContainer)
    │   ├── GISToolInterface (/gisToolInterface)
    │   ├── WorkingMeasurementMap (/workingMap)
    │   └── GISProfessionalDashboard (/gisProfessionalDashboard)
    └── QuickMapAccess (Floating)
```

## New Proposed Folder Structure

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # Root component with routes
├── index.css                         # Global styles
│
├── components/                       # All UI components
│   ├── shared/                      # Reusable components
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar/
│   │   │   │   ├── NavbarMain.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   ├── NavLinks.jsx
│   │   │   │   ├── ProfileMenu.jsx
│   │   │   │   └── MobileDrawer.jsx
│   │   │   └── index.js
│   │   ├── ProtectedRoute/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── UI/                      # Common UI components
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── NotificationSystem.jsx
│   │   │   └── QuickMapAccess.jsx
│   │   └── index.js
│   │
│   ├── pages/                       # Page-level components
│   │   ├── Login/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── LoginBox.jsx
│   │   │   ├── LeftImage.jsx
│   │   │   └── index.js
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── RoleSummaryCards.jsx
│   │   │   ├── UserActivityTable.jsx
│   │   │   └── index.js
│   │   ├── Network/
│   │   │   ├── NetworkPage.jsx
│   │   │   └── index.js
│   │   ├── Administration/
│   │   │   ├── AdministrationPage.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── TopBar/
│   │   │   ├── UserDisplay/
│   │   │   ├── DialogContainer/
│   │   │   └── index.js
│   │   └── index.js
│   │
│   ├── gis/                         # GIS-specific components
│   │   ├── Dashboard/               # GIS Professional Dashboard
│   │   │   ├── GISProfessionalDashboard.jsx
│   │   │   ├── Navbar/
│   │   │   │   ├── GISNavbar.jsx
│   │   │   │   ├── SearchBar/
│   │   │   │   │   ├── PlacesSearch.jsx
│   │   │   │   │   └── SearchSuggestions.jsx
│   │   │   │   └── Controls/
│   │   │   │       ├── UndoRedoControls.jsx
│   │   │   │       └── ThemeToggle.jsx
│   │   │   ├── Sidebars/
│   │   │   │   ├── LeftSidebar/
│   │   │   │   │   ├── LeftSidebar.jsx
│   │   │   │   │   ├── ProfessionalTools.jsx
│   │   │   │   │   ├── DataManager.jsx
│   │   │   │   │   ├── UnitsExport.jsx
│   │   │   │   │   ├── BaseMaps.jsx
│   │   │   │   │   ├── DebugTools.jsx
│   │   │   │   │   └── Bookmarks.jsx
│   │   │   │   └── RightSidebar/
│   │   │   │       ├── RightSidebar.jsx
│   │   │   │       ├── ElevationPanel.jsx
│   │   │   │       ├── InfrastructurePanel.jsx
│   │   │   │       ├── ThemeControls.jsx
│   │   │   │       ├── DebugInfo.jsx
│   │   │   │       ├── QuickActions.jsx
│   │   │   │       ├── LayerManagement.jsx
│   │   │   │       └── MapStatistics.jsx
│   │   │   ├── MapArea/
│   │   │   │   ├── MapContainer.jsx
│   │   │   │   └── Overlays/
│   │   │   │       ├── MapControls.jsx
│   │   │   │       ├── CoordinatesDisplay.jsx
│   │   │   │       ├── DebugLogs.jsx
│   │   │   │       ├── MeasurementDisplays.jsx
│   │   │   │       ├── ElevationChart.jsx
│   │   │   │       └── StatusIndicators.jsx
│   │   │   ├── Dialogs/
│   │   │   │   ├── SaveDialogs/
│   │   │   │   │   ├── SaveDistanceDialog.jsx
│   │   │   │   │   ├── SavePolygonDialog.jsx
│   │   │   │   │   └── SavedDataLibraryDialog.jsx
│   │   │   │   ├── BookmarkDialogs/
│   │   │   │   │   ├── BookmarkEditDialog.jsx
│   │   │   │   │   └── BookmarkDeleteDialog.jsx
│   │   │   │   └── ConfirmationDialogs/
│   │   │   │       ├── DeleteMeasurementDialog.jsx
│   │   │   │       └── DeletePolygonDialog.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── WorkingMap/              # Working Measurement Map
│   │   │   ├── WorkingMeasurementMap.jsx
│   │   │   ├── MapCore/
│   │   │   │   ├── GoogleMapWrapper.jsx
│   │   │   │   └── MapEventHandlers.jsx
│   │   │   ├── MeasurementTools/
│   │   │   │   ├── DistanceMeasurement.jsx
│   │   │   │   ├── PolygonMeasurement.jsx
│   │   │   │   ├── ElevationTool.jsx
│   │   │   │   └── InfrastructureTool.jsx
│   │   │   ├── Controls/
│   │   │   │   ├── MeasurementControls.jsx
│   │   │   │   ├── MapControls.jsx
│   │   │   │   └── ViewControls.jsx
│   │   │   ├── DataDisplay/
│   │   │   │   ├── MeasurementResults.jsx
│   │   │   │   ├── LiveReadouts.jsx
│   │   │   │   └── StatusPanel.jsx
│   │   │   ├── Dialogs/
│   │   │   │   ├── SaveMeasurementDialog.jsx
│   │   │   │   ├── SavePolygonDialog.jsx
│   │   │   │   ├── HistoryDialog.jsx
│   │   │   │   └── ConfirmationDialogs.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── Tools/                   # GIS Tool Interfaces
│   │   │   ├── AllToolContainer/
│   │   │   ├── GISToolInterface/
│   │   │   └── MapSearchBox/
│   │   │
│   │   └── index.js
│   └── index.js
│
├── hooks/                           # Custom React hooks
│   ├── shared/                      # Common hooks
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   └── useResponsive.js
│   ├── gis/                         # GIS-specific hooks
│   │   ├── useDebugLogs.js
│   │   ├── useMapControls.js
│   │   ├── useMeasurementData.js
│   │   ├── useSearchFunctionality.js
│   │   ├── useElevation.js
│   │   ├── useRegionAccess.js
│   │   └── useGoogleMaps.js
│   └── index.js
│
├── services/                        # API calls and external services
│   ├── api/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── gisService.js
│   ├── google/
│   │   ├── mapsAPI.js
│   │   ├── placesAPI.js
│   │   └── elevationAPI.js
│   └── index.js
│
├── utils/                          # Utility functions
│   ├── constants/
│   │   ├── gisConstants.js
│   │   ├── mapConstants.js
│   │   └── regionConstants.js
│   ├── helpers/
│   │   ├── measurementUtils.js
│   │   ├── coordinateUtils.js
│   │   ├── formatUtils.js
│   │   └── validationUtils.js
│   ├── storage/
│   │   ├── localStorage.js
│   │   └── sessionStorage.js
│   └── index.js
│
├── redux/                          # State management
│   ├── store.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── userSlice.js
│   │   ├── gisSlice.js
│   │   ├── regionSlice.js
│   │   └── uiSlice.js
│   └── middleware/
│       └── regionMiddleware.js
│
├── styles/                         # Styling
│   ├── theme/
│   │   ├── theme.js
│   │   ├── darkTheme.js
│   │   └── responsive.js
│   ├── components/
│   │   ├── gis.css
│   │   └── shared.css
│   └── globals/
│       └── variables.css
│
└── assets/                         # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

## Component Responsibility Matrix

### Shared Components
- **Layout**: Navigation, routing wrapper
- **ProtectedRoute**: Authentication guard
- **UI Components**: Reusable UI elements

### GIS Components
- **GISProfessionalDashboard**: Main GIS interface (4,791 lines → modular)
- **WorkingMeasurementMap**: Measurement tools (lengthy → modular)

### Custom Hooks
- **useDebugLogs**: Debug logging functionality
- **useMapControls**: Map zoom, center, street view
- **useMeasurementData**: Distance/polygon measurements
- **useSearchFunctionality**: Places API integration
- **useElevation**: Elevation profile tools
- **useRegionAccess**: Region-based access control

### Services
- **Google Maps API**: Map, Places, Elevation services
- **Authentication**: User login/session management
- **GIS Services**: Measurement, data persistence

## Migration Plan
1. ✅ Create folder structure
2. ✅ Extract custom hooks
3. ✅ Refactor GISProfessionalDashboard
4. ✅ Refactor WorkingMeasurementMap  
5. ✅ Add region-based access control
6. ✅ Implement responsive design
7. ✅ Test functionality preservation
