import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Card,
  CardContent,
  Badge,
  IconButton,
  Tooltip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
  Grid,
  AppBar,
  Toolbar,
  InputAdornment,
  Fade,
  Slide,
  Collapse,
  Fab,
  Grow,
  Autocomplete,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  PanTool,
  CropFree,
  Timeline,
  Straighten,
  Business,
  TrendingUp,
  Place,
  Layers,
  Map as MapIcon,
  Satellite,
  Terrain,
  LayersClear,
  Bookmark,
  Settings,
  Fullscreen,
  ZoomIn,
  ZoomOut,
  CenterFocusStrong,
  MyLocation,
  PlayArrow,
  Stop,
  Crop,
  Clear,
  Save,
  History,
  ExpandMore,
  Visibility,
  Upload,
  Download,
  BugReport,
  Code,
  LocationOn,
  Close,
  Search,
  ChevronLeft,
  ChevronRight,
  Public,
  BorderAll,
  Menu,
  MoreVert,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import WorkingMeasurementMap from "./WorkingMeasurementMap";
import MapSearchBox from "./MapSearchBox";
import ProfileMenu from "./2.NavbarPage/2.4 ProfileMenu";

const GISProfessionalDashboard = () => {
  const theme = useTheme();
  const [activeDrawingTool, setActiveDrawingTool] = useState("pan");
  const [activeLayers, setActiveLayers] = useState({
    boundaries: true,
    roads: false,
    buildings: false,
    terrain: false,
    infrastructure: true,
  });
  const [selectedBaseMap, setSelectedBaseMap] = useState("satellite");
  const [bookmarks, setBookmarks] = useState([
    { id: 1, name: "Delhi Metro Area", coords: { lat: 28.6139, lng: 77.209 } },
    { id: 2, name: "Mumbai Central", coords: { lat: 19.076, lng: 72.8777 } },
    { id: 3, name: "Bangalore IT Hub", coords: { lat: 12.9716, lng: 77.5946 } },
  ]);

  // Enhanced UI state
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showIndiaBoundary, setShowIndiaBoundary] = useState(false);
  const [compactMode, setCompactMode] = useState(true);

  // Compact sidebar width for more map space
  const leftDrawerWidth = 250; // Reduced from 280
  const rightDrawerWidth = 320;

  // State for actual WorkingMeasurementMap functionality
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPolygonDrawing, setIsPolygonDrawing] = useState(false);
  const [showElevation, setShowElevation] = useState(false);
  const [elevationMarkers, setElevationMarkers] = useState([]);
  const [showElevationChart, setShowElevationChart] = useState(false);
  const [elevationData, setElevationData] = useState([]);
  const [showInfrastructure, setShowInfrastructure] = useState(false);
  const [points, setPoints] = useState([]);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [loaded, setLoaded] = useState(true);

  // Additional states for functionality
  const [totalDistance, setTotalDistance] = useState(0);
  const [polygonArea, setPolygonArea] = useState(0);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [polygonSaveDialogOpen, setPolygonSaveDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [measurementName, setMeasurementName] = useState("");
  const [polygonName, setPolygonName] = useState("");

  // Live coordinates state
  const [liveCoordinates, setLiveCoordinates] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [mapZoom, setMapZoom] = useState(6);
  const [mouseCoordinates, setMouseCoordinates] = useState(null);
  const [hoverCoordinates, setHoverCoordinates] = useState(null);

  // Units and export state
  const [selectedUnit, setSelectedUnit] = useState("metric");

  // Debug logs state
  const [debugLogs, setDebugLogs] = useState([]);
  const [showDebugLogs, setShowDebugLogs] = useState(false);

  
  // Street View state
  const [streetViewOpen, setStreetViewOpen] = useState(false);
  
  // User profile state
  const [user] = useState({ 
    username: "Himil Chauhan", // Dynamic username
    email: "himil.chauhan@example.com",
    role: "GIS Professional"
  });
  const [loginTime] = useState(new Date().toISOString());
  
  const handleLogout = () => {
    addLog('🚪 Logging out...');
    // Add logout logic here
    window.location.href = '/login';
  };

  // Saved data states
  const [savedMeasurements, setSavedMeasurements] = useState([]);
  const [savedPolygons, setSavedPolygons] = useState([]);
  const [savedElevations, setSavedElevations] = useState([]);
  const [showSavedDataDialog, setShowSavedDataDialog] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState("all"); // 'measurements', 'polygons', 'elevations', 'all'
  const [selectedDataLibraryType, setSelectedDataLibraryType] = useState("both"); // 'distance', 'polygon', 'both'
  const [polygonHistoryDialogOpen, setPolygonHistoryDialogOpen] = useState(false);
  const [polygonToDelete, setPolygonToDelete] = useState(null);
  const [polygonDeleteConfirmOpen, setPolygonDeleteConfirmOpen] = useState(false);

  // Elevation functionality states
  const [elevationMode, setElevationMode] = useState(false);
  const [elevationClickCount, setElevationClickCount] = useState(0);
  const [elevationPoints, setElevationPoints] = useState([]);
  const [elevationChartFullWidth, setElevationChartFullWidth] = useState(false);

  // Undo/Redo functionality removed

  // Search functionality states
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchTimeout = useRef(null);

  // India boundary check function
  const isWithinIndiaBounds = (lat, lng) => {
    // Approximate bounding box for India
    const indiaBounds = {
      north: 37.17,   // Kashmir
      south: 6.45,    // Kanyakumari
      east: 97.4,     // Arunachal Pradesh
      west: 68.1      // Gujarat
    };
    
    return (
      lat >= indiaBounds.south &&
      lat <= indiaBounds.north &&
      lng >= indiaBounds.west &&
      lng <= indiaBounds.east
    );
  };

  // History functionality removed as requested

  // Bookmark editing state
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [bookmarkEditDialogOpen, setBookmarkEditDialogOpen] = useState(false);
  const [editedBookmarkName, setEditedBookmarkName] = useState("");
  const [bookmarkDeleteDialogOpen, setBookmarkDeleteDialogOpen] =
    useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);

  // Ref to access child component functions
  const workingMapRef = useRef(null);

  // Search functionality functions
  const searchPlaces = async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    addLog(`🔍 Searching for: ${searchQuery}`);

    try {
      // Using Text Search (New) API
      const response = await fetch(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyAT5j5Zy8q4XSHLi1arcpkce8CNvbljbUQ",
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location,places.id,places.types"
          },
          body: JSON.stringify({
            textQuery: `${searchQuery} India`,
            regionCode: "IN",
            maxResultCount: 8
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.places && data.places.length > 0) {
        const formattedSuggestions = data.places.map((place) => ({
          id: place.id,
          displayName: place.displayName?.text || "Unknown Place",
          formattedAddress: place.formattedAddress || "",
          location: place.location,
          types: place.types || []
        }));

        setSuggestions(formattedSuggestions);
        addLog(`🎯 Found ${formattedSuggestions.length} places`);
      } else {
        setSuggestions([]);
        addLog(`⚠️ No places found for: ${searchQuery}`);
        fallbackToGeocoding(searchQuery);
      }
    } catch (error) {
      console.error("Places API Error:", error);
      addLog(`❌ Search error: ${error.message}`);
      fallbackToGeocoding(searchQuery);
    }

    setIsSearching(false);
  };

  const fallbackToGeocoding = (searchQuery) => {
    if (!window.google?.maps?.Geocoder || !workingMapRef.current?.map) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      {
        address: `${searchQuery}, India`,
        componentRestrictions: { country: "IN" }
      },
      (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const formattedSuggestions = results
            .slice(0, 5)
            .map((result, index) => ({
              id: result.place_id || `geocode_${index}`,
              displayName:
                result.address_components[0]?.long_name ||
                result.formatted_address.split(",")[0],
              formattedAddress: result.formatted_address,
              location: {
                latitude: result.geometry.location.lat(),
                longitude: result.geometry.location.lng()
              },
              types: result.types || [],
              isGeocoded: true
            }));

          setSuggestions(formattedSuggestions);
          addLog(`🎯 Geocoding found ${formattedSuggestions.length} places`);
        }
      }
    );
  };

  const clearSearchMarkers = () => {
    searchMarkers.forEach((marker) => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    setSearchMarkers([]);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSuggestions([]);
    setSelectedPlace(null);
    clearSearchMarkers();
    addLog('🔍 Search cleared');
  };

  const handleSelectPlace = (suggestion) => {
    if (!suggestion?.location || !workingMapRef.current?.map) return;

    clearSearchMarkers();

    const lat = suggestion.location.latitude;
    const lng = suggestion.location.longitude;
    const position = { lat, lng };

    // Center map on selected location
    workingMapRef.current.map.panTo(position);
    workingMapRef.current.map.setZoom(15);

    // Create search marker
    const marker = new window.google.maps.Marker({
      position,
      map: workingMapRef.current.map,
      title: suggestion.displayName,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });

    // Create info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding:8px; max-width:250px; font-family:Arial,sans-serif;">
          <h4 style="margin:0 0 4px 0; color:#1976d2; font-size:14px;">${suggestion.displayName}</h4>
          <p style="margin:2px 0; color:#555; font-size:12px;"><strong>Address:</strong> ${suggestion.formattedAddress}</p>
          <p style="margin:2px 0; color:#555; font-size:12px;"><strong>Coordinates:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
          ${suggestion.types && suggestion.types.length > 0 ? 
            `<p style="margin:2px 0; color:#555; font-size:12px;"><strong>Type:</strong> ${suggestion.types[0].replace(/_/g, " ")}</p>` : ""}
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(workingMapRef.current.map, marker);
    });

    setSearchMarkers([marker]);
    setSelectedPlace(suggestion);
    
    // Update live coordinates to match search result
    setLiveCoordinates({ lat, lng });
    setSearchValue(suggestion.displayName);
    setSuggestions([]);

    addLog(`📍 Selected: ${suggestion.displayName} at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  const handleSearchInputChange = (event, newValue, reason) => {
    if (reason === 'input') {
      setSearchValue(newValue);
      
      // Clear previous timeout
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      
      // Debounce search requests
      searchTimeout.current = setTimeout(() => {
        searchPlaces(newValue);
      }, 300);
    }
  };

  const baseMaps = [
    {
      id: "satellite",
      name: "SATELLITE",
      description: "HIGH RESOLUTION SATELLITE IMAGERY",
      icon: "🛰️",
    },
    {
      id: "street",
      name: "STREET MAP",
      description: "DETAILED STREET AND ROAD NETWORK",
      icon: "🗺️",
    },
    {
      id: "terrain",
      name: "TERRAIN",
      description: "TOPOGRAPHIC AND ELEVATION DATA",
      icon: "🏔️",
    },
  ];

  const handleLayerToggle = (layerName) => {
    const newValue = !activeLayers[layerName];
    setActiveLayers((prev) => ({
      ...prev,
      [layerName]: newValue,
    }));

    // Pass layer changes to WorkingMeasurementMap
    if (workingMapRef.current && workingMapRef.current.toggleLayer) {
      workingMapRef.current.toggleLayer(layerName, newValue);
    }

    console.log(`🌍 Layer ${layerName} toggled to: ${newValue}`);
  };

  const activeLayersCount = Object.values(activeLayers).filter(Boolean).length;

  // Real functionality handlers
  const handleStartDrawing = () => {
    if (workingMapRef.current && workingMapRef.current.startDrawing) {
      setIsDrawing(true);
      setIsPolygonDrawing(false);
      workingMapRef.current.startDrawing();
      addLog("📏 Started distance measurement");
    }
  };

  const handleStopDrawing = () => {
    if (workingMapRef.current && workingMapRef.current.stopDrawing) {
      setIsDrawing(false);
      workingMapRef.current.stopDrawing();
    }
  };

  const handleStartPolygonDrawing = () => {
    console.log("📐 Dashboard handleStartPolygonDrawing called");
    if (workingMapRef.current && workingMapRef.current.startPolygonDrawing) {
      console.log("✅ Starting polygon drawing...");
      setIsPolygonDrawing(true);
      setIsDrawing(false);
      workingMapRef.current.startPolygonDrawing();
    } else {
      console.error("❌ workingMapRef or startPolygonDrawing not available");
    }
  };

  const handleStopPolygonDrawing = () => {
    console.log("⏹️ Dashboard handleStopPolygonDrawing called");
    if (workingMapRef.current && workingMapRef.current.stopPolygonDrawing) {
      console.log("✅ Stopping polygon drawing...");
      setIsPolygonDrawing(false);
      workingMapRef.current.stopPolygonDrawing();
    } else {
      console.error("❌ workingMapRef or stopPolygonDrawing not available");
    }
  };

  const handleClearAll = () => {
    if (workingMapRef.current && workingMapRef.current.clearAll) {
      workingMapRef.current.clearAll();
      setPoints([]);
      setPolygonPoints([]);
      setIsDrawing(false);
      setIsPolygonDrawing(false);
      setTotalDistance(0);
      setPolygonArea(0);
      addLog("✂️ Cleared all measurements and data");
    }
  };

  const handleShowElevation = () => {
    const newValue = !elevationMode;
    console.log(
      `🏔️ Dashboard handleShowElevation called: ${elevationMode} -> ${newValue}`
    );

    if (newValue) {
      // Starting elevation mode - clear previous data
      setElevationPoints([]);
      setElevationClickCount(0);
      setElevationMarkers([]);
      setShowElevationChart(false);
      setElevationData([]);
      setElevationMode(true);
      setShowElevation(true);
      // Do NOT auto-open sidebar - user controls it manually
      
      // Enable map click handling for elevation
      if (workingMapRef.current?.enableElevationMode) {
        workingMapRef.current.enableElevationMode(true);
      }
      
      addLog("🏔️ Elevation mode activated - Click two points on map to create profile");
    } else {
      // Stopping elevation mode
      setElevationMode(false);
      setShowElevation(false);
      setElevationPoints([]);
      setElevationClickCount(0);
      setElevationMarkers([]);
      setShowElevationChart(false);
      
      // Disable map click handling for elevation
      if (workingMapRef.current?.enableElevationMode) {
        workingMapRef.current.enableElevationMode(false);
      }
      
      addLog("🔴 Elevation mode deactivated");
    }
  };

  // Handle elevation map clicks
  const handleElevationMapClick = (event) => {
    if (!elevationMode) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Check if the point is within India's boundaries
    if (!isWithinIndiaBounds(lat, lng)) {
      addLog(`❌ Cannot place elevation point outside India boundaries`);
      return;
    }

    const newPoint = { lat, lng };

    if (elevationClickCount < 2) {
      const newPoints = [...elevationPoints, newPoint];
      setElevationPoints(newPoints);
      setElevationClickCount(elevationClickCount + 1);

      addLog(
        `📍 Elevation point ${elevationClickCount + 1} selected: ${lat.toFixed(
          6
        )}, ${lng.toFixed(6)}`
      );

      if (elevationClickCount === 1) {
        // We now have 2 points, generate elevation profile
        generateElevationProfile(newPoints);
        // Don't close elevation mode immediately, let user see the result
        addLog('📊 Elevation profile generated successfully!');
      }
    }
  };

  // Handle elevation marker placement
  const handleElevationMarkerAdd = (marker) => {
    const newMarkers = [...elevationMarkers, marker];
    setElevationMarkers(newMarkers);

    addLog(`📍 Elevation marker ${newMarkers.length} placed`);

    // When we have 2 markers, generate elevation profile
    if (newMarkers.length === 2) {
      generateElevationProfile(newMarkers);
    }
  };

  // Generate elevation profile between two points
  const generateElevationProfile = async (markers) => {
    try {
      // Mock elevation data generation (replace with real elevation API)
      const elevationPoints = [];
      const steps = 50;

      for (let i = 0; i <= steps; i++) {
        const ratio = i / steps;
        const lat = markers[0].lat + (markers[1].lat - markers[0].lat) * ratio;
        const lng = markers[0].lng + (markers[1].lng - markers[0].lng) * ratio;

        // Mock elevation calculation (replace with real API call)
        const elevation =
          Math.random() * 1000 + 100 + Math.sin(ratio * Math.PI * 4) * 200;
        const distance = ratio * calculateDistance(markers[0], markers[1]);

        elevationPoints.push({
          lat,
          lng,
          elevation: Math.round(elevation),
          distance: Math.round(distance),
          index: i,
        });
      }

      setElevationData(elevationPoints);
      setShowElevationChart(true);
      addLog(
        `📈 Generated elevation profile with ${elevationPoints.length} data points`
      );
    } catch (error) {
      console.error("Error generating elevation profile:", error);
      addLog("❌ Failed to generate elevation profile");
    }
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (point1, point2) => {
    const R = 6371000; // Earth's radius in meters
    const lat1Rad = (point1.lat * Math.PI) / 180;
    const lat2Rad = (point2.lat * Math.PI) / 180;
    const deltaLatRad = ((point2.lat - point1.lat) * Math.PI) / 180;
    const deltaLngRad = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLngRad / 2) *
        Math.sin(deltaLngRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const handleShowInfrastructure = () => {
    const newValue = !showInfrastructure;
    setShowInfrastructure(newValue);
    
    // Do NOT auto-open sidebar - user controls it manually
    if (newValue) {
      addLog('🏢 Infrastructure mode activated');
    } else {
      addLog('🏢 Infrastructure mode deactivated');
    }
    
    if (workingMapRef.current && workingMapRef.current.setShowInfrastructure) {
      workingMapRef.current.setShowInfrastructure(newValue);
    }
  };

  const handleHistory = () => {
    console.log("📂 History button clicked");
    setShowSavedDataDialog(true);
    addLog("📋 Opened saved data library");
  };

  // Load saved measurements from localStorage
  const loadSavedMeasurements = () => {
    const measurements = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('distance_measurement_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          measurements.push({
            key,
            id: data.id || Date.now(),
            name: data.name || 'Unnamed Measurement',
            distance: data.distance || 0,
            points: data.points || [],
            timestamp: data.timestamp || new Date().toISOString(),
            unit: data.unit || 'metric'
          });
        } catch (error) {
          console.warn('Error loading measurement:', key, error);
        }
      }
    }
    setSavedMeasurements(measurements);
    addLog(`📁 Loaded ${measurements.length} saved measurements`);
  };

  // Load saved polygons from localStorage
  const loadSavedPolygons = () => {
    const polygons = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('polygon_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          polygons.push({
            key,
            id: data.id || Date.now(),
            name: data.name || 'Unnamed Polygon',
            area: data.area || 0,
            points: data.points || [],
            timestamp: data.timestamp || new Date().toISOString(),
            unit: data.unit || 'metric'
          });
        } catch (error) {
          console.warn('Error loading polygon:', key, error);
        }
      }
    }
    setSavedPolygons(polygons);
    addLog(`🔷 Loaded ${polygons.length} saved polygons`);
  };

  const handleSaveDistance = () => {
    setSaveDialogOpen(true);
  };

  const handleSavePolygon = () => {
    console.log("💾 Opening polygon save dialog...");
    setPolygonSaveDialogOpen(true);
  };

  const confirmSavePolygon = () => {
    console.log("✅ Confirming polygon save with name:", polygonName);

    // Save polygon to local state
    const newPolygon = {
      id: Date.now(),
      name: polygonName || `Polygon ${Date.now()}`,
      points: [...polygonPoints],
      area: polygonArea,
      timestamp: new Date().toISOString(),
      unit: selectedUnit,
    };

    try {
      // Save to localStorage with unique key
      const key = `polygon_${newPolygon.id}`;
      localStorage.setItem(key, JSON.stringify(newPolygon));
      
      // Update state
      setSavedPolygons((prev) => [...prev, newPolygon]);
      addLog(`💾 Polygon saved: ${newPolygon.name}`);
      
      // Save to map reference if available
      if (workingMapRef.current && workingMapRef.current.savePolygonData) {
        workingMapRef.current.savePolygonData(
          polygonName || `Polygon ${Date.now()}`
        );
      }
    } catch (error) {
      console.error('Error saving polygon:', error);
      addLog('❌ Failed to save polygon to localStorage');
    }

    setPolygonSaveDialogOpen(false);
    setPolygonName("");
  };

  // Save measurement function - updated with better localStorage handling
  const confirmSaveDistance = () => {
    const newMeasurement = {
      id: Date.now(),
      name: measurementName || `Measurement ${Date.now()}`,
      points: [...points],
      distance: totalDistance,
      timestamp: new Date().toISOString(),
      unit: selectedUnit,
    };

    try {
      // Save to localStorage with unique key
      const key = `distance_measurement_${newMeasurement.id}`;
      localStorage.setItem(key, JSON.stringify(newMeasurement));
      
      // Update state
      setSavedMeasurements((prev) => [...prev, newMeasurement]);
      addLog(`💾 Distance measurement saved: ${newMeasurement.name}`);
      
      // Save to map reference if available
      if (workingMapRef.current && workingMapRef.current.saveMeasurement) {
        workingMapRef.current.saveMeasurement(
          measurementName || `Measurement ${Date.now()}`
        );
      }
    } catch (error) {
      console.error('Error saving measurement:', error);
      addLog('❌ Failed to save measurement to localStorage');
    }

    setSaveDialogOpen(false);
    setMeasurementName("");
  };

  // Save elevation function with localStorage
  const saveElevationProfile = (name) => {
    const newElevation = {
      id: Date.now(),
      name: name || `Elevation Profile ${Date.now()}`,
      points: [...elevationPoints],
      data: [...elevationData],
      timestamp: new Date().toISOString(),
      maxElevation: elevationData.length > 0 ? Math.max(...elevationData.map(d => d.elevation)) : 0,
      minElevation: elevationData.length > 0 ? Math.min(...elevationData.map(d => d.elevation)) : 0,
      totalDistance: elevationData.length > 0 ? elevationData[elevationData.length - 1]?.distance || 0 : 0
    };

    try {
      // Save to localStorage with unique key
      const key = `elevation_${newElevation.id}`;
      localStorage.setItem(key, JSON.stringify(newElevation));
      
      // Update state
      setSavedElevations((prev) => [...prev, newElevation]);
      addLog(`💾 Elevation profile saved: ${newElevation.name}`);
    } catch (error) {
      console.error('Error saving elevation:', error);
      addLog('❌ Failed to save elevation to localStorage');
    }
  };

  // Map control handlers
  const handleZoomIn = () => {
    if (workingMapRef.current?.zoomIn) {
      workingMapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (workingMapRef.current?.zoomOut) {
      workingMapRef.current.zoomOut();
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (workingMapRef.current?.map) {
            workingMapRef.current.map.setCenter({
              lat: latitude,
              lng: longitude,
            });
            workingMapRef.current.map.setZoom(15);
            addLog(`📍 Located at: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        },
        (error) => {
          console.warn("Location not available:", error);
          addLog('❌ Location access denied or unavailable');
        }
      );
    }
  };

  const handleCenterIndia = () => {
    if (workingMapRef.current?.centerOnIndia) {
      workingMapRef.current.centerOnIndia();
      addLog('🇮🇳 Centered map on India');
    }
  };
  
  const handleStreetView = () => {
    if (workingMapRef.current?.map) {
      try {
        // Get current map center coordinates
        const center = workingMapRef.current.map.getCenter();
        const lat = center.lat();
        const lng = center.lng();
        
        // Check if we already have a Street View panorama
        const streetViewService = new window.google.maps.StreetViewService();
        
        // Check if Street View is available at this location
        streetViewService.getPanorama({
          location: { lat, lng },
          radius: 50, // Search within 50 meters
          source: window.google.maps.StreetViewSource.OUTDOOR
        }, (data, status) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            // Street View is available, get or create the panorama
            const streetView = workingMapRef.current.map.getStreetView();
            
            if (!streetViewOpen) {
              // Configure and show Street View
              streetView.setOptions({
                position: data.location.latLng,
                pov: {
                  heading: 0,
                  pitch: 0
                },
                zoom: 1,
                visible: true,
                enableCloseButton: true,
                panControl: true,
                panControlOptions: {
                  position: window.google.maps.ControlPosition.LEFT_TOP
                },
                zoomControl: true,
                addressControl: true,
                linksControl: true,
                motionTracking: false,
                motionTrackingControl: false
              });
              
              // Listen for when Street View is closed
              const closeListener = streetView.addListener('visible_changed', () => {
                if (!streetView.getVisible()) {
                  setStreetViewOpen(false);
                  addLog('🏦 Street View closed');
                  window.google.maps.event.removeListener(closeListener);
                }
              });
              
              streetView.setVisible(true);
              setStreetViewOpen(true);
              addLog(`🏦 Street View opened at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            } else {
              // Close Street View
              streetView.setVisible(false);
              setStreetViewOpen(false);
              addLog('🏦 Street View closed');
            }
          } else {
            // No Street View available, show fallback
            addLog('⚠️ Street View not available at this location');
            
            // Fallback: open Google Street View in new tab
            const streetViewUrl = `https://www.google.com/maps/@${lat},${lng},3a,75y,0h,90t/data=!3m6!1e1!3m4!1s0!2e0!7i16384!8i8192`;
            window.open(streetViewUrl, '_blank', 'noopener,noreferrer');
            addLog('🏦 Street View opened in new tab (fallback)');
          }
        });
      } catch (error) {
        console.error('Street View error:', error);
        addLog('❌ Street View error: ' + error.message);
        
        // Ultimate fallback: open in Google Maps
        const center = workingMapRef.current.map.getCenter();
        const lat = center.lat();
        const lng = center.lng();
        const googleMapsUrl = `https://www.google.com/maps/@${lat},${lng},3a,75y,0h,90t/data=!3m7!1e1!3m5!1s0!2e0!3e5!7i16384!8i8192`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
        addLog('🏦 Opened Google Street View in new tab');
      }
    } else {
      addLog('❌ Map not available for Street View');
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleIndiaBoundaryToggle = () => {
    const newValue = !showIndiaBoundary;
    setShowIndiaBoundary(newValue);
    if (workingMapRef.current?.showIndiaBoundary) {
      workingMapRef.current.showIndiaBoundary(newValue);
    }
    console.log(`🇮🇳 India boundary ${newValue ? "enabled" : "disabled"}`);
  };

  const handleCenterOnIndia = () => {
    if (workingMapRef.current?.centerOnIndia) {
      workingMapRef.current.centerOnIndia();
    }
    console.log("🗺️ Centered map on India");
  };

  // Unit conversion functions
  const formatDistance = (meters) => {
    if (selectedUnit === "imperial") {
      const miles = meters * 0.000621371;
      return miles >= 1
        ? `${miles.toFixed(2)} mi`
        : `${(meters * 3.28084).toFixed(0)} ft`;
    } else {
      return meters >= 1000
        ? `${(meters / 1000).toFixed(2)} km`
        : `${meters.toFixed(0)} m`;
    }
  };

  const formatArea = (squareMeters) => {
    if (selectedUnit === "imperial") {
      const squareMiles = squareMeters * 0.000000386102;
      return squareMiles >= 1
        ? `${squareMiles.toFixed(2)} mi²`
        : `${(squareMeters * 10.7639).toFixed(0)} ft²`;
    } else {
      return squareMeters >= 1000000
        ? `${(squareMeters / 1000000).toFixed(2)} km²`
        : `${squareMeters.toFixed(0)} m²`;
    }
  };

  // Calculate dynamic scale based on zoom level
  const getMapScale = (zoom) => {
    // Approximate scale calculation based on zoom level
    const earthCircumference = 40075000; // Earth's circumference in meters
    const pixelsAtZoom = 256 * Math.pow(2, zoom);
    const metersPerPixel = earthCircumference / pixelsAtZoom;
    const scaleDistance = metersPerPixel * 100; // 100 pixels scale

    if (selectedUnit === "imperial") {
      const feet = scaleDistance * 3.28084;
      const miles = scaleDistance * 0.000621371;
      return miles >= 1 ? `${miles.toFixed(2)} mi` : `${feet.toFixed(0)} ft`;
    } else {
      return scaleDistance >= 1000
        ? `${(scaleDistance / 1000).toFixed(2)} km`
        : `${scaleDistance.toFixed(0)} m`;
    }
  };


  // Bookmark handlers
  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setEditedBookmarkName(bookmark.name);
    setBookmarkEditDialogOpen(true);
  };

  const handleSaveBookmarkEdit = () => {
    if (editingBookmark && editedBookmarkName.trim()) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === editingBookmark.id
            ? { ...b, name: editedBookmarkName.trim() }
            : b
        )
      );
      setBookmarkEditDialogOpen(false);
      setEditingBookmark(null);
      setEditedBookmarkName("");
      console.log(`🌎 Bookmark renamed to: ${editedBookmarkName}`);
    }
  };

  const handleDeleteBookmark = (bookmark) => {
    setBookmarkToDelete(bookmark);
    setBookmarkDeleteDialogOpen(true);
  };

  const confirmDeleteBookmark = () => {
    if (bookmarkToDelete) {
      setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkToDelete.id));
      setBookmarkDeleteDialogOpen(false);
      setBookmarkToDelete(null);
      console.log(`🗑️ Bookmark deleted: ${bookmarkToDelete.name}`);
    }
  };

  // Add log function for debugging and user feedback
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log(logEntry);

    setDebugLogs((prev) => {
      const newLogs = [...prev.slice(-49), logEntry]; // Keep last 50 logs
      return newLogs;
    });
  };


  const loadPolygonData = (polygonData) => {
    if (workingMapRef.current && workingMapRef.current.loadPolygonData) {
      workingMapRef.current.loadPolygonData(polygonData);
      addLog(`✅ Polygon loaded on map: ${polygonData.name}`);
      setPolygonHistoryDialogOpen(false);
    } else {
      addLog('❌ Cannot load polygon - map not ready');
    }
  };

  const deletePolygon = () => {
    if (polygonToDelete) {
      // Check if the deleted polygon is currently loaded on the map
      const isDeletingLoaded = workingMapRef.current?.loadedPolygonKey && polygonToDelete.key === workingMapRef.current.loadedPolygonKey;
      
      // Remove from storage
      localStorage.removeItem(polygonToDelete.key);
      
      // Refresh list
      loadSavedPolygons();
      
      // If it was loaded, clear it from the map immediately
      if (isDeletingLoaded && workingMapRef.current?.clearPolygonData) {
        workingMapRef.current.clearPolygonData();
        addLog(`🗑️ Deleted and cleared from map: ${polygonToDelete.name}`);
      } else {
        addLog(`🗑️ Polygon deleted: ${polygonToDelete.name}`);
      }
      
      setPolygonDeleteConfirmOpen(false);
      setPolygonToDelete(null);
    }
  };

  const showDeletePolygonConfirmation = (polygon) => {
    setPolygonToDelete(polygon);
    setPolygonDeleteConfirmOpen(true);
  };

  const cancelDeletePolygon = () => {
    setPolygonDeleteConfirmOpen(false);
    setPolygonToDelete(null);
  };
  
  // Measurement deletion functionality
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [measurementDeleteConfirmOpen, setMeasurementDeleteConfirmOpen] = useState(false);
  
  const deleteMeasurement = () => {
    if (measurementToDelete) {
      // Check if the deleted measurement is currently loaded on the map
      const isDeletingLoaded = workingMapRef.current?.loadedMeasurementKey && measurementToDelete.key === workingMapRef.current.loadedMeasurementKey;
      
      // Remove from storage
      localStorage.removeItem(measurementToDelete.key);
      
      // Refresh saved measurements list
      const updatedMeasurements = savedMeasurements.filter(m => m.key !== measurementToDelete.key);
      setSavedMeasurements(updatedMeasurements);
      
      // If it was loaded, clear it from the map immediately
      if (isDeletingLoaded && workingMapRef.current?.clearAll) {
        workingMapRef.current.clearAll();
        setPoints([]);
        setTotalDistance(0);
        addLog(`🗑️ Deleted and cleared from map: ${measurementToDelete.name}`);
      } else {
        addLog(`🗑️ Measurement deleted: ${measurementToDelete.name}`);
      }
      
      setMeasurementDeleteConfirmOpen(false);
      setMeasurementToDelete(null);
    }
  };
  
  const showDeleteMeasurementConfirmation = (measurement) => {
    setMeasurementToDelete(measurement);
    setMeasurementDeleteConfirmOpen(true);
  };
  
  const cancelDeleteMeasurement = () => {
    setMeasurementDeleteConfirmOpen(false);
    setMeasurementToDelete(null);
  };

  // Keyboard shortcuts removed as part of undo/redo removal

  // Load saved polygons when dialog opens
  useEffect(() => {
    if (polygonHistoryDialogOpen) {
      loadSavedPolygons();
    }
  }, [polygonHistoryDialogOpen]);

  // Cleanup search on unmount
  useEffect(() => {
    return () => {
      clearSearchMarkers();
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw", // Full viewport width
        maxWidth: "100vw", // Prevent overflow
        overflow: "hidden", // Hide any overflow
        overflowX: "hidden", // Explicitly prevent horizontal scrollbar
        bgcolor: darkMode ? "#0a0a0a" : "#f8f9fa",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        color: darkMode ? "#e0e0e0" : "inherit",
      }}
    >
      {/* Enhanced Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: darkMode ? "grey.900" : "primary.main",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important" }}>
          <IconButton
            color="inherit"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>

          <MapIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            GIS Professional
          </Typography>
          <Chip
            label="Pro"
            size="small"
            color="secondary"
            sx={{ mr: 3, fontWeight: "bold" }}
          />

          {/* Enhanced Search Bar with Autocomplete */}
          <Autocomplete
            freeSolo
            options={suggestions}
            value={selectedPlace}
            inputValue={searchValue}
            loading={isSearching}
            getOptionLabel={(option) => option.displayName || option}
            onInputChange={handleSearchInputChange}
            onChange={(event, newValue) => {
              if (newValue && typeof newValue === 'object') {
                handleSelectPlace(newValue);
              } else if (newValue === null || newValue === '') {
                // Clear search when user clears the input
                handleClearSearch();
              }
            }}
            renderOption={(props, option) => (
              <ListItem {...props} key={option.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                    <LocationOn sx={{ fontSize: 18 }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={option.displayName}
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                    >
                      {option.formattedAddress}
                      {option.types && option.types[0] && (
                        <Chip
                          label={option.types[0].replace(/_/g, " ")}
                          size="small"
                          variant="outlined"
                          sx={{
                            ml: 1,
                            fontSize: "0.6rem",
                            height: 18,
                            textTransform: "capitalize"
                          }}
                        />
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                placeholder="Search places in India..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    borderRadius: "25px",
                    "& fieldset": { border: "none" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                    "&.Mui-focused": { bgcolor: "rgba(255,255,255,0.25)" },
                    "& .MuiAutocomplete-input": { color: "white" },
                  },
                }}
                sx={{
                  "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            )}
            sx={{
              width: 350,
              mr: "auto",
              "& .MuiAutocomplete-popupIndicator": { color: "rgba(255,255,255,0.7)" },
              "& .MuiAutocomplete-clearIndicator": { color: "rgba(255,255,255,0.7)" },
            }}
          />


          {/* Undo/Redo functionality removed as requested */}

          <Tooltip title="Toggle Theme">
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              sx={{ mr: 1 }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <ProfileMenu 
            user={user}
            loginTime={loginTime}
            handleLogout={handleLogout}
          />
          
          <Tooltip title="Toggle Right Panel">
            <IconButton
              color="inherit"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              sx={{ ml: 2 }}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        display: "flex", 
        flex: 1, 
        pt: "64px", 
        width: "100%", 
        maxWidth: "100vw",
        overflow: "hidden", 
        overflowX: "hidden" 
      }}>
        {/* Enhanced Left Sidebar */}
        <Slide
          direction="right"
          in={leftSidebarOpen}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <Drawer
            variant="persistent"
            anchor="left"
            open={leftSidebarOpen}
            sx={{
              width: leftDrawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: leftDrawerWidth,
                boxSizing: "border-box",
                bgcolor: darkMode ? "#1a1a1a" : "#ffffff",
                color: darkMode ? "#ffffff" : "inherit",
                borderRight: `1px solid ${darkMode ? "#333" : "#e3f2fd"}`,
                boxShadow: darkMode
                  ? "2px 0 20px rgba(0,0,0,0.6)"
                  : "2px 0 20px rgba(0,0,0,0.15)",
                top: "64px",
                height: "calc(100vh - 64px)",
                transition: theme.transitions.create(['transform', 'box-shadow'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
                // Custom scrollbar styling
                "& ::-webkit-scrollbar": {
                  width: "6px",
                },
                "& ::-webkit-scrollbar-track": {
                  background: darkMode ? "#2a2a2a" : "#f1f1f1",
                  borderRadius: "3px",
                },
                "& ::-webkit-scrollbar-thumb": {
                  background: darkMode 
                    ? "linear-gradient(180deg, #4a4a4a 0%, #666 100%)"
                    : "linear-gradient(180deg, #c1c1c1 0%, #a1a1a1 100%)",
                  borderRadius: "3px",
                  "&:hover": {
                    background: darkMode
                      ? "linear-gradient(180deg, #5a5a5a 0%, #777 100%)"
                      : "linear-gradient(180deg, #999 0%, #777 100%)",
                  },
                },
                "& ::-webkit-scrollbar-thumb:active": {
                  background: darkMode
                    ? "linear-gradient(180deg, #666 0%, #888 100%)"
                    : "linear-gradient(180deg, #777 0%, #555 100%)",
                },
              },
            }}
          >
            {/* Modern Header */}
            <Box
              sx={{
                p: 1.5,
                background: `linear-gradient(135deg, ${
                  darkMode ? "rgb(63,81,181)" : "#1976D2"
                } 0%, ${darkMode ? "rgb(48,63,159)" : "#1565C0"} 100%)`,
                color: "white",
                textAlign: "center",
                borderBottom: `1px solid ${darkMode ? "grey.700" : "#e3f2fd"}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "1rem",
                  mb: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1
                }}
              >
                📍 Professional Tools
              </Typography>
              <Chip
                label={`${activeLayersCount} Active Layers`}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.25)",
                  color: "white",
                  fontSize: "0.65rem",
                  height: "20px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            </Box>

            <Box sx={{ p: 1, overflow: "auto", height: "calc(100vh - 140px)" }}>
              {/* Compact Stats Bar */}
              <Paper
                sx={{
                  p: 0.5,
                  mb: 0.5,
                  bgcolor: darkMode
                    ? "rgba(66, 165, 245, 0.1)"
                    : alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Grid container spacing={0.5}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        {activeLayersCount}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
                        Layers
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        {points.length}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
                        Points
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        {polygonPoints.length}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
                        Polygon
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* 🛠️ PROFESSIONAL TOOLS */}
              <Accordion
                defaultExpanded
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 28,
                    py: 0.25,
                    "& .MuiAccordionSummary-content": { margin: "2px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.85rem",
                    }}
                  >
                    🛐️ Professional Tools
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <Grid container spacing={0.5}>
                    {/* Row 1: Distance & Polygon - EXACT SAME WIDTH */}
                    <Grid item xs={6}>
                      <Button
                        variant={isDrawing ? "contained" : "outlined"}
                        fullWidth
                        size="small"
                        startIcon={isDrawing ? <Stop /> : <PlayArrow />}
                        onClick={() =>
                          isDrawing ? handleStopDrawing() : handleStartDrawing()
                        }
                        disabled={!loaded}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 1,
                          px: 0.5,
                          minHeight: 38,
                          maxHeight: 38,
                          width: "100%", // EXACT SAME WIDTH
                          borderRadius: 2,
                          background: isDrawing
                            ? "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)"
                            : "transparent",
                          color: isDrawing ? "white" : "#2196F3",
                          borderColor: isDrawing ? "#4CAF50" : "#2196F3",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                          },
                        }}
                      >
                        {isDrawing ? "Stop" : "Distance"}
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant={isPolygonDrawing ? "contained" : "outlined"}
                        fullWidth
                        size="small"
                        startIcon={isPolygonDrawing ? <Stop /> : <Crop />}
                        onClick={() =>
                          isPolygonDrawing
                            ? handleStopPolygonDrawing()
                            : handleStartPolygonDrawing()
                        }
                        disabled={!loaded}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 1,
                          px: 0.5,
                          minHeight: 38,
                          maxHeight: 38,
                          width: "100%", // EXACT SAME WIDTH
                          borderRadius: 2,
                          background: isPolygonDrawing
                            ? "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)"
                            : "transparent",
                          color: isPolygonDrawing ? "white" : "#9C27B0",
                          borderColor: "#9C27B0",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(156, 39, 176, 0.3)",
                          },
                        }}
                      >
                        {isPolygonDrawing ? "Stop" : "Polygon"}
                      </Button>
                    </Grid>

                    {/* Row 2: Elevation & Infrastructure - EXACT SAME WIDTH */}
                    <Grid item xs={6}>
                      <Button
                        variant={showElevation ? "contained" : "outlined"}
                        fullWidth
                        size="small"
                        startIcon={showElevation ? <Stop /> : <TrendingUp />}
                        onClick={handleShowElevation}
                        disabled={!loaded}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 1,
                          px: 0.5,
                          minHeight: 38,
                          maxHeight: 38,
                          width: "100%", // EXACT SAME WIDTH
                          borderRadius: 2,
                          background: showElevation
                            ? "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)"
                            : "transparent",
                          color: showElevation ? "white" : "#FF9800",
                          borderColor: "#FF9800",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(255, 152, 0, 0.3)",
                          },
                        }}
                      >
                        {showElevation ? "Stop" : "Elevation"}
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant={showInfrastructure ? "contained" : "outlined"}
                        fullWidth
                        size="small"
                        startIcon={showInfrastructure ? <Stop /> : <Business />}
                        onClick={handleShowInfrastructure}
                        disabled={!loaded}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 1,
                          px: 0.5,
                          minHeight: 38,
                          maxHeight: 38,
                          width: "100%", // EXACT SAME WIDTH
                          borderRadius: 2,
                          background: showInfrastructure
                            ? "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"
                            : "transparent",
                          color: showInfrastructure ? "white" : "#2196F3",
                          borderColor: "#2196F3",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                          },
                        }}
                      >
                        {showInfrastructure ? "Stop" : "Infrastructure"}
                      </Button>
                    </Grid>

                    {/* Row 3: Clear All - FULL WIDTH */}
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        startIcon={<Clear />}
                        onClick={handleClearAll}
                        disabled={
                          !loaded ||
                          (points.length === 0 && polygonPoints.length === 0)
                        }
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 1,
                          px: 0.5,
                          minHeight: 38,
                          maxHeight: 38,
                          width: "100%", // EXACT SAME WIDTH
                          borderRadius: 2,
                          borderColor: "#FF5722",
                          color: "#FF5722",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 87, 34, 0.08)",
                            transform: "translateY(-1px)",
                          },
                          "&:disabled": {
                            opacity: 0.5,
                          },
                        }}
                      >
                        🧧 Clear
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* 🎯 DATA MANAGER */}
              <Accordion
                defaultExpanded
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 32,
                    py: 0.5,
                    "& .MuiAccordionSummary-content": { margin: "4px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.9rem",
                    }}
                  >
                    🎯 Data Manager
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <Stack spacing={0.75}>
                    {/* Save Actions Grid */}
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: "primary.main",
                          mb: 1,
                          fontSize: "0.7rem",
                        }}
                      >
                        💾 Quick Save
                      </Typography>
                      <Grid container spacing={0.5}>
                        <Grid item xs={6}>
                          <Button
                            variant={
                              points.length >= 2 ? "contained" : "outlined"
                            }
                            fullWidth
                            size="small"
                            startIcon={<Save />}
                            onClick={handleSaveDistance}
                            disabled={!loaded || points.length < 2}
                            sx={{
                              fontSize: "0.65rem",
                              py: 0.8,
                              minHeight: 32,
                              bgcolor:
                                points.length >= 2 ? "#4CAF50" : "transparent",
                              borderColor: "#4CAF50",
                              color: points.length >= 2 ? "white" : "#4CAF50",
                              "&:hover": {
                                bgcolor:
                                  points.length >= 2
                                    ? "#2E7D32"
                                    : "rgba(76, 175, 80, 0.08)",
                              },
                              "&:disabled": { opacity: 0.3 },
                            }}
                          >
                            Distance
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant={
                              polygonPoints.length >= 3
                                ? "contained"
                                : "outlined"
                            }
                            fullWidth
                            size="small"
                            startIcon={<Save />}
                            onClick={handleSavePolygon}
                            disabled={!loaded || polygonPoints.length < 3}
                            sx={{
                              fontSize: "0.65rem",
                              py: 0.8,
                              minHeight: 32,
                              bgcolor:
                                polygonPoints.length >= 3
                                  ? "#9C27B0"
                                  : "transparent",
                              borderColor: "#9C27B0",
                              color:
                                polygonPoints.length >= 3 ? "white" : "#9C27B0",
                              "&:hover": {
                                bgcolor:
                                  polygonPoints.length >= 3
                                    ? "#7B1FA2"
                                    : "rgba(156, 39, 176, 0.08)",
                              },
                              "&:disabled": { opacity: 0.3 },
                            }}
                          >
                            Polygon
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Simplified Saved Data Library */}
                    <Paper
                      sx={{
                        p: 1.5,
                        bgcolor: darkMode ? "#2a2a2a" : "#f8f9fa",
                        borderRadius: 2,
                        border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: "text.primary",
                          mb: 1.5,
                          fontSize: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Visibility sx={{ mr: 0.5, fontSize: 16 }} />
                        Saved Data Library
                      </Typography>

                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        startIcon={<History />}
                        onClick={() => {
                          loadSavedMeasurements();
                          loadSavedPolygons();
                          setShowSavedDataDialog(true);
                        }}
                        disabled={!loaded}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.75rem",
                          py: 1.2,
                          borderRadius: 2,
                          background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
                          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                          },
                          "&:disabled": {
                            opacity: 0.5,
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        📊 View All Saved Data
                      </Button>
                    </Paper>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* 📎 UNITS & EXPORT */}
              <Accordion
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 32,
                    py: 0.5,
                    "& .MuiAccordionSummary-content": { margin: "4px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.9rem",
                    }}
                  >
                    📏 Units & Export
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <Stack spacing={1}>
                    {/* Unit Toggle */}
                    <Paper
                      sx={{
                        p: 1,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", color: "info.main" }}
                        >
                          📏 Measurement Units
                        </Typography>
                        <ToggleButtonGroup
                          value={selectedUnit}
                          exclusive
                          onChange={(e, newUnit) => {
                            if (newUnit) {
                              setSelectedUnit(newUnit);
                              console.log(`📏 Units changed to: ${newUnit}`);
                            }
                          }}
                          size="small"
                          sx={{ height: 28 }}
                        >
                          <ToggleButton
                            value="metric"
                            sx={{ px: 1, py: 0.5, fontSize: "0.7rem" }}
                          >
                            Metric
                          </ToggleButton>
                          <ToggleButton
                            value="imperial"
                            sx={{ px: 1, py: 0.5, fontSize: "0.7rem" }}
                          >
                            Imperial
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontSize: "0.65rem" }}
                      >
                        Distance: km/m • Area: km²/m²
                      </Typography>
                    </Paper>

                    {/* Export Options */}
                    <ButtonGroup variant="outlined" fullWidth size="small">
                      <Button
                        startIcon={<Download />}
                        onClick={() => {
                          const exportData = {
                            timestamp: new Date().toISOString(),
                            measurements: {
                              distance: {
                                value: totalDistance,
                                formatted: `${(totalDistance / 1000).toFixed(
                                  2
                                )} km`,
                                points: points.length,
                              },
                              area: {
                                value: polygonArea,
                                formatted: `${(polygonArea / 1000000).toFixed(
                                  2
                                )} km²`,
                                points: polygonPoints.length,
                              },
                            },
                            coordinates: points.concat(polygonPoints),
                            metadata: {
                              layers: activeLayers,
                              baseMap: selectedBaseMap,
                            },
                          };
                          const blob = new Blob(
                            [JSON.stringify(exportData, null, 2)],
                            { type: "application/json" }
                          );
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `gis-export-${Date.now()}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        sx={{ fontSize: "0.7rem" }}
                      >
                        JSON
                      </Button>
                      <Button
                        startIcon={<Upload />}
                        onClick={() => {
                          const csvHeader =
                            "Type,Name,Latitude,Longitude,Value,Unit\n";
                          const csvRows = [];
                          points.forEach((point, index) => {
                            csvRows.push(
                              `Distance,Point ${index + 1},${point.lat},${
                                point.lng
                              },${totalDistance},meters`
                            );
                          });
                          polygonPoints.forEach((point, index) => {
                            csvRows.push(
                              `Polygon,Point ${index + 1},${point.lat},${
                                point.lng
                              },${polygonArea},square_meters`
                            );
                          });
                          const csvContent = csvHeader + csvRows.join("\n");
                          const blob = new Blob([csvContent], {
                            type: "text/csv",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `gis-coordinates-${Date.now()}.csv`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        sx={{ fontSize: "0.7rem" }}
                      >
                        CSV
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* 🗺️ BASE MAPS - Compact Version */}
              <Accordion
                defaultExpanded
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 28,
                    py: 0.25,
                    "& .MuiAccordionSummary-content": { margin: "2px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.85rem",
                    }}
                  >
                    🗺️ Base Maps
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <ToggleButtonGroup
                    value={selectedBaseMap}
                    exclusive
                    onChange={(e, newMap) => {
                      if (newMap) setSelectedBaseMap(newMap);
                    }}
                    orientation="vertical"
                    fullWidth
                    size="small"
                  >
                    {baseMaps.map((map) => (
                      <ToggleButton
                        key={map.id}
                        value={map.id}
                        sx={{
                          justifyContent: "flex-start",
                          textAlign: "left",
                          py: 0.5,
                          minHeight: 32,
                          border: "1px solid #e0e0e0 !important",
                          "&.Mui-selected": {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            borderColor: `${theme.palette.primary.main} !important`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography sx={{ mr: 1, fontSize: "1rem" }}>
                            {map.icon}
                          </Typography>
                          <Box sx={{ textAlign: "left" }}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              textTransform="none"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              {map.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              textTransform="none"
                              sx={{ fontSize: "0.6rem" }}
                            >
                              {map.description}
                            </Typography>
                          </Box>
                        </Box>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </AccordionDetails>
              </Accordion>

              {/* 🐛 DEBUG CONTROLS */}
              <Accordion
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 32,
                    py: 0.5,
                    "& .MuiAccordionSummary-content": { margin: "4px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.9rem",
                    }}
                  >
                    🐛 Debug Tools
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <Stack direction="row" spacing={0.5}>
                    <Button
                      variant={showDebugLogs ? "contained" : "outlined"}
                      fullWidth
                      size="small"
                      startIcon={showDebugLogs ? <Visibility /> : <Code />}
                      onClick={() => {
                        setShowDebugLogs(!showDebugLogs);
                        console.log(
                          `🐛 Debug logs ${
                            !showDebugLogs ? "enabled" : "disabled"
                          }`
                        );
                      }}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.7rem",
                        py: 1,
                        borderRadius: 2,
                        borderColor: showDebugLogs ? "#4CAF50" : "#6c757d",
                        color: showDebugLogs ? "white" : "#6c757d",
                        backgroundColor: showDebugLogs
                          ? "#4CAF50"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: showDebugLogs
                            ? "#388E3C"
                            : "rgba(108, 117, 125, 0.1)",
                          borderColor: showDebugLogs ? "#388E3C" : "#495057",
                        },
                      }}
                    >
                      {showDebugLogs ? "Hide Logs" : "Show Logs"}
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* 📖 BOOKMARKS */}
              <Accordion
                defaultExpanded
                sx={{
                  mb: 0.25,
                  boxShadow: "none",
                  border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 32,
                    py: 0.5,
                    "& .MuiAccordionSummary-content": { margin: "4px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976D2",
                      fontSize: "0.9rem",
                    }}
                  >
                    🔖 Quick Bookmarks ({bookmarks.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0.5, pt: 0 }}>
                  <Stack spacing={1}>
                    {/* Add Current Location Button */}
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      startIcon={<Place />}
                      onClick={() => {
                        // Add current center point as bookmark using live coordinates
                        const newBookmark = {
                          id: Date.now(),
                          name: `Location ${bookmarks.length + 1}`,
                          coords: {
                            lat: liveCoordinates.lat,
                            lng: liveCoordinates.lng,
                          },
                          timestamp: new Date().toLocaleString(),
                          zoom: mapZoom,
                        };
                        setBookmarks((prev) => [...prev, newBookmark]);
                        console.log(
                          `🔖 Bookmark saved at: ${liveCoordinates.lat.toFixed(
                            6
                          )}, ${liveCoordinates.lng.toFixed(6)}`
                        );
                      }}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.7rem",
                        py: 0.8,
                        borderColor: "#4CAF50",
                        color: "#4CAF50",
                        "&:hover": {
                          backgroundColor: "rgba(76, 175, 80, 0.08)",
                          borderColor: "#2E7D32",
                        },
                      }}
                    >
                      Add Current View
                    </Button>

                    {bookmarks.length === 0 ? (
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.05),
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        <Bookmark
                          sx={{ fontSize: 32, color: "info.main", mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          No bookmarks yet. Click "Add Current View" to save
                          locations.
                        </Typography>
                      </Paper>
                    ) : (
                      <Stack spacing={0.5}>
                        {bookmarks.map((bookmark) => (
                          <Paper
                            key={bookmark.id}
                            variant="outlined"
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: alpha(
                                  theme.palette.primary.main,
                                  0.05
                                ),
                                borderColor: "primary.main",
                                transform: "translateY(-1px)",
                                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.2)",
                              },
                            }}
                            onClick={() => {
                              console.log(
                                `🎯 Navigating to bookmark: ${bookmark.name}`
                              );
                              console.log(
                                `🗺 Coordinates: ${bookmark.coords.lat}, ${bookmark.coords.lng}`
                              );
                              // Navigate to the exact bookmark location
                              if (workingMapRef.current?.map) {
                                workingMapRef.current.map.panTo(
                                  bookmark.coords
                                );
                                workingMapRef.current.map.setZoom(
                                  bookmark.zoom || 12
                                );
                                console.log(
                                  `✅ Map navigated to bookmark location`
                                );
                              } else {
                                console.error(
                                  "❌ WorkingMapRef not available for navigation"
                                );
                              }
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Bookmark color="primary" sx={{ fontSize: 16 }} />
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="body2"
                                  fontWeight="medium"
                                  noWrap
                                >
                                  {bookmark.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontSize: "0.65rem" }}
                                >
                                  {bookmark.coords.lat.toFixed(4)}°,{" "}
                                  {bookmark.coords.lng.toFixed(4)}°
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="Edit bookmark">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditBookmark(bookmark);
                                    }}
                                    sx={{
                                      color: "primary.main",
                                      opacity: 0.7,
                                      "&:hover": { opacity: 1 },
                                    }}
                                  >
                                    <Settings sx={{ fontSize: 14 }} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete bookmark">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteBookmark(bookmark);
                                    }}
                                    sx={{
                                      color: "error.main",
                                      opacity: 0.7,
                                      "&:hover": { opacity: 1 },
                                    }}
                                  >
                                    <Clear sx={{ fontSize: 14 }} />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </Stack>
                          </Paper>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Drawer>
        </Slide>

        {/* Main Map Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            position: "relative",
            // Remove left margin - let sidebar overlay the map instead
            ml: 0,
            // Don't adjust right margin - let right sidebar overlay
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            overflow: "hidden",
            width: '100vw', // Full viewport width
            height: 'calc(100vh - 64px)', // Full height minus navbar
          }}
        >
          {/* Enhanced Map with Integrated Search */}
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <WorkingMeasurementMap
              ref={workingMapRef}
              hideControls={true}
              hideHeader={true}
              isDrawing={isDrawing}
              isPolygonDrawing={isPolygonDrawing}
              showElevation={showElevation}
              elevationMode={elevationMode}
              showInfrastructure={showInfrastructure}
              selectedBaseMap={selectedBaseMap}
              enableBoundaryCheck={true}
              restrictToIndia={true}
              onDrawingChange={setIsDrawing}
              onPolygonDrawingChange={setIsPolygonDrawing}
              onPointsChange={setPoints}
              onPolygonPointsChange={setPolygonPoints}
              onTotalDistanceChange={setTotalDistance}
              onPolygonAreaChange={setPolygonArea}
              onCoordinatesChange={setLiveCoordinates}
              onZoomChange={setMapZoom}
              onLogsChange={(logs) => {
                setDebugLogs(logs);
                // Pass the logs back to the parent if needed
              }}
              onMouseCoordinatesChange={setHoverCoordinates}
              onElevationMapClick={handleElevationMapClick}
              onElevationGenerated={(data, points) => {
                // Receive elevation data from WorkingMeasurementMap
                setElevationData(data);
                if (points) {
                  setElevationPoints(points);
                }
                setShowElevationChart(true);
                addLog(`📊 Received elevation data with ${data.length} points`);
              }}
              elevationClickCount={elevationClickCount}
              showDebugLogs={showDebugLogs}
            />
            
          </Box>

          {/* Green measurement boxes removed as requested */}

          {/* Boundary Loaded Indicator - Above Map Scale */}
          {loaded && (
            <Paper
              sx={{
                position: "absolute",
                bottom: 80, // Above the map scale
                left: 16, // Fixed position, map handles transform
                p: 1,
                bgcolor: "rgba(33, 150, 243, 0.9)",
                color: "white",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.3)",
                zIndex: 1100,
                transition: theme.transitions.create(['left'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold", fontSize: "0.7rem" }}>
                ✅ Boundary Loaded
              </Typography>
            </Paper>
          )}

          {/* Map Controls Overlay - Bottom Left Corner, Above All Other Elements */}
          <Paper
            sx={{
              position: "absolute",
              bottom: 140, // Above boundary indicator
              left: 16, // Fixed position, map handles transform
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 1200,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: theme.transitions.create(['left'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            <Stack spacing={0}>
              <Tooltip title="Zoom In" placement="right">
                <IconButton size="small" onClick={handleZoomIn}>
                  <ZoomIn />
                </IconButton>
              </Tooltip>
              <Divider />
              <Tooltip title="Zoom Out" placement="right">
                <IconButton size="small" onClick={handleZoomOut}>
                  <ZoomOut />
                </IconButton>
              </Tooltip>
              <Divider />
              <Tooltip title="My Location" placement="right">
                <IconButton size="small" onClick={handleMyLocation}>
                  <MyLocation />
                </IconButton>
              </Tooltip>
              <Divider />
              <Tooltip title="Center on India" placement="right">
                <IconButton size="small" onClick={handleCenterIndia}>
                  <CenterFocusStrong />
                </IconButton>
              </Tooltip>
              <Divider />
              <Tooltip title="Street View" placement="right">
                <IconButton 
                  size="small" 
                  onClick={handleStreetView}
                  sx={{
                    color: streetViewOpen ? "primary.main" : "inherit",
                    bgcolor: streetViewOpen ? "rgba(25, 118, 210, 0.1)" : "transparent",
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Divider />
              <Tooltip title="Fullscreen" placement="right">
                <IconButton size="small" onClick={handleFullscreen}>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>


          {/* Map Scale Display - Bottom Left */}
          <Paper
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16, // Fixed position, map handles transform
              p: 1,
              bgcolor: darkMode
                ? "rgba(0, 0, 0, 0.85)"
                : "rgba(255, 255, 255, 0.95)",
              color: darkMode ? "#fff" : "inherit",
              zIndex: 1000,
              borderRadius: 2,
              transition: theme.transitions.create(['left'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {getMapScale(mapZoom)}
            </Typography>
          </Paper>

          {/* Live Coordinates and Zoom Display - Bottom Right */}
          <Paper
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16, // Fixed position, doesn't move with sidebar
              p: 1,
              bgcolor: darkMode
                ? "rgba(0, 0, 0, 0.85)"
                : "rgba(255, 255, 255, 0.95)",
              color: darkMode ? "#fff" : "inherit",
              zIndex: 1000,
              borderRadius: 2,
              minWidth: 200,
              // No transition needed as position is now fixed
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", display: "block" }}
            >
              {hoverCoordinates ? "🖱️ Mouse Position" : "📍 Map Center"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: hoverCoordinates ? "primary.main" : "inherit",
                fontWeight: hoverCoordinates ? "bold" : "normal",
              }}
            >
              Lat: {(hoverCoordinates || liveCoordinates).lat.toFixed(6)}°
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: hoverCoordinates ? "primary.main" : "inherit",
                fontWeight: hoverCoordinates ? "bold" : "normal",
              }}
            >
              Lng: {(hoverCoordinates || liveCoordinates).lng.toFixed(6)}°
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
            >
              🔍 Zoom: {mapZoom}
            </Typography>
            {elevationMode && (
              <>
                <br />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    display: "block",
                    mt: 1,
                    color: "warning.main",
                    fontSize: "0.7rem",
                  }}
                >
                  🏔️ Elevation Mode: Click{" "}
                  {elevationClickCount === 0 ? "first" : "second"} point
                </Typography>
              </>
            )}
          </Paper>

          {/* Live Debug Logs Overlay - Top Center */}
          {showDebugLogs && debugLogs.length > 0 && (
            <Paper
              sx={{
                position: "absolute",
                top: 80,
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: 600,
                minWidth: 400,
                p: 1.5,
                bgcolor: "rgba(0, 0, 0, 0.85)",
                color: "#00FF00",
                zIndex: 1400,
                borderRadius: 3,
                fontFamily: "monospace",
                border: "1px solid rgba(0, 255, 0, 0.4)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 6px 25px rgba(0, 255, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: "#00FF00", 
                    fontWeight: "bold", 
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5
                  }}
                >
                  🐛 LIVE DEBUG LOGS ({debugLogs.length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowDebugLogs(false)}
                  sx={{ 
                    color: "#FF5722", 
                    p: 0.5,
                    "&:hover": {
                      bgcolor: "rgba(255, 87, 34, 0.2)",
                      transform: "scale(1.1)"
                    }
                  }}
                >
                  <Close sx={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
              <Box sx={{ maxHeight: 200, overflow: "auto" }}>
                {debugLogs.slice(-10).map((log, index) => {
                  const isRecent = index >= debugLogs.slice(-10).length - 3;
                  return (
                    <Typography
                      key={`debug-log-${debugLogs.length - 10 + index}`}
                      variant="caption"
                      sx={{
                        display: "block",
                        color: log.includes("❌")
                          ? "#FF5722"
                          : log.includes("⚠️")
                          ? "#FF9800"
                          : log.includes("✅")
                          ? "#4CAF50"
                          : log.includes("🔍")
                          ? "#2196F3"
                          : log.includes("📍")
                          ? "#9C27B0"
                          : log.includes("📏")
                          ? "#4CAF50"
                          : log.includes("🏦")
                          ? "#FF9800"
                          : "#00FF00",
                        fontSize: "0.7rem",
                        fontFamily: "monospace",
                        lineHeight: 1.3,
                        opacity: isRecent ? 1 : 0.7,
                        fontWeight: isRecent ? "bold" : "normal",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        py: 0.2,
                        animation: isRecent ? "fadeIn 0.3s ease" : "none",
                        borderLeft: isRecent ? "2px solid #00FF00" : "none",
                        pl: isRecent ? 1 : 0,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          opacity: 1,
                          transform: "translateX(4px)",
                          bgcolor: "rgba(0, 255, 0, 0.05)"
                        }
                      }}
                    >
                      {log}
                    </Typography>
                  )
                })}
              </Box>
              {debugLogs.length > 10 && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: "#666",
                    fontSize: "0.6rem",
                    mt: 0.5,
                    fontStyle: "italic"
                  }}
                >
                  Showing last 10 of {debugLogs.length} logs
                </Typography>
              )}
            </Paper>
          )}

          {/* Full-width Elevation Chart Overlay */}
          {showElevationChart && (
            <Paper
              sx={{
                position: "absolute",
                bottom: 0,
                left: elevationChartFullWidth ? 0 : leftSidebarOpen ? `${leftDrawerWidth}px` : 0,
                right: elevationChartFullWidth ? 0 : rightSidebarOpen ? `${rightDrawerWidth}px` : 0,
                height: elevationChartFullWidth ? 400 : 300,
                bgcolor: darkMode
                  ? "rgba(0, 0, 0, 0.95)"
                  : "rgba(255, 255, 255, 0.98)",
                color: darkMode ? "#fff" : "inherit",
                zIndex: 1500,
                borderTopLeftRadius: elevationChartFullWidth ? 0 : 16,
                borderTopRightRadius: elevationChartFullWidth ? 0 : 16,
                boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
                backdropFilter: "blur(20px)",
                transition: theme.transitions.create(['left', 'right', 'height', 'border-radius'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              <Box sx={{ p: 2, height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TrendingUp sx={{ fontSize: 24, color: "primary.main" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Elevation Profile
                    </Typography>
                    <Chip
                      label={`${elevationData.length} Points`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={`Distance: ${
                        elevationData.length > 0
                          ? formatDistance(
                              elevationData[elevationData.length - 1]
                                ?.distance || 0
                            )
                          : "0"
                      }`}
                      size="small"
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(25, 118, 210, 0.2)"
                          : "rgba(25, 118, 210, 0.1)",
                      }}
                    />
                    <Chip
                      label={`Max Elevation: ${Math.max(
                        ...elevationData.map((d) => d.elevation)
                      )}m`}
                      size="small"
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(76, 175, 80, 0.1)",
                      }}
                    />
                    
                    {/* Save Elevation Button */}
                    <Tooltip title="Save Elevation Profile">
                      <IconButton
                        size="small"
                        onClick={() => {
                          const profileName = `Elevation Profile ${Date.now()}`;
                          saveElevationProfile(profileName);
                          addLog(`💾 Saved elevation profile: ${profileName}`);
                        }}
                        sx={{ 
                          color: "success.main",
                          "&:hover": {
                            bgcolor: "rgba(76, 175, 80, 0.1)"
                          }
                        }}
                      >
                        <Save />
                      </IconButton>
                    </Tooltip>
                    
                    {/* View Saved Elevations Button */}
                    <Tooltip title="View Saved Elevations">
                      <IconButton
                        size="small"
                        onClick={() => {
                          // Load saved elevations and show in dialog
                          const elevations = [];
                          for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key && key.startsWith('elevation_')) {
                              try {
                                const data = JSON.parse(localStorage.getItem(key));
                                elevations.push({ ...data, key });
                              } catch (error) {
                                console.warn('Error loading elevation:', key, error);
                              }
                            }
                          }
                          setSavedElevations(elevations);
                          setSelectedDataType('elevations');
                          setShowSavedDataDialog(true);
                        }}
                        sx={{ 
                          color: "info.main",
                          "&:hover": {
                            bgcolor: "rgba(33, 150, 243, 0.1)"
                          }
                        }}
                      >
                        <History />
                      </IconButton>
                    </Tooltip>
                    
                    {/* Toggle Chart Width Button */}
                    <Tooltip title={elevationChartFullWidth ? "Normal Width" : "Full Width"}>
                      <IconButton
                        size="small"
                        onClick={() => setElevationChartFullWidth(!elevationChartFullWidth)}
                        sx={{ 
                          color: elevationChartFullWidth ? "warning.main" : "text.secondary",
                          "&:hover": {
                            bgcolor: elevationChartFullWidth ? "rgba(255, 152, 0, 0.1)" : "rgba(158, 158, 158, 0.1)"
                          }
                        }}
                      >
                        <Fullscreen />
                      </IconButton>
                    </Tooltip>

                    <IconButton
                      size="small"
                      onClick={() => {
                        setShowElevationChart(false);
                        setShowElevation(false);
                        setElevationMarkers([]);
                        setElevationData([]);
                      }}
                      sx={{ color: "text.secondary" }}
                    >
                      <Close />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Simple ASCII-style elevation chart */}
                <Box
                  sx={{
                    height: elevationChartFullWidth ? 280 : 200,
                    bgcolor: darkMode ? "#1a1a1a" : "#f5f5f5",
                    borderRadius: 2,
                    p: 2,
                    border: darkMode ? "1px solid #333" : "1px solid #ddd",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between",
                    transition: theme.transitions.create(['height'], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.standard,
                    }),
                  }}
                >
                  {elevationData.map((point, index) => {
                    const maxElevation = Math.max(
                      ...elevationData.map((d) => d.elevation)
                    );
                    const minElevation = Math.min(
                      ...elevationData.map((d) => d.elevation)
                    );
                    const heightPercentage =
                      ((point.elevation - minElevation) /
                        (maxElevation - minElevation)) *
                      100;

                    return (
                      <Box
                        key={index}
                        sx={{
                          width: `calc(100% / ${elevationData.length})`,
                          height: `${Math.max(heightPercentage, 5)}%`,
                          bgcolor: `hsl(${
                            120 - heightPercentage * 0.8
                          }, 70%, 50%)`,
                          mx: 0.1,
                          borderRadius: "2px 2px 0 0",
                          position: "relative",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "scaleX(2)",
                            zIndex: 10,
                            bgcolor: "primary.main",
                          },
                        }}
                        title={`Distance: ${formatDistance(
                          point.distance
                        )}, Elevation: ${point.elevation}m`}
                      />
                    );
                  })}
                </Box>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1, fontSize: "0.8rem", color: "text.secondary" }}
                >
                  <Typography>Start</Typography>
                  <Typography>
                    Distance:{" "}
                    {elevationData.length > 0
                      ? formatDistance(
                          elevationData[elevationData.length - 1]?.distance || 0
                        )
                      : "0"}
                  </Typography>
                  <Typography>End</Typography>
                </Stack>
              </Box>
            </Paper>
          )}
        </Box>

        {/* Enhanced Right Sidebar with Smooth Animation */}
        <Slide
          direction="left"
          in={rightSidebarOpen}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <Drawer
            variant="persistent"
            anchor="right"
            open={rightSidebarOpen}
            sx={{
              width: rightDrawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: rightDrawerWidth,
                boxSizing: "border-box",
                bgcolor: darkMode ? "#1a1a1a" : "#ffffff",
                color: darkMode ? "#ffffff" : "inherit",
                borderLeft: `1px solid ${darkMode ? "#333" : "#e3f2fd"}`,
                boxShadow: darkMode
                  ? "-2px 0 12px rgba(0,0,0,0.5)"
                  : "-2px 0 12px rgba(0,0,0,0.1)",
                top: "64px",
                height: "calc(100vh - 64px)",
              },
            }}
          >
            {/* Right Sidebar Header */}
            <Box
              sx={{
                p: 1,
                background: `linear-gradient(135deg, ${
                  darkMode ? "rgb(156,39,176)" : "#9C27B0"
                } 0%, ${darkMode ? "rgb(123,31,162)" : "#7B1FA2"} 100%)`,
                color: "white",
                textAlign: "center",
                borderBottom: `1px solid ${darkMode ? "grey.700" : "#e3f2fd"}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              >
                ⚙️ Advanced Settings
              </Typography>
              <Chip
                label="Pro Tools"
                size="small"
                sx={{
                  mt: 0.25,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.6rem",
                  height: "18px",
                }}
              />
            </Box>

            <Box sx={{ 
              p: 1, 
              overflow: "auto", 
              height: "calc(100vh - 140px)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5
            }}>
              
              {/* Elevation Tab - Full Height when Active */}
              {showElevation && (
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: darkMode ? "#2a2a2a" : "inherit",
                    border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                    height: "calc(100vh - 200px)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1.5, display: "flex", alignItems: "center" }}
                  >
                    <TrendingUp sx={{ mr: 1, fontSize: 18, color: "warning.main" }} />
                    🏦️ Elevation Analysis
                  </Typography>
                  
                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    <Stack spacing={2}>
                      {/* Instructions */}
                      <Paper 
                        sx={{ 
                          p: 1.5, 
                          bgcolor: darkMode ? "rgba(255,152,0,0.1)" : "rgba(255,152,0,0.05)",
                          borderRadius: 1,
                          border: "1px solid rgba(255,152,0,0.3)"
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, color: "warning.main" }}>
                          Instructions
                        </Typography>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          1. Click on two points on the map
                        </Typography>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          2. View elevation profile chart
                        </Typography>
                        <Typography variant="caption" sx={{ display: "block" }}>
                          3. Save or export elevation data
                        </Typography>
                      </Paper>
                      
                      {/* Elevation Points Status */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Selection Status
                        </Typography>
                        <Paper 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
                            borderRadius: 1
                          }}
                        >
                          <Stack spacing={1}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">Points Selected:</Typography>
                              <Typography variant="caption" fontWeight="bold">
                                {elevationClickCount} / 2
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">Status:</Typography>
                              <Typography 
                                variant="caption" 
                                fontWeight="bold"
                                sx={{ 
                                  color: elevationClickCount === 2 ? "success.main" : "warning.main" 
                                }}
                              >
                                {elevationClickCount === 0 ? "Select first point" : 
                                 elevationClickCount === 1 ? "Select second point" : "Profile ready"}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>
                      
                      {/* Elevation Chart Controls */}
                      {showElevationChart && (
                        <Box>
                          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                            Chart Controls
                          </Typography>
                          <Stack spacing={1}>
                            <Button
                              variant="contained"
                              fullWidth
                              size="small"
                              startIcon={<Fullscreen />}
                              onClick={() => {
                                // Toggle full width chart
                                setShowElevationChart(true);
                                addLog('📏 Elevation chart expanded to full width');
                              }}
                              sx={{ 
                                textTransform: "none", 
                                fontSize: '0.8rem',
                                bgcolor: "warning.main",
                                "&:hover": { bgcolor: "warning.dark" }
                              }}
                            >
                              Expand Chart Full Width
                            </Button>
                            <Button
                              variant="outlined"
                              fullWidth
                              size="small"
                              startIcon={<Save />}
                              onClick={() => {
                                const elevationName = `Elevation Profile ${Date.now()}`;
                                saveElevationProfile(elevationName);
                              }}
                              sx={{ textTransform: "none", fontSize: '0.8rem' }}
                            >
                              Save Elevation Data
                            </Button>
                          </Stack>
                        </Box>
                      )}
                      
                      {/* Elevation Statistics */}
                      {elevationData.length > 0 && (
                        <Box>
                          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                            Statistics
                          </Typography>
                          <Paper 
                            sx={{ 
                              p: 1.5, 
                              bgcolor: darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
                              borderRadius: 1
                            }}
                          >
                            <Stack spacing={1}>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">Max Elevation:</Typography>
                                <Typography variant="caption" fontWeight="bold" color="success.main">
                                  {Math.max(...elevationData.map(d => d.elevation))}m
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">Min Elevation:</Typography>
                                <Typography variant="caption" fontWeight="bold" color="error.main">
                                  {Math.min(...elevationData.map(d => d.elevation))}m
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">Total Distance:</Typography>
                                <Typography variant="caption" fontWeight="bold">
                                  {elevationData.length > 0 ? 
                                    formatDistance(elevationData[elevationData.length - 1]?.distance || 0) : "0m"}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">Data Points:</Typography>
                                <Typography variant="caption" fontWeight="bold">
                                  {elevationData.length}
                                </Typography>
                              </Box>
                            </Stack>
                          </Paper>
                        </Box>
                      )}
                      
                      {/* Elevation Actions */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Actions
                        </Typography>
                        <Stack spacing={1}>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<Clear />}
                            onClick={() => {
                              setElevationPoints([]);
                              setElevationClickCount(0);
                              setElevationData([]);
                              setShowElevationChart(false);
                              addLog('🏦️ Elevation data cleared');
                            }}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Clear Elevation Data
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<Close />}
                            onClick={() => {
                              setShowElevation(false);
                              setElevationMode(false);
                              addLog('🏦️ Elevation panel closed');
                            }}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Close Elevation Panel
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              )}
              
              {/* Infrastructure Tab - Full Height when Active */}
              {showInfrastructure && (
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: darkMode ? "#2a2a2a" : "inherit",
                    border: darkMode ? "1px solid #333" : "1px solid #e3f2fd",
                    height: "calc(100vh - 200px)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1.5, display: "flex", alignItems: "center" }}
                  >
                    <Business sx={{ mr: 1, fontSize: 18, color: "primary.main" }} />
                    🏢 Infrastructure Management
                  </Typography>
                  
                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    <Stack spacing={2}>
                      {/* Infrastructure Layers */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Layer Controls
                        </Typography>
                        <Stack spacing={1}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={activeLayers.roads}
                                onChange={() => handleLayerToggle('roads')}
                                size="small"
                              />
                            }
                            label="🛣️ Roads & Highways"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } }}
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={activeLayers.buildings}
                                onChange={() => handleLayerToggle('buildings')}
                                size="small"
                              />
                            }
                            label="🏗️ Buildings"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } }}
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={activeLayers.infrastructure}
                                onChange={() => handleLayerToggle('infrastructure')}
                                size="small"
                              />
                            }
                            label="⚡ Utilities"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } }}
                          />
                        </Stack>
                      </Box>
                      
                      {/* Infrastructure Tools */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Analysis Tools
                        </Typography>
                        <Stack spacing={1}>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<LocationOn />}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Find Nearest Facility
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<Straighten />}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Calculate Coverage
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<TrendingUp />}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Network Analysis
                          </Button>
                        </Stack>
                      </Box>
                      
                      {/* Infrastructure Statistics */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Statistics
                        </Typography>
                        <Paper 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
                            borderRadius: 1
                          }}
                        >
                          <Stack spacing={1}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">🛣️ Roads Visible:</Typography>
                              <Typography variant="caption" fontWeight="bold">
                                {activeLayers.roads ? "Yes" : "No"}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">🏗️ Buildings Visible:</Typography>
                              <Typography variant="caption" fontWeight="bold">
                                {activeLayers.buildings ? "Yes" : "No"}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">⚡ Utilities Visible:</Typography>
                              <Typography variant="caption" fontWeight="bold">
                                {activeLayers.infrastructure ? "Yes" : "No"}
                              </Typography>
                            </Box>
                            <Divider sx={{ my: 0.5 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="caption">Map Zoom:</Typography>
                              <Typography variant="caption" fontWeight="bold">{mapZoom}x</Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>
                      
                      {/* Infrastructure Actions */}
                      <Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                          Quick Actions
                        </Typography>
                        <Stack spacing={1}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="small"
                            startIcon={<Download />}
                            sx={{ 
                              textTransform: "none", 
                              fontSize: '0.8rem',
                              bgcolor: "success.main",
                              "&:hover": { bgcolor: "success.dark" }
                            }}
                          >
                            Export Infrastructure Data
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            startIcon={<Clear />}
                            onClick={() => {
                              setShowInfrastructure(false);
                              addLog('🏢 Infrastructure panel closed');
                            }}
                            sx={{ textTransform: "none", fontSize: '0.8rem' }}
                          >
                            Close Infrastructure Panel
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              )}
              {/* Theme Controls */}
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  🎨 Appearance
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                  }
                  label="Dark Mode"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={compactMode}
                      onChange={() => setCompactMode(!compactMode)}
                    />
                  }
                  label="Compact Layout"
                />
              </Paper>

              {/* Debug Information */}
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  🐛 Debug Information
                </Typography>
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Points:
                    </Typography>
                    <Typography variant="body2">
                      {points.length} active
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Polygon Points:
                    </Typography>
                    <Typography variant="body2">
                      {polygonPoints.length} active
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Map Zoom:
                    </Typography>
                    <Typography variant="body2">{mapZoom}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Coordinates:
                    </Typography>
                    <Typography variant="caption" fontFamily="monospace">
                      {liveCoordinates.lat.toFixed(6)},{" "}
                      {liveCoordinates.lng.toFixed(6)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Quick Actions */}
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  ⚡ Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    startIcon={<CenterFocusStrong />}
                    onClick={handleCenterOnIndia}
                    sx={{ textTransform: "none" }}
                  >
                    Center on India
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    startIcon={<Clear />}
                    onClick={handleClearAll}
                    disabled={points.length === 0 && polygonPoints.length === 0}
                    sx={{ textTransform: "none" }}
                  >
                    Clear All Data
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    startIcon={<History />}
                    onClick={handleHistory}
                    sx={{ textTransform: "none" }}
                  >
                    View History
                  </Button>
                </Stack>
              </Paper>

              {/* Layer Management */}
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  🌍 Layer Management
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(activeLayers).map(([layer, active]) => (
                    <FormControlLabel
                      key={layer}
                      control={
                        <Switch
                          checked={active}
                          onChange={() => handleLayerToggle(layer)}
                          size="small"
                        />
                      }
                      label={layer.charAt(0).toUpperCase() + layer.slice(1)}
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.85rem",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Paper>

              {/* Map Statistics */}
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#2a2a2a" : "inherit",
                  border: darkMode ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  📊 Map Statistics
                </Typography>
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Total Measurements:
                    </Typography>
                    <Typography variant="body2">
                      {points.length + polygonPoints.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Active Layers:
                    </Typography>
                    <Typography variant="body2">{activeLayersCount}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Saved Bookmarks:
                    </Typography>
                    <Typography variant="body2">{bookmarks.length}</Typography>
                  </Box>
                  {totalDistance > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Total Distance:
                      </Typography>
                      <Typography variant="body2">
                        {formatDistance(totalDistance)}
                      </Typography>
                    </Box>
                  )}
                  {polygonArea > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Polygon Area:
                      </Typography>
                      <Typography variant="body2">
                        {formatArea(polygonArea)}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Box>
          </Drawer>
        </Slide>
      </Box>

      {/* Save Distance Dialog */}
      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          💾 Save Distance Measurement
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="Measurement Name"
            variant="outlined"
            value={measurementName}
            onChange={(e) => setMeasurementName(e.target.value)}
            placeholder={`Distance Measurement ${Date.now()}`}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: 'text.primary',
                backgroundColor: 'background.paper',
              },
              '& .MuiInputLabel-root': {
                color: 'text.primary',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setSaveDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmSaveDistance}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
              },
            }}
          >
            Save Measurement
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Polygon Dialog */}
      <Dialog
        open={polygonSaveDialogOpen}
        onClose={() => setPolygonSaveDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          💾 Save Polygon Area
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="Polygon Name"
            variant="outlined"
            value={polygonName}
            onChange={(e) => setPolygonName(e.target.value)}
            placeholder={`Polygon Area ${Date.now()}`}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: 'text.primary',
                backgroundColor: 'background.paper',
              },
              '& .MuiInputLabel-root': {
                color: 'text.primary',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'secondary.main',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setPolygonSaveDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmSavePolygon}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%)",
              },
            }}
          >
            Save Polygon
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bookmark Edit Dialog */}
      <Dialog
        open={bookmarkEditDialogOpen}
        onClose={() => setBookmarkEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🔖 Edit Bookmark
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="Bookmark Name"
            variant="outlined"
            value={editedBookmarkName}
            onChange={(e) => setEditedBookmarkName(e.target.value)}
            placeholder="Enter bookmark name"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: 'text.primary',
                backgroundColor: 'background.paper',
              },
              '& .MuiInputLabel-root': {
                color: 'text.primary',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setBookmarkEditDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveBookmarkEdit}
            variant="contained"
            disabled={!editedBookmarkName.trim()}
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bookmark Delete Confirmation Dialog */}
      <Dialog
        open={bookmarkDeleteDialogOpen}
        onClose={() => setBookmarkDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🗑️ Delete Bookmark
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this bookmark?
          </Typography>
          {bookmarkToDelete && (
            <Paper
              sx={{ p: 2, bgcolor: "rgba(244, 67, 54, 0.1)", borderRadius: 2 }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {bookmarkToDelete.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bookmarkToDelete.coords.lat.toFixed(6)}°,{" "}
                {bookmarkToDelete.coords.lng.toFixed(6)}°
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {bookmarkToDelete.timestamp}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setBookmarkDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteBookmark}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
              },
            }}
          >
            Delete Bookmark
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modern Saved Data Library Dialog */}
      <Dialog
        open={showSavedDataDialog}
        onClose={() => setShowSavedDataDialog(false)}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            height: "85vh",
            maxHeight: "900px",
            borderRadius: 3,
            background: darkMode 
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #607D8B 0%, #455A64 100%)",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <History />
            <Typography variant="h6">📂 Saved Data Library</Typography>
          </Stack>
          <IconButton
            onClick={() => setShowSavedDataDialog(false)}
            sx={{ color: "white" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <ToggleButtonGroup
            value={selectedDataType}
            exclusive
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setSelectedDataType(newValue);
              }
            }}
            sx={{ p: 1 }}
          >
            <ToggleButton value="all" size="small">
              📊 All (
              {savedMeasurements.length +
                savedPolygons.length +
                savedElevations.length}
              )
            </ToggleButton>
            <ToggleButton value="measurements" size="small">
              📏 Measurements ({savedMeasurements.length})
            </ToggleButton>
            <ToggleButton value="polygons" size="small">
              📐 Polygons ({savedPolygons.length})
            </ToggleButton>
            <ToggleButton value="elevations" size="small">
              🏔️ Elevations ({savedElevations.length})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <DialogContent sx={{ p: 0, height: "100%" }}>
          <Box sx={{ height: "100%", overflow: "auto", p: 2 }}>
            {/* Display All Data Types */}
            {selectedDataType === "all" && (
              <Stack spacing={3}>
                {/* Measurements Section */}
                {savedMeasurements.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
                    >
                      📏 Distance Measurements ({savedMeasurements.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {savedMeasurements.map((measurement) => (
                        <Grid item xs={12} md={6} key={measurement.id}>
                          <Card
                            variant="outlined"
                            sx={{ p: 2, borderColor: "primary.main" }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {measurement.name}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "primary.main", mb: 1 }}
                            >
                              {formatDistance(measurement.distance)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {measurement.points.length} points •{" "}
                              {new Date(measurement.timestamp).toLocaleString()}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => {
                                  // Load measurement data on map
                                  if (workingMapRef.current && workingMapRef.current.loadMeasurementData) {
                                    workingMapRef.current.loadMeasurementData(measurement);
                                    addLog(`📏 Loaded measurement: ${measurement.name}`);
                                    setShowSavedDataDialog(false);
                                  }
                                }}
                              >
                                View
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Clear />}
                                onClick={() => {
                                  showDeleteMeasurementConfirmation(measurement);
                                }}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Polygons Section */}
                {savedPolygons.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        color: "secondary.main",
                        fontWeight: "bold",
                      }}
                    >
                      📐 Polygon Areas ({savedPolygons.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {savedPolygons.map((polygon) => (
                        <Grid item xs={12} md={6} key={polygon.id}>
                          <Card
                            variant="outlined"
                            sx={{ p: 2, borderColor: "secondary.main" }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {polygon.name}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "secondary.main", mb: 1 }}
                            >
                              {formatArea(polygon.area)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {polygon.points.length} vertices •{" "}
                              {new Date(polygon.timestamp).toLocaleString()}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => {
                                  // Load polygon data on map
                                  if (workingMapRef.current && workingMapRef.current.loadPolygonData) {
                                    workingMapRef.current.loadPolygonData(polygon);
                                    addLog(`📐 Loaded polygon: ${polygon.name}`);
                                    setShowSavedDataDialog(false);
                                  }
                                }}
                              >
                                View
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Clear />}
                                onClick={() => {
                                  showDeletePolygonConfirmation(polygon);
                                }}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Elevations Section */}
                {savedElevations.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, color: "warning.main", fontWeight: "bold" }}
                    >
                      🏔️ Elevation Profiles ({savedElevations.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {savedElevations.map((elevation) => (
                        <Grid item xs={12} md={6} key={elevation.id}>
                          <Card
                            variant="outlined"
                            sx={{ p: 2, borderColor: "warning.main" }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {elevation.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "warning.main", mb: 1 }}
                            >
                              Max:{" "}
                              {Math.max(
                                ...elevation.data.map((d) => d.elevation)
                              )}
                              m
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {elevation.data.length} data points •{" "}
                              {new Date(elevation.timestamp).toLocaleString()}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => {
                                  // Load elevation profile and show chart
                                  setElevationData(elevation.data);
                                  setElevationPoints(elevation.points);
                                  setShowElevationChart(true);
                                  setRightSidebarOpen(true);
                                  setShowSavedDataDialog(false);
                                  addLog(`🏔️ Viewing elevation profile: ${elevation.name}`);
                                }}
                              >
                                View
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Clear />}
                                onClick={() => {
                                  // Delete elevation profile from localStorage
                                  if (elevation.key) {
                                    localStorage.removeItem(elevation.key);
                                    // Refresh the elevation list
                                    const updatedElevations = savedElevations.filter(e => e.key !== elevation.key);
                                    setSavedElevations(updatedElevations);
                                    addLog(`🗑️ Deleted elevation profile: ${elevation.name}`);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Empty State */}
                {savedMeasurements.length === 0 &&
                  savedPolygons.length === 0 &&
                  savedElevations.length === 0 && (
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: "center",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        📭 No Saved Data Yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start measuring distances, drawing polygons, or creating
                        elevation profiles to see your saved data here.
                      </Typography>
                    </Paper>
                  )}
              </Stack>
            )}

            {/* Individual Data Type Views */}
            {selectedDataType === "measurements" && (
              <Box>
                {savedMeasurements.length === 0 ? (
                  <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                      📏 No Saved Measurements
                    </Typography>
                  </Paper>
                ) : (
                  <Grid container spacing={2}>
                    {savedMeasurements.map((measurement) => (
                      <Grid item xs={12} md={6} lg={4} key={measurement.id}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {measurement.name}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: "primary.main", mb: 1 }}
                          >
                            {formatDistance(measurement.distance)}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 2 }}
                          >
                            {measurement.points.length} points •{" "}
                            {new Date(measurement.timestamp).toLocaleString()}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              startIcon={<Visibility />}
                              onClick={() => {
                                // Load measurement data onto map
                                if (workingMapRef.current && workingMapRef.current.loadMeasurementData) {
                                  workingMapRef.current.loadMeasurementData(measurement);
                                  addLog(`✅ Measurement loaded on map: ${measurement.name}`);
                                  setShowSavedDataDialog(false);
                                } else {
                                  addLog('❌ Cannot load measurement - map not ready');
                                }
                              }}
                            >
                              View
                            </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                fullWidth
                                startIcon={<Clear />}
                                onClick={() => showDeleteMeasurementConfirmation(measurement)}
                              >
                                Delete
                              </Button>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {selectedDataType === "polygons" && (
              <Box>
                {savedPolygons.length === 0 ? (
                  <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                      📐 No Saved Polygons
                    </Typography>
                  </Paper>
                ) : (
                  <Grid container spacing={2}>
                    {savedPolygons.map((polygon) => (
                      <Grid item xs={12} md={6} lg={4} key={polygon.id}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {polygon.name}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: "secondary.main", mb: 1 }}
                          >
                            {formatArea(polygon.area)}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 2 }}
                          >
                            {polygon.points.length} vertices •{" "}
                            {new Date(polygon.timestamp).toLocaleString()}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              startIcon={<Visibility />}
                              onClick={() => loadPolygonData(polygon)}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              fullWidth
                              startIcon={<Clear />}
                              onClick={() => showDeletePolygonConfirmation(polygon)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {selectedDataType === "elevations" && (
              <Box>
                {savedElevations.length === 0 ? (
                  <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                      🏔️ No Saved Elevation Profiles
                    </Typography>
                  </Paper>
                ) : (
                  <Grid container spacing={2}>
                    {savedElevations.map((elevation) => (
                      <Grid item xs={12} md={6} lg={4} key={elevation.id}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {elevation.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ color: "warning.main", mb: 1 }}
                          >
                            Max:{" "}
                            {Math.max(
                              ...elevation.data.map((d) => d.elevation)
                            )}
                            m
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 2 }}
                          >
                            {elevation.data.length} data points •{" "}
                            {new Date(elevation.timestamp).toLocaleString()}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              startIcon={<Visibility />}
                              onClick={() => {
                                // Display elevation chart
                                setElevationData(elevation.data);
                                if (elevation.points) {
                                  setElevationPoints(elevation.points);
                                }
                                setShowElevationChart(true);
                                setShowSavedDataDialog(false);
                                addLog(`✅ Viewing elevation profile: ${elevation.name}`);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              fullWidth
                              startIcon={<Clear />}
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete elevation profile "${elevation.name}"?`)) {
                                  // Remove from localStorage
                                  localStorage.removeItem(elevation.key);
                                  // Update state
                                  const updatedElevations = savedElevations.filter(e => e.key !== elevation.key);
                                  setSavedElevations(updatedElevations);
                                  addLog(`🗑️ Deleted elevation profile: ${elevation.name}`);
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{ p: 3, gap: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: "auto" }}
          >
            Total:{" "}
            {savedMeasurements.length +
              savedPolygons.length +
              savedElevations.length}{" "}
            saved items
          </Typography>
          <Button
            onClick={() => setShowSavedDataDialog(false)}
            variant="contained"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Polygon History Dialog */}
      <Dialog
        open={polygonHistoryDialogOpen}
        onClose={() => setPolygonHistoryDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Crop />
          Saved Polygon Data
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {savedPolygons.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                🔷 No Saved Polygons Yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start drawing polygons and saving them to see your saved polygon data here.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={2}>
              {savedPolygons.map((polygon) => (
                <Grid item xs={12} md={6} key={polygon.key}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderColor: "#9C27B0",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(156, 39, 176, 0.2)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1, color: "#9C27B0" }}
                    >
                      {polygon.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "#9C27B0", mb: 1 }}
                    >
                      {formatArea(polygon.area || 0)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#7B1FA2", mb: 1 }}
                    >
                      Perimeter: {formatDistance(polygon.perimeter || 0)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 2 }}
                    >
                      {polygon.points?.length || 0} vertices •{" "}
                      {new Date(polygon.timestamp).toLocaleString()}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        fullWidth
                        startIcon={<Visibility />}
                        onClick={() => loadPolygonData(polygon)}
                        sx={{
                          borderColor: "#9C27B0",
                          color: "#9C27B0",
                          "&:hover": {
                            borderColor: "#7B1FA2",
                            backgroundColor: "rgba(156, 39, 176, 0.1)",
                          },
                        }}
                      >
                        Load
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<Clear />}
                        onClick={() => showDeletePolygonConfirmation(polygon)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: "auto" }}
          >
            {savedPolygons.length} saved polygons
          </Typography>
          <Button
            onClick={() => setPolygonHistoryDialogOpen(false)}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              bgcolor: "#9C27B0",
              "&:hover": {
                bgcolor: "#7B1FA2",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Polygon Delete Confirmation Dialog */}
      <Dialog
        open={polygonDeleteConfirmOpen}
        onClose={cancelDeletePolygon}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🗑️ Delete Polygon
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this polygon?
          </Typography>
          {polygonToDelete && (
            <Paper
              sx={{ p: 2, bgcolor: "rgba(244, 67, 54, 0.1)", borderRadius: 2 }}
            >
              <Typography
                variant="h6"
                color="#9C27B0"
                sx={{ fontWeight: "bold" }}
              >
                {polygonToDelete.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Area: {formatArea(polygonToDelete.area || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vertices: {polygonToDelete.points?.length || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(polygonToDelete.timestamp).toLocaleString()}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={cancelDeletePolygon}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={deletePolygon}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
              },
            }}
          >
            Delete Polygon
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Measurement Delete Confirmation Dialog */}
      <Dialog
        open={measurementDeleteConfirmOpen}
        onClose={cancelDeleteMeasurement}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🗑️ Delete Measurement
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this measurement?
          </Typography>
          {measurementToDelete && (
            <Paper
              sx={{ p: 2, bgcolor: "rgba(244, 67, 54, 0.1)", borderRadius: 2 }}
            >
              <Typography
                variant="h6"
                color="#4CAF50"
                sx={{ fontWeight: "bold" }}
              >
                {measurementToDelete.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distance: {formatDistance(measurementToDelete.distance || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points: {measurementToDelete.points?.length || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {measurementToDelete.timestamp ? new Date(measurementToDelete.timestamp).toLocaleString() : 'Unknown'}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={cancelDeleteMeasurement}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteMeasurement}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
              },
            }}
          >
            Delete Measurement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GISProfessionalDashboard;
