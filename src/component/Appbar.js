import React, { useContext, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoYellow from "./logoYellow";
import TheContext from "../utils/context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import breakpoints from "../utils/contants/breakpoints";
import json2mq from "json2mq";
import MainMenu from "./mainMenu";

export default function Appbar(props) {
  const context = useContext(TheContext);
  const txt = context.txt.Bar;
  const navigate = useNavigate();
  const { laptop } = breakpoints;
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
  const [select, setSelect] = useState();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        width: "100%",
        zIndex: "snackbar",
      }}
    >
      <Grid
        sx={{
          backgroundColor: ["#F9FAFB", "#F9FAFB", "black"],
          opacity: [1, 1, 0.7],
          display: "flex",
          width: "100%",
          height: "58px",
          color: ["#6B7280", "#6B7280", "white"],
          alignItems: "center",
          justifyContent: "space-between",
          px: ["", "150px", "200px"],
          ...(!isLaptop && { boxShadow: "0px 1px #989da6" }),
        }}
      >
        <MenuIcon
          sx={{ ...style.pointer }}
          onClick={() => setOpenMenu(!openMenu)}
        />
        <Typography
          sx={{
            ...style.txt,
            ...style.fourHundred,
            ...style.pointer,
            ...(select === txt.home && {
              color: ["#1C6DD0", "#1C6DD0", "white"],
            }),
          }}
          onClick={() => {
            setSelect(txt.home);
            navigate("/");
          }}
        >
          {txt.home}
        </Typography>
        <Typography
          sx={{
            ...style.txt,
            ...style.fourHundred,
            ...style.pointer,
            ...(select === txt.price && {
              color: ["#1C6DD0", "#1C6DD0", "white"],
            }),
          }}
          onClick={() => {
            setSelect(txt.price);
            navigate("/mprice");
          }}
        >
          {txt.price}
        </Typography>
        <Grid
          onClick={() => {
            setSelect(txt.home);
            navigate("/");
          }}
        >
          <LogoYellow
            ysx={{
              width: ["50px", "42px", "58px"],
              height: ["50px", "42px", "58px"],
              cursor: "pointer",
            }}
            sx={{
              width: ["50px", "42px", "45px"],
              height: ["50px", "42px", "45px"],
            }}
            backgroundColor={["white", "white", "#FFD662"]}
          />
        </Grid>
        <Typography
          sx={{
            ...style.txt,
            ...style.fourHundred,
            ...style.pointer,
            ...(select === txt.brand && {
              color: ["#1C6DD0", "#1C6DD0", "white"],
            }),
          }}
          onClick={() => {
            setSelect(txt.brand);
            navigate("/brandPage");
          }}
        >
          {txt.brand}
        </Typography>
        <Typography
          sx={{
            ...style.txt,
            ...style.fourHundred,
            ...style.pointer,
            ...(select === txt.ours && {
              color: ["#1C6DD0", "#1C6DD0", "white"],
            }),
          }}
          onClick={() => {
            setSelect(txt.ours);
            navigate("/aboutUs");
          }}
        >
          {txt.ours}
        </Typography>
        <Grid sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <SearchIcon sx={{ ...style.pointer }} />
          <LocationOnIcon
            sx={{
              ...style.pointer,
              ...(select === "map" && {
                color: ["#1C6DD0", "#1C6DD0", "white"],
              }),
            }}
            onClick={() => {
              setSelect("map");
              navigate("/map");
            }}
          />
          <Typography
            sx={{
              ...style.txt,
              ...style.sixHundred,
              ...style.pointer,
              ...(select === txt.lan && {
                color: ["#1C6DD0", "#1C6DD0", "white"],
              }),
            }}
            onClick={() => {
              setSelect(txt.lan);
              context.index === 0 ? context.ChangeTxt(1) : context.ChangeTxt(0);
            }}
          >
            {txt.lan}
          </Typography>
        </Grid>
      </Grid>
      {openMenu && <MainMenu props={props} />}
    </Grid>
  );
}

const style = {
  txt: { fontFamily: "Inter", fontSize: "14px", textTransform: "uppercase" },
  pointer: { cursor: "pointer", "&:hover": { opacity: 0.7 } },
  fourHundred: { fontWeight: 400 },
  sixHundred: { fontWeight: 600 },
};
