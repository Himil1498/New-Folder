import React from "react";
import { Box, Button, Stack, Tooltip, useTheme } from "@mui/material";
import { ZoomIn, ZoomOut, CenterFocusStrong } from "@mui/icons-material";

/**
 * MapControls component - Handles map zoom and center controls
 */
const MapControls = ({
  map,
  onZoomIn,
  onZoomOut,
  onCenterOnIndia,
  indiaBounds,
}) => {
  const theme = useTheme();

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
    if (onZoomIn) onZoomIn();
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
    if (onZoomOut) onZoomOut();
  };

  const handleCenterOnIndia = () => {
    if (map && indiaBounds) {
      map.fitBounds(indiaBounds);
    } else if (map) {
      map.setCenter({ lat: 20.5937, lng: 78.9629 });
      map.setZoom(6);
    }
    if (onCenterOnIndia) onCenterOnIndia();
  };

  return (
    <Stack spacing={1}>
      <Tooltip title="Zoom In" placement="left">
        <Button
          variant="outlined"
          onClick={handleZoomIn}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: theme.palette.primary.main,
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ZoomIn sx={{ fontSize: "20px" }} />
        </Button>
      </Tooltip>

      <Tooltip title="Zoom Out" placement="left">
        <Button
          variant="outlined"
          onClick={handleZoomOut}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: theme.palette.primary.main,
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ZoomOut sx={{ fontSize: "20px" }} />
        </Button>
      </Tooltip>

      <Tooltip title="Center on India" placement="left">
        <Button
          variant="outlined"
          onClick={handleCenterOnIndia}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: theme.palette.primary.main,
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <CenterFocusStrong sx={{ fontSize: "20px" }} />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default MapControls;
