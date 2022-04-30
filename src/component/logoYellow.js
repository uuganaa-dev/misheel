import React from "react";
import { Grid } from "@mui/material";
import icons from "../asset/icon/filePath";

export default function LogoYellow({ sx, ysx, backgroundColor = "#FFD662" }) {
  return (
    <Grid sx={{ bgcolor: backgroundColor, ...ysx, position: "relative" }}>
      <Grid
        sx={{
          ...sx,
          backgroundImage: `url("${icons.logo}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />
    </Grid>
  );
}
