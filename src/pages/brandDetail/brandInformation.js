import React from "react";
import { Grid, Typography } from "@mui/material";

const BrandInformation = ({ sx, data, txt }) => {
  return (
    <Grid
      sx={{
        ...sx,
        backgroundColor: "white",
        width: ["87%", "88%", "90%"],
        // height: "calc(90vw * 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ["21px", "52px", "73px"],
        }}
      >
        <Grid
          sx={{
            backgroundImage: `url("http://mmmall.mn${data?.brandLogo}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: ["58px", "142px", "201px"],
            height: ["61px", "149px", "200px"],
            borderRadius: "10px",
          }}
        />
        <Grid sx={{ width: ["178px", "435px", "717px"] }}>
          <Typography sx={{ fontSize: ["10px", "14px"] }}>
            {data?.brandDetailDesc}
          </Typography>
          <Typography sx={{ fontSize: ["10px", "14px"] }}>
            {txt.phone} : {data?.brandDetailNumber}
          </Typography>
          <Typography sx={{ fontSize: ["10px", "14px"] }}>
            {txt.email} : {data?.brandDetailEmail}
          </Typography>
          <Typography sx={{ fontSize: ["10px", "14px"] }}>
            {txt.fb} : {data?.brandDetailFacebook}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default React.memo(BrandInformation);
