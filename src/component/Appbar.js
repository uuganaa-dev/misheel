import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoYellow from "./logoYellow";
import TheContext from "../utils/context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainMenu from "./mainMenu";
import LeftMenu from "./LeftMenu";
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
          px: ["10px", "10px", "100px"],
          zIndex: "2",
        }}
      >
        {isShow ? (
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            style={{ flex: 1 }}
            placeholder="хайх үгээ бичээд Enter дарна уу"
            onPressEnter={() => {
              navigate("/search/" + searchValue);
              setUser({ type: "CHANGE_OPENMENU", data: !user.openMenu });
            }}
            size="small"
          />
        ) : (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <MenuIcon
              sx={{ ...style.pointer }}
              onClick={() => {
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
                setUser({ type: "CHANGE_OPENMENU", data: !user.openMenu });
              }}
            />

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
                setUser({ type: "CHANGE_OPENMENU", data: false });
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
                setSelect(txt.price);
                navigate("/mprice");
              }}
            >
              {txt.price}
            </Typography>

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
                setUser({ type: "CHANGE_OPENMENU", data: false });
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
                setSelect(txt.brand);
                navigate("/brandPage");
              }}
            >
              {txt.brand}
            </Typography>
          </Grid>
        )}

        <Grid
          onClick={() => {
            setUser({ type: "CHANGE_OPENMENU", data: false });
            setUser({ type: "CHANGE_LEFT_MENU", data: false });
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
            backgroundColor={["#FFD662", "#FFD662", "#FFD662"]}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flex: 1,
          }}
        >
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
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              setSelect(txt.ours);
              navigate("/aboutUs");
            }}
          >
            {txt.ours}
          </Typography>
          <Grid
            sx={{
              display: ["none", "flex", "flex"],
              gap: ["8px", "24px", "24px"],
              alignItems: "center",
              fontSize: ["10px", "16px", "16px"],
            }}
          >
            <SearchIcon
              sx={{ ...style.pointer, fontSize: ["10px", "16px", "16px"] }}
              onClick={() => {
                setUser({ type: "CHANGE_OPENMENU", data: false });
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
                setIsShow(!isShow);
              }}
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
                setUser({ type: "CHANGE_OPENMENU", data: false });
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
                setSelect("map");
                navigate("/map");
              }}
            />
            <i
              className="fa fa-sign-in cursor-pointer"
              onClick={() => {
                setUser({ type: "CHANGE_OPENMENU", data: false });
                setUser({ type: "CHANGE_LEFT_MENU", data: false });
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
          </Grid>
          <Typography
            sx={{
              ...style.txt,
              ...style.sixHundred,
              ...style.pointer,
              ...(select === txt.lan && {
                color: ["white", "white", "white"],
                display: ["none", "block", "block"],
              }),
            }}
            className="my-font-size"
            onClick={() => {
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              setSelect(txt.lan);
              context.index === 0 ? context.ChangeTxt(1) : context.ChangeTxt(0);
            }}
          >
            {txt.lan}
          </Typography>
        </Grid>

        <MenuIcon
          sx={{ ...style.pointer, display: ["block", "none", "none"] }}
          onClick={() => {
            setUser({ type: "CHANGE_OPENMENU", data: false });
            setUser({ type: "CHANGE_LEFT_MENU", data: !user.leftMenu });
          }}
        />
      </Grid>
      {user.openMenu && <MainMenu />}
      {user.leftMenu && <LeftMenu />}
    </Grid>
  );
};

export default React.memo(Appbar);

const style = {
  txt: {
    fontSize: "14px",
    textTransform: "uppercase",
    display: ["none", "block", "block"],
  },
  pointer: { cursor: "pointer", "&:hover": { opacity: 0.7 } },
  fourHundred: { fontWeight: 400 },
  sixHundred: { fontWeight: 600 },
};
