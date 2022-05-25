import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MainMenu(props) {
  const [choose, setChoose] = useState();
  const [subCat, setSubCat] = useState([]);

  useEffect(() => {
    if (choose) {
      setSubCat(props.subCategory.filter((el) => el.parentId === choose.id));
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
        {props.category.map((item, index) => (
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
            <Typography sx={{ fontSize: "14px" }}>{item.name}</Typography>
            <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ width: "70%" }}>
        <Typography sx={{ fontSize: "24px" }}>{choose?.name}</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "15px",
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
