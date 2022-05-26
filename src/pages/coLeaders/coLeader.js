import React from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import img from "./Im.png";

const CoLeader = () => {
  return (
    <Grid sx={{ backgroundColor: "#ECEBE7" }}>
      <Appbar />
      <Grid
        sx={{
          width: "100%",
          height: "calc(100vw * 0.29)",
          position: "relative",
          overflowY: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: ["10px", "12px"],

            letterSpacing: "0.25px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#707070",
            pt: "140px",
          }}
        >
          Зочин хөтөлбөр
        </Typography>
        <Typography
          sx={{
            fontSize: ["10px", "31px"],

            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 200,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Co-Leaders
        </Typography>
      </Grid>
      <Grid
        sx={{
          backgroundImage: `url("http://mmmall.mn${img}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "calc(100vw * 0.43)",
        }}
      />
      <FooterMain />
    </Grid>
  );
};
export default React.memo(CoLeader);
