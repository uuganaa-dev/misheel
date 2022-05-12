import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import HorizontalTimeline from "react-horizontal-timeline";
import * as API from "../../api/request";
import Swal from "sweetalert2";

export default function DevelopmentHistory() {
  const [list, setlist] = useState([]);
  const [state, setState] = useState({
    curIdx: 0,
    prevIdx: -1,
    values: list[0]?.text,
    img: list[0]?.img,
  });

  useEffect(() => {
    API.getTimeline()
      .then((res) => {
        if (res.data.data.length > 0) {
          setState({
            curIdx: 0,
            prevIdx: -1,
            values: res.data.data[0].text,
            img: res.data.data[0]?.img,
          });
          setlist(res.data.data);
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
              values: list[index].text,
              img: list[index].img,
            });
          }}
          values={list.map((x) => x.year)}
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
            backgroundImage: `url("http://167.172.76.26${state.img}")`,
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
