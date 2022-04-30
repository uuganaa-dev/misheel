import React from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import background from "../../asset/backgroundImages/aboutUs/Rectangle 1392 (1).png";
import img from "../../asset/backgroundImages/aboutUs/Rectangle 1479.png";
import img2 from "../../asset/backgroundImages/aboutUs/Capture.PNG";
import ActivityRelated from "./activityRelated";
import DevelopmentHistory from "./developmentHistory";
import CircleIcon from "@mui/icons-material/Circle";

export default function AboutUs() {
  return (
    <Grid sx={{ backgroundColor: ["#FFFFFF", "#FFFFFF", "#ECEBE7"] }}>
      <Appbar />
      <Grid sx={{ width: "100%", height: "calc(100vw * 0.26)", position: "relative", overflowY: "hidden" }}>
        <Typography
          sx={{
            fontSize: ["10px", "12px"],
            fontFamily: "Inter",
            letterSpacing: "0.25px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#707070",
            pt: ["40px", "80px", "140px"]
          }}>
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
            transform: ["translate(-50%, -72%)", "translate(-50%, -72%)", "translate(-50%, -60%)"]
          }}>
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
            height: ["calc(100vw * 0.34)", "calc(100vw * 0.34)", "calc(100vw * 0.34)"]
          }}
        />
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column", gap: "63px", alignItems: "center", backgroundColor: "white", pt: "49px", pb: "132px" }}>
        {data.map((item, index) => (
          <Grid key={index} sx={{ display: "flex", flexDirection: "column", gap: "36px", width: "71%" }}>
            <Typography sx={{ fontSize: "18px", fontFamily: "Inter", fontWeight: 600 }}>{item.title}</Typography>
            {index === 3 ? (
              <Grid>
                {txt.map((list, index) => (
                  <Grid sx={{ display: "flex", gap: "3px", alignItems: "center" }} key={index}>
                    <CircleIcon sx={{ fontSize: "6px", px: "6px" }} />
                    <Typography sx={{ fontFamily: "Inter", fontSize: "16px", color: "#404040" }}>{list[0]}</Typography>
                    <Typography sx={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 500 }}>{list[1]}</Typography>
                  </Grid>
                ))}
              </Grid>
            ) : index === 4 ? (
              <DevelopmentHistory item={item} img={img} img2={img2} />
            ) : (
              <Typography sx={{ fontSize: "16px", fontFamily: "Inter", fontWeight: 300, color: "#404040" }}>{item.txt}</Typography>
            )}
          </Grid>
        ))}
      </Grid>
      <Grid>
        <ActivityRelated />
      </Grid>
      <FooterMain />
    </Grid>
  );
}

const data = [
  {
    title: "ОЛОН УЛСЫН ЖИШИГТ НИЙЦСЭН МОНГОЛЫН АНХНЫ МИШЭЭЛ БАРИЛГЫН ИХ ДЭЛГҮҮР тавтай морилно уу. ",
    txt: "Мишээл Барилгын Их Дэлгүүр нь Олон улсын жишигт нийцсэн Монголын анхны барилгын материалын худалдаа, үйлчилгээний төв болохыг зорьж, олон төвлөрсөн арга хэмжээг харилцагч нартайгаа хамтран зохион байгуулж ирсэн. Бид 2014 онд барилгынхаа шавыг тавьж, 2016 оны 7 сард албан ёсоор нээлтээ хийж байсан бол өнөөдөр Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. "
  },
  { title: "Алсын Хараа", txt: "Бид дэлхийн түвшний барилгын материалын худалдаа үйлчилгээний тэргүүлэгч байгууллага болно" },
  {
    title: "Эрхэм зорилго",
    txt: "Бид харилцагч төвтэй нэгдсэн шийдэлд тулгуурлан, Худалдаа үйлчилгээний стандартад нийцсэн барилгын материалын төвлөрсөн төв байна."
  },
  { title: "Үнэт зүйлс" },
  {
    title: "Хөгжлийн түүх, туршлага",
    txt: "Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. "
  }
];

const txt = [
  ["Мэргэжлийн бүтээлч хандлагатай ", "АЖИЛТАН"],
  ["Итгэлтэй, түншлэлтэй ", "ХАРИЛЦАГЧ"],
  ["Сэтгэл ханамжтай ", "ҮЙЛЧЛҮҮЛЭГЧ"],
  ["Аюулгүй, тав тухтай ", "ОРЧИН"]
];
