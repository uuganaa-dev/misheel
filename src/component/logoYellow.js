import React from "react";
import { Grid } from "@mui/material";
import icons from "../asset/icon/filePath";

const LogoYellow = ({ sx, ysx, backgroundColor = "#FFD662" }) => {
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
          transform: "translate(-50%, -50%)",
        }}
      />
    </Grid>
  );
};
export default React.memo(LogoYellow);
