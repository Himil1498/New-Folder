import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Box,
  Chip,
  Paper,
  Divider,
  FormControlLabel,
  Switch,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LocationOn,
  Visibility,
  VisibilityOff,
  Map as MapIcon,
  CheckCircle,
} from "@mui/icons-material";
import { getAllDisplayNames } from "../../../../utils/regionUtils";

const INDIA_REGIONS = getAllDisplayNames().filter(
  (name) => name !== "Bharat (All India)"
);

// Enhanced region data with coordinates for map visualization
const REGION_DATA = {
  "Gujarat": {
    bounds: { north: 24.7, south: 20.1, east: 74.5, west: 68.1 },
    center: { lat: 23.0225, lng: 72.5714 },
    color: '#2196F3',
    population: '60M+',
    area: '196,244 km²'
  },
  "Goa": {
    bounds: { north: 15.8, south: 14.9, east: 74.3, west: 73.7 },
    center: { lat: 15.2993, lng: 74.1240 },
    color: '#4CAF50',
    population: '1.5M+',
    area: '3,702 km²'
  },
  "Delhi": {
    bounds: { north: 28.9, south: 28.4, east: 77.4, west: 76.8 },
    center: { lat: 28.7041, lng: 77.1025 },
    color: '#FF9800',
    population: '30M+',
    area: '1,484 km²'
  },
  "Maharashtra": {
    bounds: { north: 22.0, south: 15.6, east: 80.9, west: 72.6 },
    center: { lat: 19.7515, lng: 75.7139 },
    color: '#9C27B0',
    population: '112M+',
    area: '307,713 km²'
  },
  "Karnataka": {
    bounds: { north: 18.4, south: 11.5, east: 78.6, west: 74.0 },
    center: { lat: 15.3173, lng: 75.7139 },
    color: '#F44336',
    population: '61M+',
    area: '191,791 km²'
  }
};

export default function Step3Regions({ userData, setUserData }) {
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const regionPolygons = useRef([]);

  const handleSelectAll = () =>
    setUserData({ ...userData, regions: ["Bharat"] });
  const handleClearAll = () => setUserData({ ...userData, regions: [] });

  const handleChange = (_, newValue) => {
    if (newValue.length === INDIA_REGIONS.length) {
      setUserData({ ...userData, regions: ["Bharat"] });
    } else {
      setUserData({ ...userData, regions: newValue });
    }
  };

  const displayValue = userData.regions?.includes("Bharat")
    ? ["Bharat (All India)"]
    : userData.regions || [];

  // Toggle region selection
  const toggleRegion = (regionName) => {
    const currentRegions = userData.regions || [];
    const isSelected = currentRegions.includes(regionName);
    
    if (isSelected) {
      setUserData({
        ...userData,
        regions: currentRegions.filter(r => r !== regionName)
      });
    } else {
      setUserData({
        ...userData,
        regions: [...currentRegions.filter(r => r !== "Bharat"), regionName]
      });
    }
  };

  // Initialize map when shown
  useEffect(() => {
    if (showMap && window.google && mapRef.current && !mapLoaded) {
      initializeMap();
    }
  }, [showMap, mapLoaded]);

  // Update map when regions change
  useEffect(() => {
    if (mapLoaded) {
      updateMapRegions();
    }
  }, [userData.regions, mapLoaded]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Center of India
      zoom: 5,
      mapTypeId: 'roadmap',
      gestureHandling: 'cooperative',
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: false,
    });
    
    mapInstance.current = map;
    setMapLoaded(true);
    
    // Add region polygons
    createRegionPolygons(map);
  };

  const createRegionPolygons = (map) => {
    Object.entries(REGION_DATA).forEach(([regionName, data]) => {
      // Create polygon from bounds
      const { bounds, color } = data;
      const polygonPath = [
        { lat: bounds.north, lng: bounds.west },
        { lat: bounds.north, lng: bounds.east },
        { lat: bounds.south, lng: bounds.east },
        { lat: bounds.south, lng: bounds.west },
      ];

      const polygon = new window.google.maps.Polygon({
        paths: polygonPath,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.2,
        clickable: true,
      });

      polygon.setMap(map);
      regionPolygons.current.push({ name: regionName, polygon });

      // Add click listener
      polygon.addListener('click', () => {
        toggleRegion(regionName);
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: ${color};">${regionName}</h4>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Population:</strong> ${data.population}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Area:</strong> ${data.area}</p>
            <p style="margin: 8px 0 0 0; font-size: 11px; color: #666;">Click to select/deselect</p>
          </div>
        `
      });

      polygon.addListener('mouseover', (event) => {
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });

      polygon.addListener('mouseout', () => {
        infoWindow.close();
      });
    });
  };

  const updateMapRegions = () => {
    const selectedRegions = userData.regions || [];
    
    regionPolygons.current.forEach(({ name, polygon }) => {
      const isSelected = selectedRegions.includes(name) || selectedRegions.includes("Bharat");
      
      polygon.setOptions({
        fillOpacity: isSelected ? 0.4 : 0.15,
        strokeWeight: isSelected ? 3 : 2,
        strokeOpacity: isSelected ? 1 : 0.6,
      });
    });
  };

  const availableRegions = Object.keys(REGION_DATA);
  const selectedCount = userData.regions?.includes("Bharat") 
    ? availableRegions.length 
    : userData.regions?.length || 0;

  return (
    <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOn color="primary" />
        Assign Regions
        <Chip 
          label={`${selectedCount}/${availableRegions.length} selected`} 
          size="small" 
          color={selectedCount > 0 ? "primary" : "default"}
        />
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Select regions where this user will have access. Users can only perform GIS operations within their assigned regions.
      </Alert>

      <Grid container spacing={3}>
        {/* Region Selection */}
        <Grid item xs={12} md={showMap ? 6 : 12}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                📋 Region Selection
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showMap}
                    onChange={(e) => setShowMap(e.target.checked)}
                    size="small"
                  />
                }
                label="Show Map"
              />
            </Box>
            
            <Autocomplete
              multiple
              options={INDIA_REGIONS}
              value={displayValue}
              onChange={handleChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={option} 
                    {...getTagProps({ index })} 
                    key={option}
                    color={option === "Bharat (All India)" ? "secondary" : "primary"}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Search and Select Regions" 
                  helperText="Type to search or use the map to select visually"
                />
              )}
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSelectAll}
                size="small"
                startIcon={<CheckCircle />}
              >
                Select All India
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleClearAll}
                size="small"
              >
                Clear All
              </Button>
            </Box>
          </Paper>

          {/* Available Regions List */}
          <Paper elevation={2} sx={{ mt: 2, borderRadius: 2 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                🗺️ Available Regions ({availableRegions.length})
              </Typography>
            </Box>
            <List dense>
              {availableRegions.map((regionName) => {
                const region = REGION_DATA[regionName];
                const isSelected = userData.regions?.includes(regionName) || userData.regions?.includes("Bharat");
                
                return (
                  <ListItem 
                    key={regionName} 
                    button 
                    onClick={() => toggleRegion(regionName)}
                    sx={{ 
                      borderLeft: `4px solid ${region.color}`,
                      mb: 0.5,
                      bgcolor: isSelected ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(33, 150, 243, 0.05)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          bgcolor: region.color,
                          border: isSelected ? '2px solid #1976d2' : '2px solid transparent'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: isSelected ? 600 : 400 }}>
                            {regionName}
                          </Typography>
                          {isSelected && <CheckCircle color="primary" sx={{ fontSize: 16 }} />}
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {region.population} • {region.area}
                        </Typography>
                      }
                    />
                    <Tooltip title={`Click on map to toggle ${regionName}`}>
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); }}>
                        {isSelected ? <Visibility color="primary" /> : <VisibilityOff />}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>

        {/* Interactive Map */}
        {showMap && (
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapIcon />
                  Interactive Region Map
                </Typography>
                <Typography variant="caption">
                  Click on regions to select/deselect • Hover for details
                </Typography>
              </Box>
              <Box 
                ref={mapRef} 
                sx={{ 
                  height: 400, 
                  width: '100%',
                  position: 'relative',
                }}
              >
                {!mapLoaded && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Loading map...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Selection Summary */}
      {userData.regions && userData.regions.length > 0 && (
        <Paper elevation={1} sx={{ mt: 2, p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
            ✅ Selected Regions Summary:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {userData.regions?.includes("Bharat") ? (
              <Chip 
                label="All India Access" 
                color="secondary" 
                variant="filled" 
                size="small"
              />
            ) : (
              userData.regions?.map(region => (
                <Chip 
                  key={region}
                  label={region}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderColor: REGION_DATA[region]?.color,
                    color: REGION_DATA[region]?.color
                  }}
                />
              ))
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
