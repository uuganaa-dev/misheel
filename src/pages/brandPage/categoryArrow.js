import React from "react";
import { Grid, Typography } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

const CategoryArrow = ({ txt, chooseCategory = false }) => {
  return (
    <Grid
      sx={{
        color: chooseCategory ? "white" : "#0F56B3",
        backgroundColor: chooseCategory ? "#0F56B3" : "white",
        display: "flex",
        border: "1px solid rgba(0,0,0,0.25)",
        borderRadius: "8px",
        padding: "6.5px 8px",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#0F56B3",
          color: "white",
        },
      }}
    >
      <ArrowBackIosNew sx={{ transform: "rotate(-90deg)" }} />
      <Typography
        sx={{
          fontSize: "14px",

          fontWeight: 500,
          textTransform: "capitalize",
        }}
      >
        {txt.name}
      </Typography>
    </Grid>
  );
};
export default React.memo(CategoryArrow);
