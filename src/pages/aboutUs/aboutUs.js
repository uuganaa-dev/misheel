import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import ActivityRelated from "./activityRelated";
import DevelopmentHistory from "./developmentHistory";
import * as API from "../../api/request";
import Swal from "sweetalert2";

export default function AboutUs() {
  const [list, setlist] = useState([]);

  useEffect(() => {
    API.getAbout()
      .then((res) => {
        if (res.data.data.length > 0) {
          setlist(res?.data?.data[0]);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, []);

  return (
    <Grid sx={{ backgroundColor: ["#FFFFFF", "#FFFFFF", "#ECEBE7"] }}>
      <Appbar />
      <Grid
        sx={{
          width: "100%",
          height: "calc(100vw * 0.26)",
          position: "relative",
          overflowY: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: ["10px", "12px"],
            fontFamily: "Inter",
            letterSpacing: "0.25px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#707070",
            pt: ["40px", "80px", "140px"],
          }}
        >
          ЗӨВЛӨЖ БАЙНА
        </Typography>
        <Typography
          sx={{
            fontSize: ["10px", "31px"],
            fontFamily: "Inter",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 200,
            position: "absolute",
            top: ["72%", "72%", "60%"],
            left: "50%",
            transform: [
              "translate(-50%, -72%)",
              "translate(-50%, -72%)",
              "translate(-50%, -60%)",
            ],
          }}
        >
          #MR МИШЭЭЛ
        </Typography>
      </Grid>
      <Grid sx={{ position: "relative" }}>
        <Grid
          sx={{
            backgroundImage: `url("http://167.172.76.26${list?.cover}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "100%",
            height: [
              "calc(100vw * 0.34)",
              "calc(100vw * 0.34)",
              "calc(100vw * 0.34)",
            ],
          }}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
          backgroundColor: "white",
          pt: "49px",
          pb: "100px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            width: "71%",
          }}
          className="about-mobile-gap about-mobile-width"
        >
          <div dangerouslySetInnerHTML={{ __html: list?.text }} />
          <DevelopmentHistory />
        </Grid>
      </Grid>
      <Grid>
        <ActivityRelated list={list} />
      </Grid>
      <FooterMain />
    </Grid>
  );
}
