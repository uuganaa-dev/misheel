import React from "react";
import { Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import logo from "./Ellipse 67.png";
import moment from "moment";

const Unit = ({ item, catfind }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        width: "100%",
        height: ["0", "314px"],
        gap: ["20px", "44px"],
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Grid
        sx={{
          backgroundImage: `url("https://mmmall.mn${item.priceImage}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: ["100px", "370px"],
          height: ["100px", "314px"],
        }}
      />
      <Grid>
        <Grid sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <CircleIcon sx={{ fontSize: "6px", color: "#FFD662" }} />
          <Typography
            sx={{
              fontSize: "14px",
              mr: "19px",
              color: "#404040",
            }}
          >
            {catfind?.name}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "14px", color: "#404040" }}>
            {moment(item.priceDate).format("YYYY.MM.DD")}
          </Typography>
        </Grid>
        <Typography
          sx={{
            fontSize: ["14px", "18px", "18px"],
            mt: ["5px", "26px"],
            mb: ["5px", "51px"],
          }}
        >
          {item.priceTitle}
        </Typography>
        <Grid sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Grid
            sx={{
              backgroundImage: `url("${logo}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: ["24px", "32px", "50px"],
              height: ["24px", "26px", "50px"],
            }}
          />
          <Typography
            sx={{ fontSize: ["10px", "12px", "14px"], color: "#404040" }}
          >
            {item.priceText}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default React.memo(Unit);
