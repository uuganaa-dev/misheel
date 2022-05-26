import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import ActivityRelated from "./activityRelated";
import DevelopmentHistory from "./developmentHistory";
import * as API from "../../api/request";
import Swal from "sweetalert2";

const AboutUs = () => {
  const [list, setlist] = useState([]);

  useEffect(() => {
    API.getAbout()
      .then((res) => {
        setlist(res.data.data);
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
    <>
      <Appbar />
      <Grid
        sx={{
          backgroundColor: ["#FFFFFF", "#FFFFFF", "#ECEBE7"],
          paddingTop: "58px",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            height: "calc(100vw * 0.07)",
            position: "relative",
            overflowY: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: ["10px", "31px"],

              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            #БИДНИЙ ТУХАЙ
          </Typography>
        </Grid>
        <Grid sx={{ position: "relative" }}>
          <Grid
            sx={{
              backgroundImage: `url("http://misheel.tk${list?.cover}")`,
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
    </>
  );
};
export default React.memo(AboutUs);
