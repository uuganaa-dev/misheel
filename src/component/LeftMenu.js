import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useUserState } from "../contexts/UserContext";
import TheContext from "../utils/context/userContext";
import { Input } from "antd";
const LeftMenu = () => {
  const { user, setUser } = useUserState();
  const context = useContext(TheContext);
  const txt = context.txt.Bar;
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Grid
      sx={{
        width: ["200px", "300px", "100%"],
        height: ["100vh", "100vh", "300px"],
        backgroundColor: "white",
        display: "flex",
        gap: "41px",
        justifyContent: "center",
        py: ["5px", "29px", "29px"],
        color: "#202020",
        position: "absolute",
        right: 0,
        top: "58px",
      }}
    >
      <Grid sx={{ width: "95%" }} className="scrollmenu">
        <div className="main-container">
          <div className="main-menu" onClick={() => {}}>
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="хайх үгээ бичээд Enter дарна уу"
              onPressEnter={() => {
                navigate("/search/" + searchValue);
                setUser({ type: "CHANGE_LEFT_MENU", data: !user.leftMenu });
              }}
              size="small"
            />
          </div>
          <div
            className={
              location.pathname.split("/")[1] === "mprice"
                ? "main-menu active"
                : "main-menu"
            }
            onClick={() => {
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              navigate("/mprice");
            }}
          >
            {txt.price}
          </div>
          <div
            className={
              location.pathname.split("/")[1] === "brandPage"
                ? "main-menu active"
                : "main-menu"
            }
            onClick={() => {
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              navigate("/brandPage");
            }}
          >
            {txt.brand}
          </div>
          <div
            className={
              location.pathname.split("/")[1] === "aboutUs"
                ? "main-menu active"
                : "main-menu"
            }
            onClick={() => {
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              navigate("/aboutUs");
            }}
          >
            {txt.ours}
          </div>
          <div
            className={
              location.pathname.split("/")[1] === "map"
                ? "main-menu active"
                : "main-menu"
            }
            onClick={() => {
              setUser({ type: "CHANGE_OPENMENU", data: false });
              setUser({ type: "CHANGE_LEFT_MENU", data: false });
              navigate("/map");
            }}
          >
            {"Газрын зураг"}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default React.memo(LeftMenu);
