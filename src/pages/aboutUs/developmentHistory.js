import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import HorizontalTimeline from "react-horizontal-timeline";
import img from "../../asset/backgroundImages/aboutUs/Rectangle 1479.png";
import img2 from "../../asset/backgroundImages/aboutUs/Rectangle 1420.png";

export default function DevelopmentHistory() {
  const [state, setState] = useState({
    curIdx: 0,
    prevIdx: -1,
    values: Timeline[0] ? Timeline[0].text : "",
    img: Timeline[0] ? Timeline[0].img : "",
  });

  return (
    <Grid>
      <Grid sx={{ width: "100%", height: "100px", fontSize: "15px" }}>
        <HorizontalTimeline
          styles={{
            background: "#f8f8f8",
            foreground: "#F13333",
            outline: "rgba(64, 64, 64, 0.4)",
          }}
          index={state.curIdx}
          indexClick={(index) => {
            const curIdx = state.curIdx;
            setState({
              ...state,
              curIdx: index,
              prevIdx: curIdx,
              values: Timeline[index].text,
              img: Timeline[index].img,
            });
          }}
          values={Timeline.map((x) => x.year)}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          gap: "87px",
          flexDirection: ["column", "row"],
          alignItems: "center",
          mt: "36px",
        }}
        className="about-mobile-gap"
      >
        <Grid
          sx={{
            backgroundImage: `url("${state.img}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: ["71%", "419px"],
            height: ["calc(71vw * 0.67)", "281px"],
          }}
          className="about-mobile-width"
        />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 300,
            width: ["71%", "467px"],
            color: "#404040",
          }}
          className="about-mobile-width"
        >
          {state.values}
        </Typography>
      </Grid>
    </Grid>
  );
}

const Timeline = [
  {
    year: "2021",
    img: img,
    text: "2021 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
  {
    year: "2020",
    img: img2,
    text: "2020 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
  {
    year: "2019",
    img: img,
    text: "2019 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
  {
    year: "2018",
    img: img,
    text: "2018 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
  {
    year: "2017",
    img: img,
    text: "2017 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
  {
    year: "2016",
    img: img,
    text: "2016 Дэлхийн 1000 гаруй барилгын материалын тэргүүлэх брэндийг нэгтгэсэн 100 гаруй загварын шоурүүмтэй, өдөрт тогтмол 1800 гаруй хүн ирж үйлчлүүлдэг эрэлт хэрэгцээтэй худалдаа, үйлчилгээний төв болж чадлаа. ",
  },
];
