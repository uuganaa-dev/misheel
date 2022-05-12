import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MainMenu(props) {
  const [choose, setChoose] = useState();
  const [subCat, setSubCat] = useState([]);

  useEffect(() => {
    if (choose) {
      setSubCat(
        props.props.subCategory.filter((el) => el.parentId === choose.id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choose]);

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
        color: "#202020",
      }}
    >
      <Grid
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {props.props.category.map((item, index) => (
          <Grid
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "9px 17px 9px 23px",
              cursor: "pointer",
              backgroundColor:
                choose?.id === item.id ? "rgba(209, 209, 209, 0.3)" : "white",
            }}
            onClick={() => {
              setChoose({ id: item.id, name: item.name });
            }}
          >
            <Typography sx={{ fontSize: "14px", fontFamily: "Inter" }}>
              {item.name}
            </Typography>
            <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ width: "70%" }}>
        <Typography sx={{ fontSize: "24px", fontFamily: "Inter" }}>
          {choose?.name}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "15px",
            fontFamily: "roboto",
            fontSize: "16px",
            color: "#808080",
          }}
        >
          {subCat.map((el, index) => (
            <div
              style={{
                flex: "1 0 20%",
                marginBottom: "8px",
                marginTop: "8px",
                marginRight: "8px",
                cursor: "pointer",
              }}
              key={index}
            >
              {el.name}
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

// const data = [
//   {
//     name: "Тавилга",
//     parentCategory: [],
//   },
//   {
//     name: "Барилгын материал",
//     parentCategory: [],
//   },
//   {
//     name: "Интериер",
//     parentCategory: [],
//   },
//   {
//     name: "Чулуу",
//     parentCategory: [],
//   },
//   {
//     name: "Гэр ахуй",
//     parentCategory: ["Тавилга", "Барилгын материал"],
//   },
//   {
//     name: "Шкаф",
//     parentCategory: ["Тавилга", "Барилгын материал"],
//   },
//   {
//     name: "Бүх Ангилал",
//     parentCategory: ["Тавилга", "Барилгын материал"],
//   },
//   {
//     name: "Түүх",
//     parentCategory: ["Тавилга", "Барилгын материал"],
//   },
//   {
//     name: "ДСП",
//     parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"],
//   },
//   {
//     name: "Компакт",
//     parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"],
//   },
//   {
//     name: "Emerald",
//     parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"],
//   },
//   {
//     name: "Furniture",
//     parentCategory: ["Тавилга", "Барилгын материал", "Гэр ахуй"],
//   },
//   {
//     name: "Хямд бараа",
//     parentCategory: ["Тавилга", "Барилгын материал", "Шкаф"],
//   },
//   {
//     name: "Шинэ бараа",
//     parentCategory: ["Тавилга", "Барилгын материал", "Шкаф"],
//   },
//   {
//     name: "Бүх Ангилал",
//     parentCategory: ["Тавилга", "Барилгын материал", "Бүх Ангилал"],
//   },
//   {
//     name: "Бүх Ангилал",
//     parentCategory: ["Тавилга", "Барилгын материал", "Бүх Ангилал"],
//   },
//   {
//     name: "Байршил",
//     parentCategory: ["Тавилга", "Барилгын материал", "Түүх"],
//   },
//   {
//     name: "Үйлчилгээ",
//     parentCategory: ["Тавилга", "Барилгын материал", "Түүх"],
//   },
// ];
