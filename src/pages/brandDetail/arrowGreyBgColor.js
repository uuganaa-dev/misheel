import React from "react";
import { Grid } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

const ArrowGreyBgColor = ({ sx, click }) => {
  return (
    <Grid
      sx={{
        backgroundColor: "rgba(196, 196, 196, 0.5)",
        width: "38px",
        height: "42px",
        borderRadius: "0px 5px 5px 0",
        p: "10px",
        alignItems: "center",
        cursor: "pointer",
        ...sx,
      }}
      onClick={click}
    >
      <ArrowBackIosNew />
    </Grid>
  );
};
export default React.memo(ArrowGreyBgColor);
