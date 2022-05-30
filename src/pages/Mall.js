import { Grid, Typography } from "@mui/material";
import React from "react";
import Appbar from "../component/Appbar";
import FooterMain from "../component/footerMain";
import img1 from "../asset/1 (1).jpeg";
import img2 from "../asset/1 (1).jpg";
import img3 from "../asset/1 (2).jpg";
import img4 from "../asset/1 (3).jpg";

const Mall = () => {
  return (
    <div style={{ fontFamily: "roboto" }}>
      <Appbar />
      <Grid
        sx={{
          backgroundColor: ["white", "white", "#E5E5E5"],
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
            #ҮЙЛЧИЛГЭЭНИЙ ТӨВҮҮД
          </Typography>
        </Grid>
      </Grid>
      <div className="search-contaner" style={{ flexWrap: "wrap" }}>
        <div className="service-item">
          <img src={img1} alt="" className="service-item-img" />
          <div>Банкны үйлчилгээ</div>
        </div>
        <div className="service-item">
          <img src={img2} alt="" className="service-item-img" />
          <div>Нийслэлийн үйлчилгээний нэгдсэн төв</div>
        </div>
        <div className="service-item">
          <img src={img3} alt="" className="service-item-img" />
          <div>Хүргэлтийн үйлчилгээ</div>
        </div>
        <div className="service-item">
          <img src={img4} alt="" className="service-item-img" />
          <div>Кофе шоп</div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default React.memo(Mall);
