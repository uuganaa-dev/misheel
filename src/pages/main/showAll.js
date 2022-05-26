import { Grid, Typography } from "@mui/material";
import React from "react";
import icons from "../../asset/icon/filePath";

const ShowAll = ({ txt, onClick }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        width: ["370px", "809px", "1040px"],
        justifyContent: "flex-end",
        color: "#404040",
        gap: [0, 0, "10px"],
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Typography sx={{ fontSize: "16px", letterSpacing: "1px" }}>
        {txt}
      </Typography>
      <img src={icons.arrow} alt="arrow" />
    </Grid>
  );
};
export default React.memo(ShowAll);
