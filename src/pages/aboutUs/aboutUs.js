import React from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import background from "../../asset/backgroundImages/aboutUs/Rectangle 1392 (1).png";
import ActivityRelated from "./activityRelated";
import DevelopmentHistory from "./developmentHistory";

export default function AboutUs() {
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
            backgroundImage: `url("${background}")`,
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
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <DevelopmentHistory />
        </Grid>
      </Grid>
      <Grid>
        <ActivityRelated />
      </Grid>
      <FooterMain />
    </Grid>
  );
}
const content = `<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><strong><span style='font-size:18px;font-family:"Inter",serif;'>ОЛОН УЛСЫН ЖИШИГТ НИЙЦСЭН МОНГОЛЫН АНХНЫ МИШЭЭЛ БАРИЛГЫН ИХ ДЭЛГҮҮР тавтай морилно уу.</span></strong></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><strong><span style='font-size:18px;font-family:"Inter",serif;'>&nbsp;</span></strong></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;color:#404040;'>Мишээл Барилгын Их Дэлгүүр нь Олон улсын жишигт нийцсэн Монголын анхны барилгын материалын худалдаа, үйлчилгээний төв болохыг зорьж, олон төвлөрсөн арга хэмжээг харилцагч нартайгаа хамтран зохион байгуулж ирсэн. Бид 2014 онд барилгынхаа шавыг тавьж, 2016 оны 7 сард албан ёсоор нээлтээ хийж байсан бол өнөөдөр Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа.</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><span style='font-family:"Inter",serif;color:#404040;'>&nbsp;</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><strong><span style='font-size:18px;font-family:"Inter",serif;'>Алсын Хараа</span></strong></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;color:#404040;'>Бид дэлхийн түвшний барилгын материалын худалдаа үйлчилгээний тэргүүлэгч байгууллага болно</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><span style='font-family:"Inter",serif;color:#404040;'>&nbsp;</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><strong><span style='font-size:18px;font-family:"Inter",serif;'>Эрхэм зорилго</span></strong></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;color:#404040;'>Бид харилцагч төвтэй нэгдсэн шийдэлд тулгуурлан, Худалдаа үйлчилгээний стандартад нийцсэн барилгын материалын төвлөрсөн төв байна.</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><span style='font-family:"Inter",serif;color:#404040;'>&nbsp;</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><strong><span style='font-size:18px;font-family:"Inter",serif;'>Үнэт зүйлс</span></strong></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;color:#404040;'>Мэргэжлийн бүтээлч хандлагатай</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in;'><span style='font-family:"Inter",serif;color:#404040;'>&nbsp;</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;'>АЖИЛТАН&nbsp;</span><span style='font-family:"Inter",serif;color:#404040;'>Итгэлтэй, түншлэлтэй</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;'>ХАРИЛЦАГЧ&nbsp;</span><span style='font-family:"Inter",serif;color:#404040;'>Сэтгэл ханамжтай</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;'>ҮЙЛЧЛҮҮЛЭГЧ&nbsp;</span><span style='font-family:"Inter",serif;color:#404040;'>Аюулгүй, тав тухтай</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;'>ОРЧИН</span></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><br></p>
<p style='margin-right:0in;margin-left:0in;font-size:16px;font-family:"Times New Roman",serif;margin:0in; border-box;-webkit-tap-highlight-color: transparent;'><span style='font-family:"Inter",serif;'><span style="color: rgba(0, 0, 0, 0.85); font-family: Inter; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 600; letter-spacing: 0.3px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">Хөгжлийн түүх, туршлага</span>&nbsp;</span></p>`;
