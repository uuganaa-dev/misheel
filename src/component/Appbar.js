import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoYellow from "./logoYellow";
import TheContext from "../utils/context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainMenu from "./mainMenu";
import { useUserState } from "../contexts/UserContext";

import { Input } from "antd";

const Appbar = () => {
  const { user, setUser } = useUserState();
  const [searchValue, setSearchValue] = useState("");
  const [isShow, setIsShow] = useState(false);

  const context = useContext(TheContext);
  const txt = context.txt.Bar;
  const navigate = useNavigate();
  const [select, setSelect] = useState();

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
          backgroundColor: ["black", "black", "black"],
          opacity: [1, 1, 0.7],
          display: "flex",
          width: "100%",
          height: "58px",
          color: ["white", "white", "white"],
          alignItems: "center",
          justifyContent: "space-between",
          px: ["10px", "10px", "200px"],
        }}
      >
        {isShow ? (
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="хайх үгээ бичээд Enter дарна уу"
            onPressEnter={() => {
              navigate("/search/" + searchValue);
            }}
            size="small"
          />
        ) : (
          <>
            <MenuIcon
              sx={{ ...style.pointer }}
              onClick={() =>
                setUser({ type: "CHANGE_OPENMENU", data: !user.openMenu })
              }
            />
            <Typography
              sx={{
                ...style.txt,
                ...style.fourHundred,
                ...style.pointer,
                ...(select === txt.home && {
                  color: ["white", "white", "white"],
                }),
              }}
              className="my-font-size"
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
                  color: ["white", "white", "white"],
                }),
              }}
              className="my-font-size"
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
              className="header-logo"
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
                  color: ["white", "white", "white"],
                }),
              }}
              className="my-font-size"
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
                  color: ["white", "white", "white"],
                }),
              }}
              className="my-font-size"
              onClick={() => {
                setSelect(txt.ours);
                navigate("/aboutUs");
              }}
            >
              {txt.ours}
            </Typography>
          </>
        )}

        <Grid
          sx={{
            display: "flex",
            gap: ["10px", "24px", "24px"],
            alignItems: "center",
            fontSize: ["10px", "16px", "16px"],
          }}
        >
          <SearchIcon
            sx={{ ...style.pointer, fontSize: ["10px", "16px", "16px"] }}
            onClick={() => setIsShow(!isShow)}
          />

          <LocationOnIcon
            sx={{
              ...style.pointer,
              ...(select === "map" && {
                color: ["white", "white", "white"],
              }),
              fontSize: ["10px", "16px", "16px"],
            }}
            onClick={() => {
              setSelect("map");
              navigate("/map");
            }}
          />
          {console.log(user.loggedIn)}
          <i
            className="fa fa-sign-in cursor-pointer"
            onClick={() => {
              user.loggedIn
                ? user.userInfo.role === "1"
                  ? navigate("/admin")
                  : user.userInfo.role === "2"
                  ? navigate("/brand")
                  : user.userInfo.role === "3"
                  ? navigate("/price")
                  : navigate("/login")
                : navigate("/login");
            }}
          />
          <Typography
            sx={{
              ...style.txt,
              ...style.sixHundred,
              ...style.pointer,
              ...(select === txt.lan && {
                color: ["white", "white", "white"],
              }),
            }}
            className="my-font-size"
            onClick={() => {
              setSelect(txt.lan);
              context.index === 0 ? context.ChangeTxt(1) : context.ChangeTxt(0);
            }}
          >
            {txt.lan}
          </Typography>
        </Grid>
      </Grid>
      {user.openMenu && <MainMenu />}
    </Grid>
  );
};

export default React.memo(Appbar);

const style = {
  txt: { fontSize: "14px", textTransform: "uppercase" },
  pointer: { cursor: "pointer", "&:hover": { opacity: 0.7 } },
  fourHundred: { fontWeight: 400 },
  sixHundred: { fontWeight: 600 },
};
