import React from "react";
import { Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import logo from "./Ellipse 67.png";
export default function Unit({ item, catfind }) {
  return (
    <Grid
      sx={{
        display: "flex",
        width: "100%",
        height: "314px",
        borderBottom: "0.5px solid #404040",
        gap: "44px",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Grid
        sx={{
          backgroundImage: `url("${item.priceImage}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "370px",
          height: "314px",
        }}
      />
      <Grid>
        <Grid sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <CircleIcon sx={{ fontSize: "6px", color: "#FFD662" }} />
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              mr: "19px",
              color: "#404040",
            }}
          >
            {catfind?.name}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: "14px" }} />
          <Typography
            sx={{ fontFamily: "Inter", fontSize: "14px", color: "#404040" }}
          >
            {item.priceDate}
          </Typography>
        </Grid>
        <Typography
          sx={{ fontFamily: "Inter", fontSize: "18px", mt: "26px", mb: "51px" }}
        >
          {item.priceTitle}
        </Typography>
        <Grid sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Grid
            sx={{
              backgroundImage: `url("${logo}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "50px",
              height: "50px",
            }}
          />
          <Typography
            sx={{ fontFamily: "Inter", fontSize: "14px", color: "#404040" }}
          >
            {item.priceText}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
