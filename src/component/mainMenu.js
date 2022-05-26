import React from "react";
import { Grid } from "@mui/material";
import { useUserState } from "../contexts/UserContext";

const MainMenu = () => {
  const { user, setUser } = useUserState();

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
      }}
    >
      <Grid sx={{ width: "95%" }} className="scrollmenu">
        <div className="main-container">
          {user.catList.length > 0 &&
            user.catList.map((el, index) => {
              return (
                <div
                  key={index}
                  className={
                    el.id === user.carId ? "main-menu active" : "main-menu"
                  }
                  onClick={() => {
                    setUser({ type: "CHANGE_CATID", data: el.id });
                  }}
                >
                  {el.name}
                </div>
              );
            })}
        </div>
      </Grid>
    </Grid>
  );
};
export default React.memo(MainMenu);
