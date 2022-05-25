import { Grid, Typography } from "@mui/material";
import React from "react";

export default function TextUnderline({ txt, isTablet = false }) {
  return (
    <Grid sx={{ color: "#404040" }}>
      <Typography
        sx={{
          fontSize: ["12px", "24px"],
          textTransform: "uppercase",
          fontWeight: 200,
          letterSpacing: "2px",
          mb: "13px",
        }}
      >
        {txt}
      </Typography>
      <hr
        style={{ width: isTablet ? "99px" : "118px", border: "0.7px solid" }}
      />
    </Grid>
  );
}
