import { Grid, Radio, Typography } from "@mui/material";
import React from "react";

const CategoryRadioBttn = ({ txt, onChange, checked = false }) => {
  return (
    <Grid sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Radio
        sx={{ width: "16px", height: "16px", color: "rgba(156, 163, 175, 1)" }}
        onChange={onChange}
        value={txt}
        checked={checked}
      />
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: "rgba(32, 32, 32, 0.65)",
          "&:hover": { color: "rgba(32, 32, 32, 1)" },
        }}
      >
        {txt}
      </Typography>
    </Grid>
  );
};
export default React.memo(CategoryRadioBttn);
