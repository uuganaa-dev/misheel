import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MainMenu() {
  const [choose, setChoose] = useState();
  return (
    <Grid
      sx={{
        width: "100%",
        height: "397px",
        backgroundColor: "white",
        display: "flex",
        gap: "41px",
        justifyContent: "center",
        py: "29px",
        color: "#202020"
      }}>
      <Grid sx={{ width: "20%", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
        {data
          .filter((x) => x.parentCategory.length === 0)
          .map((item, index) => (
            <Grid
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: "9px 17px 9px 23px",
                cursor: "pointer",
                backgroundColor: choose === item.name ? "rgba(209, 209, 209, 0.3)" : "white"
              }}
              onClick={() => {
                setChoose(item.name);
              }}>
              <Typography sx={{ fontSize: "14px", fontFamily: "Inter" }}>{item.name}</Typography>
              <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
            </Grid>
          ))}
      </Grid>
      <Grid sx={{ width: "70%" }}>
        <Typography sx={{ fontSize: "24px", fontFamily: "Inter" }}>{choose}</Typography>
        <Grid sx={{ display: "flex", gap: "109px", mt: "28px" }}>
          {data
            .filter(
              (x) => x.parentCategory.length >= 1 && x.parentCategory.length < 3
              // && x.parentCategory.indexOf(choose) > -1
            )
            .map((item, index) => (
              <Grid key={index}>
                <Typography sx={{ fontSize: "14px", fontFamily: "Inter", cursor: "pointer" }}>{item.name}</Typography>
                <Grid sx={{ mt: "19px", display: "flex", flexDirection: "column", gap: "17px" }}>
                  {data
                    .filter(
                      (x) =>
                        x.parentCategory.length >= 3 &&
                        // && x.parentCategory.indexOf(choose) > -1
                        x.parentCategory.indexOf(item.name) > -1
                    )
                    .map((item, index) => (
                      <Grid key={index} sx={{ color: "#8F8F8F" }}>
                        <Typography sx={{ fontSize: "14px", fontFamily: "Inter", cursor: "pointer" }}>{item.name}</Typography>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

const data = [
  {
    name: "Тавилга",
    parentCategory: []
  },
  {
    name: "Барилгын материал",
    parentCategory: []
  },
  {
    name: "Интериер",
    parentCategory: []
  },
  {
    name: "Чулуу",
    parentCategory: []
  },
  {
    name: "Гэр ахуй",
    parentCategory: ["Тавилга", "Барилгын материал"]
  },
  {
    name: "Шкаф",
    parentCategory: ["Тавилга", "Барилгын материал"]
  },
  {
    name: "Бүх Ангилал",
    parentCategory: ["Тавилга", "Барилгын материал"]
  },
  {
    name: "Түүх",
    parentCategory: ["Тавилга", "Барилгын материал"]
  },
  {
    name: "ДСП",
    parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"]
  },
  {
    name: "Компакт",
    parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"]
  },
  {
    name: "Emerald",
    parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"]
  },
  {
    name: "Furniture",
    parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"]
  },
  {
    name: "Хямд бараа",
    parentCategory: ["Тавилга", "Барилгын материал", "Шкаф"]
  },
  {
    name: "Шинэ бараа",
    parentCategory: ["Тавилга", "Барилгын материал", "Шкаф"]
  },
  {
    name: "Бүх Ангилал",
    parentCategory: ["Тавилга", "Барилгын материал", "Бүх Ангилал"]
  },
  {
    name: "Бүх Ангилал",
    parentCategory: ["Тавилга", "Барилгын материал", "Бүх Ангилал"]
  },
  {
    name: "Байршил",
    parentCategory: ["Тавилга", "Барилгын материал", "Түүх"]
  },
  {
    name: "Үйлчилгээ",
    parentCategory: ["Тавилга", "Барилгын материал", "Түүх"]
  }
];
